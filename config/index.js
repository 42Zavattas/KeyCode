'use strict';

import _ from 'lodash';
import dotenv from 'dotenv';

dotenv.load();

const env = process.env.NODE_ENV || 'dev';
const envConfig = require(`./${env}`);

export default _.merge({

  env,
  secret: process.env.SECRET_KEY

}, envConfig);
