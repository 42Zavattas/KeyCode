'use strict';

import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import compose from 'composable-middleware';
import moment from 'moment';
import passport from 'passport';
import { Strategy } from 'passport-github';

import UserService from './user.service';
import config from '../../config';
import { db } from '../data';

const checkJwt = expressJwt({ secret: config.secret });

/**
 * Sign a token
 * @param {String} token The lognup token
 * @returns {String} jwt
 */
exports.auth = token => {

  let _user;

  return db.oneOrNone('SELECT * FROM users WHERE lognup = $1', token)
    .then(user => {
      if (!token || !user) { throw new Error('No matching user.'); }
      if (moment().diff(user.lognupat, 'minutes') > 10) { throw new Error('Token expired.'); }
      _user = user;

      return db.none('UPDATE users SET lognup = null WHERE id = $1', user.id);
    })
    .then(() => {
      return exports.signToken(_user.id);
    });

};

/**
 * Middleware to check if a user is authenticated.
 * @returns {Middleware} mid
 */
exports.isAuthenticated = () => {
  return compose()
    .use(checkJwt)
    .use((req, res, next) => {
      UserService.getById(req.user.id)
        .then(user => {
          req.user = user;
          next();
        })
        .catch(err => { next(err.message); });
    });
};

/**
 * Sign a token for 48 hours.
 * @param {String} id The userId
 * @returns {String} token
 */
exports.signToken = id => {
  return jwt.sign({ id }, config.secret, { expiresIn: 60 * 60 * 48 });
};

/**
 * Set the token as cookie and redirect to home.
 *
 * @param {Object} req Express request
 * @param {Object} res Express response
 * @returns {Void} Redirect
 */
exports.setToken = (req, res) => {
  const token = exports.signToken(req.user.id);
  res.cookie('token', token);
  res.redirect('/');
};

/**
 * Github strategy
 */
passport.use(new Strategy({
  clientID: config.githubId,
  clientSecret: config.githubSecret,
  callbackURL: config.callbackUrl
}, (accessToken, refreshToken, profile, done) => {
  UserService.updateOrCreate(profile.id, profile.username, profile._json.avatar_url)
    .then(user => { done(null, user); })
    .catch(done);
}));
