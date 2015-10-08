'use strict';

import Sequelize from 'sequelize';

import { Text, Language } from '../models';

exports.getAll = () => {
  return Text.findAll({ include: [{ model: Language }] });
};

exports.getRandom = () => {
  return Text.findOne({ order: Sequelize.fn('RANDOM') });
};

exports.getOne = id => {
  return Text.findById(id, { include: [{ model: Language }] });
};

exports.create = (title, data, language, author) => {
  return Text.create({ title, data, language, author });
};
