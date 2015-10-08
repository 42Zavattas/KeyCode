'use strict';

import { Language } from '../models';

exports.getAll = () => {
  return Language.findAll();
};

exports.getById = id => {
  return Language.getById(id);
};

exports.create = (name, url) => {
  return Language.create({ name, url });
};
