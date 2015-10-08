'use strict';

import Sequelize from 'sequelize';

import db from './db';
import { User } from './';

export default db.define('text', {

  data: { type: Sequelize.STRING(1000) },
  author: { type: Sequelize.INTEGER, model: User },

  upvotes: { type: Sequelize.INTEGER, defaultValue: 0 },
  downvotes: { type: Sequelize.INTEGER, defaultValue: 0 },
  flags: { type: Sequelize.INTEGER, defaultValue: 0 },

  used: { type: Sequelize.INTEGER, defaultValue: 0 }

});
