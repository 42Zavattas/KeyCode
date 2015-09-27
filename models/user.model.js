'use strict';

import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({

  name: { type: String },
  email: { type: String },

  lognup: { type: String },
  lognupAt: { type: Date },

  banned: { type: Boolean, default: false },
  admin: { type: Boolean, default: false }

});

export default mongoose.model('User', UserSchema);
