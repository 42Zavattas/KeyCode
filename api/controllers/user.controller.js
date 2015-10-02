'use strict';

import { UserService, AuthService } from '../services';

/**
 * Return me
 */
exports.getMe = (req, res) => {
  res.status(200).send(req.user);
};

exports.putMe = (req, res) => {
  res.status(404).send({ message: 'Route under construction.' });
};

/**
 * Create a new user
 */
exports.create = (req, res) => {
  UserService.create(req.body.email)
    .then(() => {
      res.status('200').send({ message: 'Email sent.' });
    })
    .catch(err => {
      res.status(400).send({ message: err.message });
    });
};

/**
 * Authenticate using the lognup technology
 */
exports.auth = (req, res) => {
  AuthService.auth(req.params.token)
    .then(jwt => {
      res.cookie('token', jwt);
      res.redirect('/');
    })
    .catch(err => {
      res.status(400).send({ message: err.message });
    });
};
