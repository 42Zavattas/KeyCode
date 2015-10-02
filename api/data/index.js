'use strict';

import q from 'q';

import config from '../../config';

let pgp = require('pg-promise')({ promiseLib: q });
let db = pgp(config.postgres);

import Text from './text.table';
import User from './user.table';

export default {

  db,

  init: () => {
    return db.query(User)
      .then(function () {
        return db.query(Text);
      });
  }

}
