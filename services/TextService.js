'use strict';

import { Text } from '../models';

export default {

  name: 'text',

  create: (req, resource, params, body, config, done) => {

    Text.create({
      data: body.data
    }, done);

  }

}
