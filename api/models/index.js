'use strict';

import q from 'q';
import Text from './text.model';
import User from './user.model';
import Language from './language.model';
import Test from './test.model';

q.all([
  User.sync(),
  Language.sync(),
])
.then(() => {
  return Text.sync();
})
.then(() => {
  return Test.sync();
});

Text.belongsTo(Language);
Test.belongsTo(User);
Test.belongsTo(Text);

export default {

  User,
  Text,
  Language,
  Test

};
