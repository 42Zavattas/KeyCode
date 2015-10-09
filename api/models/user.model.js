'use strict';

import Sequelize from 'sequelize';

import db from './db';

export default db.define('user', {

  name: { type: Sequelize.STRING },
  avatar: { type: Sequelize.STRING },
  email: { type: Sequelize.STRING },

  banned: { type: Sequelize.BOOLEAN, defaultValue: false },
  admin: { type: Sequelize.BOOLEAN, defaultValue: false },

  githubId: { type: Sequelize.BIGINT, unique: true },
  token: { type: Sequelize.STRING },
  currentOrg: { type: Sequelize.INTEGER }

});
