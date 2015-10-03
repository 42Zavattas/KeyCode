'use strict';

import q from 'q';

import config from '../../config';

const pgp = require('pg-promise')({ promiseLib: q });
const db = pgp(config.postgres);

export default {

  db

};
