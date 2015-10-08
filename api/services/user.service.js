'use strict';

import { User } from '../models';

exports.getById = id => {
  return User.findById(id);
};

exports.getByGithub = id => {
  return User.findOne({ where: { githubId: id }});
};

exports.updateOrCreate = (githubId, name, avatar) => {

  return User.upsert({ name, avatar, githubId }, { fields: ['name', 'avatar'] })
    .then(user => {
      if (user.banned) { throw new Error('You are banned from KeyCode.'); }
      return user;
    });

};
