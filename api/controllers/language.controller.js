'use strict';

import { LanguageService } from '../services';

exports.getAll = (req, res) => {
  LanguageService.getAll().then(languages => {
    res.status(200).send(languages);
  }).catch(err => {
    res.status(400).send({ message: err.message });
  });
};

exports.getOne = (req, res) => {
  LanguageService.getOne(req.params.id).then(language => {
    res.status(200).send(language);
  }).catch(err => {
    res.status(400).send({ message: err.message });
  });
};

exports.create = (req, res) => {
  LanguageService.create(req.body).then(language => {
    res.status(200).send(language);
  }).catch(err => {
    res.status(400).send({ message: err.message });
  });
};
