'use strict';

import _ from 'lodash';
import dotenv from 'dotenv';

dotenv.load();

const env = process.env.NODE_ENV || 'dev';
const envConfig = require(`./${env}`);

export default _.merge({

  env,
  secret: process.env.SECRET_KEY,
  githubId: process.env.GITHUB_ID,
  githubSecret: process.env.GITHUB_SECRET,
  githubToken: process.env.GITHUB_TOKEN,

  orgIds: {
    5: 1810152,
    10: 1810158,
    15: 1810159,
    20: 1810160,
    25: 1810238,
    30: 1810239,
    35: 1810242,
    40: 1810243,
    45: 1810244,
    50: 1810245,
    55: 1810247,
    60: 1810250,
    65: 1810466,
    70: 1810468,
    75: 1810469,
    80: 1814543,
    85: 1814548,
    90: 1814551,
    95: 1814553,
    100: 1814555,
    105: 1814597,
    110: 1814598,
    115: 1814599,
    120: 1814600,
    125: 1814601,
    130: 1814602,
    135: 1814603,
    140: 1814605,
    145: 1814606,
    150: 1814608
  }

}, envConfig);
