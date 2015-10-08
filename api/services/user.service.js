'use strict';

import _ from 'lodash';
import { propsDiffer } from './utils.service';

import { User } from '../models';

exports.getAll = () => {
  return User.findAll();
};

exports.getById = id => {
  return User.findById(id);
};

exports.getByGithub = id => {
  return User.findOne({ where: { githubId: id } });
};

exports.updateOrCreate = (githubId, name, avatar) => {

  return exports.getByGithub(githubId)
    .then(user => {

      if (!user) { return User.create({ githubId, name, avatar }); }
      if (!propsDiffer(user, { name, avatar })) { return user; }

      _.assign(user, { name, avatar });
      return user.save();
    })
    .then(user => {
      if (user.banned) { throw new Error('You are banned from KeyCode.'); }
      return user;
    });

};
