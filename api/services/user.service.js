'use strict';

import _ from 'lodash';
import { propsDiffer } from './utils.service';

import { User, Test } from '../models';

exports.getAll = () => {
  return User.findAll();
};

exports.getById = id => {
  return User.findById(id);
};

exports.getByGithub = id => {
  return User.findOne({ where: { githubId: id } });
};

exports.updateOrCreate = (githubId, name, avatar, token) => {

  return exports.getByGithub(githubId)
    .then(user => {

      if (!user) { return User.create({ githubId, name, avatar, token }); }
      if (!propsDiffer(user, { name, avatar, token })) { return user; }

      _.assign(user, { name, avatar, token });
      return user.save();
    })
    .then(user => {
      if (user.banned) { throw new Error('You are banned from KeyCode.'); }
      return user;
    });

};

exports.newResult = (wpm, accuracy, textId, userId) => {
  return Test.create({ wpm, accuracy, textId, userId });
};
