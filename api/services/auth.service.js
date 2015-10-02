'use strict';

import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import compose from 'composable-middleware';
import moment from 'moment';

import UserService from './user.service';
import config from '../../config';
import { db } from '../data';

const checkJwt = expressJwt({ secret: config.secret });

/**
 * Sign a token
 */
exports.auth = (token) => {

  let _user;

  return db.oneOrNone('SELECT * FROM users WHERE lognup = $1', token)
    .then(function (user) {
      if (!token || !user) { throw new Error('No matching user.'); }
      if (!moment().diff(user.lognupat, 'minutes') < 10) { throw new Error('Token expired.'); }
      _user = user;

      return db.none('UPDATE users SET lognup = null WHERE id = $1', user.id);
    })
    .then(function () {
      return exports.signToken(_user.id);
    });

};

/**
 * Middleware to check if a user is authenticated.
 */
exports.isAuthenticated = () => {
  return compose()
    .use(checkJwt)
    .use(function (req, res, next) {
      UserService.getById(req.user.id)
        .then(function (user) {
          req.user = user;
          next();
        })
        .catch(next);
    });
};

/**
 * Sign a token for 48 hours.
 */
exports.signToken = (id) => {
  return jwt.sign({ id }, config.secret, { expiresInMinutes: 60 * 48 });
};
