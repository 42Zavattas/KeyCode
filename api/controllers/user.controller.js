'use strict';

import { UserService } from '../services';

/**
 * Return the current user
 *
 * @param {Object} req Express request
 * @param {Object} res Exress result
 * @returns {Object} user
 */
exports.getMe = (req, res) => {
  res.status(200).send(req.user);
};

/**
 * Update the current user
 *
 * @param {Object} req Express request
 * @param {Object} res Exress result
 * @returns {Null} nothing
 */
exports.putMe = (req, res) => {
  res.status(404).send({ message: 'Route under construction.' });
};

/**
 * Create a new user
 *
 * @param {Object} req Express request
 * @param {Object} res Exress result
 * @returns {Null} nothing
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
