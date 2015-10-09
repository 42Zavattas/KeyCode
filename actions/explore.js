'use strict';

import superagent from 'superagent';

export function loadTexts (context, payload, done) {

  context.dispatch('TEXTS_LOAD');

  superagent.get(`${context.api._getUrl()}/texts`)
    .accept('json')
    .end((err, res) => {
      if (err) { throw err; }
      context.dispatch('TEXTS_LOADED', res.body);
      done();
    });

}
