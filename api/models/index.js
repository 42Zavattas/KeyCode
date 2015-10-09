'use strict';

import q from 'q';
import Text from './text.model';
import User from './user.model';
import Language from './language.model';
import Test from './test.model';
import Vote from './vote.model';

q.all([
  User.sync(),
  Language.sync(),
  Vote.sync()
])
.then(() => {
  return Text.sync();
})
.then(() => {
  return Test.sync();
});

Text.belongsTo(Language);

// A test in on a text from a user
Test.belongsTo(User);
Test.belongsTo(Text);

// A vote is cast by a user on a text
Vote.belongsTo(User);
Vote.belongsTo(Text);

export default {

  User,
  Text,
  Language,
  Test,
  Vote

};
