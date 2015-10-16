'use strict';

import { LanguageService } from '../services';

/**
 * Get all languages
 *
 * GET /languages [None]
 */
exports.getAll = (req, res) => {
  LanguageService.getAll().then(languages => {
    res.status(200).send(languages);
  }).catch(err => {
    res.status(400).send({ message: err.message });
  });
};

/**
 * Get a specific language by its id
 *
 * GET /languages/:id [None]
 */
exports.getOne = (req, res) => {
  LanguageService.getOne(req.params.id).then(language => {
    res.status(200).send(language);
  }).catch(err => {
    res.status(400).send({ message: err.message });
  });
};

/**
 * Create a text
 *
 * POST /languages [Admin]
 */
exports.create = (req, res) => {
  LanguageService.create(req.body).then(language => {
    res.status(200).send(language);
  }).catch(err => {
    res.status(400).send({ message: err.message });
  });
};
