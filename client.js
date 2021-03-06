'use strict';

import React from 'react';
import debug from 'debug';
import { createElementWithContext } from 'fluxible-addons-react';

const debugClient = debug('keycode');

import app from './app';

const dehydratedState = window.App;

window.React = React;
window.fluxibleDebug = debug;

debugClient('rehydrating app');
app.rehydrate(dehydratedState, (err, context) => {

  if (err) { throw err; }

  window.context = context;
  const mountNode = document.getElementById('app');

  React.render(createElementWithContext(context), mountNode, () => {
    debugClient('react rendered');
  });

});
