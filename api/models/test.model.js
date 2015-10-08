'use strict';

import Sequelize from 'sequelize';

import db from './db';

export default db.define('test', {

  wpm: { type: Sequelize.INTEGER },
  accuracy: { type: Sequelize.INTEGER }

});
