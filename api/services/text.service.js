'use strict';

import { Text } from '../models';

exports.getAll = () => {
  return Text.findAll();
};

exports.getOne = id => {
  return Text.findById(id);
};

exports.create = (title, data, language, author) => {
  return Text.create({ title, data, language, author });
};
