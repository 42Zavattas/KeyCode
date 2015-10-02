'use strict';

import _ from 'lodash';
import dotenv from 'dotenv';

dotenv.load();

const env = process.env.NODE_ENV || 'dev';

export default _.merge({

  env,
  secret: process.env.SECRET_KEY

}, require('./' + env));
