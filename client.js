import React from 'react';
import { createElementWithContext } from 'fluxible-addons-react';

import app from './app';

const dehydratedState = window.App;

window.React = React;

app.rehydrate(dehydratedState, (err, context) => {

  if (err) { throw err; }

  window.context = context;
  const mountNode = document.getElementById('app');

  React.render(createElementWithContext(context), mountNode);

});
