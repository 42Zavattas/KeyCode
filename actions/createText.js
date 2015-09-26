'use strict';

export default function createText (actionCtx, payload, done) {
  console.log('entering create text');
  setTimeout(function () {
    console.log('timeout ok');
    actionCtx.dispatch('CREATE_ACTION', payload);
    done();
  });
}
