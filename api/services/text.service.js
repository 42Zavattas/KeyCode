'use strict';

import Sequelize from 'sequelize';

import { Text, Language, Vote } from '../models';

exports.getAll = () => {
  return Text.findAll({ include: [{ model: Language }] });
};

exports.getRandom = () => {
  return Text.findOne({ order: Sequelize.fn('RANDOM'), include: [{ model: Language }] });
};

exports.getOne = id => {
  return Text.findById(id, { include: [{ model: Language }] });
};

exports.create = (title, data, language, author) => {
  return Text.create({ title, data, language, author });
};

exports.castVote = (textId, userId, value) => {
  return Vote.create({ value, userId, textId });
};
