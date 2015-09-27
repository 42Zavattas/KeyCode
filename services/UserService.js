'use strict';

import { User } from '../models';

export default {

  name: 'user',

  create: (req, resource, params, body, context, done) => {

    User.create({
      name: body.name,
      email: body.email
    }, done);

  }

}
