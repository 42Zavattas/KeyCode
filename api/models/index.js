'use strict';

import q from 'q';
import Text from './text.model';
import User from './user.model';
import Language from './language.model';

q.all([
    User.sync(),
    Language.sync(),
  ])
  .then(() => { return Text.sync(); })
  .catch(err => { console.log(err); });

export default {

  User,
  Text,
  Language

};