'use strict';

import { Text, Language } from '../models';

exports.getAll = () => {
  return Text.findAll({ include: [{ model: Language }] });
};

exports.getOne = id => {
  return Text.findById(id, { include: [{ model: Language }] });
};

exports.create = (title, data, language, author) => {
  return Text.create({ title, data, language, author });
};
