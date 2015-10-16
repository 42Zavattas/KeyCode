'use strict';

import _ from 'lodash';
import Sequelize from 'sequelize';

import { propsDiffer } from './utils.service';
import { User, Test } from '../models';
import GithubService from './github.service';

/**
 * Get all users.
 * @returns {Promise}
 */
exports.getAll = () => {
  return User.findAll();
};

/**
 * Get a user by its id.
 *
 * @param id {Number}
 * @returns {Promise}
 */
exports.getById = id => {
  return User.findById(id);
};

/**
 * Get a user by its github identifier
 *
 * @param id {Number}
 * @returns {Promise}
 */
exports.getByGithub = id => {
  return User.findOne({ where: { githubId: id } });
};

/**
 * Get user average wpm across all his results.
 *
 * @param id {Number}
 * @returns {Promise}
 */
exports.getAverageWpm = id => {
  return Test.findOne({
    attributes: [[Sequelize.fn('AVG', Sequelize.col('wpm')), 'average']],
    where: { userId: id }
  })
  .then(res => { return _.get(res, 'dataValues.average'); });
};

/**
 * Update a user with his new github infos or create one.
 *
 * @param githubId {Number} Github user identifier
 * @param name {String}
 * @param avatar {String}
 * @param token {String} Github user token
 * @returns {Promise}
 */
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

/**
 * Create a new test result for a user.
 *
 * @param test {Object}
 * @param test.wpm {Number}
 * @param test.accuracy {Number}
 * @param test.textId {Number}
 * @param test.userId {Number}
 * @returns {Promise}
 */
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
      return exports.getAverageWpm(_user.id);
    })
    .then(average => {
      if (!average) { throw new Error('No average wpm for user.'); }
      return GithubService.updateUserRank(_user, Math.floor(average));
    });
};
