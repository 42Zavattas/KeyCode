'use strict';

import _ from 'lodash';
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
 * Get all users, for admins only
 */
exports.getAll = (req, res) => {
  UserService.getAll()
    .then(users => {
      res.status(200).send(users);
    })
    .catch(err => {
      res.status(400).send({ message: err.message });
    });
};

/**
 * Create a new result for a user
 */
exports.newResult = (req, res) => {
  UserService.newResult(_.assign(req.body, { userId: req.user.id }))
    .then(() => {
      res.status(200).end();
    })
    .catch(err => {
      res.status(400).send({ message: err.message });
    });
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

