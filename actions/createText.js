'use strict';

export default function createText (context, payload, done) {
  context.service.create('text', {}, {}, (err, res) => {
    context.dispatch('CREATE_TEXT', res);
  });
}
