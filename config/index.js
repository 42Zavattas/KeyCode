'use strict';

import _ from 'lodash';

const env = process.env.NODE_ENV || 'dev';

export default _.merge({

  env

}, require('./' + env));
