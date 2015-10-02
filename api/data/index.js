'use strict';

import q from 'q';

import config from '../../config';

let pgp = require('pg-promise')({ promiseLib: q });
let db = pgp(config.postgres);

export default {

  db

}
