'use strict';

import q from 'q';

import { db } from '../data';

export default {

  create: (name, email) => {

    if (!name || !email) {
      return q.reject(new Error('Missing data'));
    }

    return db.one('SELECT * FROM users WHERE email = $1', email)
      .then(function (user) {

        if (user) { return user; }

        return db.query(`
          INSERT INTO users(name, email) VALUES ($1, $2)
        `, [name, email]);
      });

  }

}
