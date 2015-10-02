'use strict';

import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import compose from 'composable-middleware';

import UserService from './user.service';
import config from '../../config';

const checkJwt = expressJwt({ secret: config.secret });

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
