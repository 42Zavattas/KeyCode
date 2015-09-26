import React from 'react';
import debug from 'debug';
import { createElementWithContext } from 'fluxible-addons-react';

import app from './app';

const debugClient = debug('keycode');
const dehydratedState = window.App;

window.React = React;
window.fluxibleDebug = debug;

app.rehydrate(dehydratedState, (err, context) => {

  if (err) { throw err; }

  window.context = context;
  const mountNode = document.getElementById('app');

  React.render(
    createElementWithContext(context),
    mountNode,
    () => debugClient('React Rendered')
  );

});
