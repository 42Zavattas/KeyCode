'use strict';

import Sequelize from 'sequelize';

import db from './db';

export default db.define('vote', {

  value: { type: Sequelize.BOOLEAN }

});
