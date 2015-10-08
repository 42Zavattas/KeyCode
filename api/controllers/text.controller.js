'use strict';

import { TextService } from '../services';

exports.getAll = (req, res) => {
  TextService.getAll()
    .then(texts => {
      res.status(200).send(texts);
    })
    .catch(err => {
      res.status(400).send({ message: err.message });
    });
};

exports.getOne = (req, res) => {
  TextService.getOne(req.params.id)
    .then(text => {
      res.status(200).send(text);
    })
    .catch(err => {
      res.status(400).send({ message: err.message });
    });
};

exports.create = (req, res) => {
  TextService.create(req.body.title, req.body.data, req.body.language, req.user.id)
    .then(text => {
      res.status(200).send(text);
    })
    .catch(err => {
      res.status(400).send({ message: err.message });
    });
};
