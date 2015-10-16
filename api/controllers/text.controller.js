'use strict';

import { TextService } from '../services';

/**
 * Get all texts
 *
 * GET /texts [None]
 */
exports.getAll = (req, res) => {
  TextService.getAll()
    .then(texts => {
      res.status(200).send(texts);
    })
    .catch(err => {
      res.status(400).send({ message: err.message });
    });
};

/**
 * Get a random text
 *
 * GET /texts/rand [None]
 */
exports.getRandom = (req, res) => {
  TextService.getRandom()
    .then(text => {
      res.status(200).send(text);
    })
    .catch(err => {
      res.status(400).send({ message: err.message });
    });
};

/**
 * Get a text by its id
 *
 * GET /texts/:id [None]
 */
exports.getOne = (req, res) => {
  TextService.getOne(req.params.id)
    .then(text => {
      res.status(200).send(text);
    })
    .catch(err => {
      res.status(400).send({ message: err.message });
    });
};

/**
 * Create a text
 *
 * POST /texts [Admin]
 */
exports.create = (req, res) => {
  TextService.create(req.body.title, req.body.data, req.body.language, req.user.id)
    .then(text => {
      res.status(200).send(text);
    })
    .catch(err => {
      res.status(400).send({ message: err.message });
    });
};

/**
 * Cast a vote on a text
 *
 * POST /text/:id/vote [User]
 */
exports.castVote = (req, res) => {
  TextService.castVote(req.params.id, req.user.id, req.body.value)
    .then(() => {
      res.status(200).end();
    })
    .catch(err => {
      res.status(400).send({ message: err.message });
    });
};
