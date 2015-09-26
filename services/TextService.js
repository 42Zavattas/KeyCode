'use strict';

import fs from 'fs';

export default {

  name: 'text',

  create: (req, resource, params, body, config, done) => {
    console.log('CREATING A TEXT');
    // hehehe mongoose here
    // yallah
    done(null, { id: 1 });
  }

}
