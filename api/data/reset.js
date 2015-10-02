'use strict';

import { db } from './index';

import Text from './text.table';
import User from './user.table';

/**
 * Use at your own risks, will drop the tables and recreate them.
 */
db.query('DROP TABLE texts')
  .then(() => {
    return db.query('DROP TABLE users');
  })
  .then(() => {
    return db.query(User);
  })
  .then(() => {
    return db.query(Text);
  });
