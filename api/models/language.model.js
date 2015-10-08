'use strict';

import Sequelize from 'sequelize';

import db from './db';

export default db.define('language', {

  name: { type: Sequelize.STRING },
  img: { type: Sequelize.STRING }

});
