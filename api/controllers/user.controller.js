'use strict';

import { UserService } from '../services';

/**
 * Create a new user
 */
exports.create = (req, res) => {
  UserService.create(req.body.name, req.body.email)
    .then(function () {
      res.status('200').end();
    })
    .catch(function (err) {
      res.status(400).send({ message: err.message });
    });
};

/**
 * Authenticate using the lognup technology
 */
exports.auth = (req, res) => {
  UserService.auth(req.params.token)
    .then(function (jwt) {
      res.cookie('token', jwt);
      res.redirect('/');
    })
    .catch(function (err) {
      res.status(400).send({ message: err.message });
    });
};
