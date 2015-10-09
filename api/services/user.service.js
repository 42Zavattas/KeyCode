'use strict';

import _ from 'lodash';
import Sequelize from 'sequelize';

import { propsDiffer } from './utils.service';
import { User, Test } from '../models';
import GithubService from './github.service';

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

exports.newResult = test => {

  if (!test.wpm || !test.accuracy || !test.textId || !test.userId) { throw new Error('Missing test data.'); }

  let _user;

  return exports.getById(test.userId)
    .then(user => {
      if (!user) { throw new Error('No such user.'); }
      _user = user;
      return Test.create(_.pick(test, ['wpm', 'accuracy', 'textId', 'userId']));
    })
    .then(() => {
      return Test.findOne({
        attributes: [[Sequelize.fn('AVG', Sequelize.col('wpm')), 'average']],
        where: { userId: _user.id }
      });
    })
    .then(res => {
      if (!_.has(res, 'dataValues.average')) { throw new Error('No average wpm for user.'); }
      return GithubService.updateUserRank(_user, Math.floor(res.dataValues.average));
    });
};
