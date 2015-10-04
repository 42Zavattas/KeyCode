'use strict';

import { db } from '../data';

exports.getById = id => {
  return db.one('SELECT * FROM users WHERE id = $1', id);
};

exports.getByGithub = id => {
  return db.one('SELECT * FROM users WHERE githubId = $1', id);
};

exports.updateOrCreate = (id, name, avatar) => {

  return db.oneOrNone('SELECT * FROM users WHERE githubId = $1', id)
    .then(user => {
      if (user) {
        return db.none(`
          UPDATE users SET name = $1, avatar = $2 WHERE id = $3;
        `, [name, avatar, user.id])
          .then(() => {
            return { ...user, name, avatar };
          });
      }

      return db.none(`
        INSERT INTO users(name, avatar, githubId) VALUES ($1, $2, $3);
      `, [name, avatar, id]);
    })
    .then(user => {
      if (user) { return user; }
      return exports.getByGithub(id);
    })
    .then(user => {
      if (user.banned) { throw new Error('You are banned from KeyCode.'); }
      return user;
    });

};
