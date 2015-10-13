'use strict';

import q from 'q';
import _ from 'lodash';
import Github from 'github';

import config from '../../config';

const github = new Github({ version: '3.0.0' });

github.authenticate({ type: 'token', token: config.githubToken });

/**
 * Remove a user from his current organization
 *
 * @param {Object} user
 * @returns {Promise}
 */
exports.removeUserFromOrg = user => {

  return q.nfcall(
    github.orgs.removeMember,
    { org: `KeyCode-${user.currentOrg}`, user: user.name }
  ).catch(() => { return null; });

};

/**
 * Add a user to his new organization
 *
 * @param {Object} user
 * @returs {Promise}
 */
exports.addUserToOrg = (user, org) => {

  user.currentOrg = org;

  if (!_.has(config.orgIds, org)) {
    return q.reject(new Error('Invalid organization.'));
  }

  const userGithub = new Github({ version: '3.0.0', debug: true });
  userGithub.authenticate({ type: 'oauth', token: user.token });

  return user.save()
    .then(() => {
      return q.nfcall(
        github.orgs.addTeamMembership,
        { id: config.orgIds[org], user: user.name }
      );
    })
    .then(() => {
      return q.nfcall(
        userGithub.user.editOrganizationMembership,
        { org: `KeyCode-${org}`, state: 'active' }
      );
    })
    .then(() => {
      return q.nfcall(
        userGithub.orgs.publicizeMembership,
        { org: `KeyCode-${org}`, user: user.name }
      );
    });

};

/**
 * Tool called on each game ending,
 * Will reassign user to organisations.
 *
 * @param {Object} user
 * @param {Number} wpm
 * @returns {Promise}
 */
exports.updateUserRank = (user, wpm) => {

  const org = Math.floor(wpm / 5) * 5;

  return q()
    .then(() => {
      if (!user.currentOrg || org === user.currentOrg) { return null; }
      return exports.removeUserFromOrg(user);
    })
    .then(() => {
      if (org === 0) { return null; }
      return exports.addUserToOrg(user, org);
    });

};

/**
 * Used for debug only, get the org ids
 */
exports.getOrgsIds = () => {

  [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60].forEach(e => {
    const name = `KeyCode-${e}`;
    return q.nfcall(github.orgs.getTeams, { org: name })
      .then(res => {

        /* eslint-disable no-console */

        console.log(name, res[0].id);

        /* eslint-enable no-console */

      });
  });

};
