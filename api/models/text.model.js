'use strict';

import mongoose from 'mongoose';

const TextSchema = new mongoose.Schema({

  // Well, you know, the data.
  data: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  // Used to validate a user text
  votes: { type: Number },
  approved: { type: Boolean, default: false },

  rating: { type: Number },
  ratingCount: { type: Number }

});

export default mongoose.model('Text', TextSchema);
