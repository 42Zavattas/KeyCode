'use strict';

import { UserService } from '../services';

export default {

  create: (req, res) => {
    UserService.create(req.body.name, req.body.email)
      .then(function (user) {
        res.status('200').send(user);
      })
      .catch(function (err) {
        res.status(400).send({ message: err.message });
      });
  }

}
