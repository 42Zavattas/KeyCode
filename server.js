'use strict';

import q from 'q';
import React from 'react';
import path from 'path';
import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import serialize from 'serialize-javascript';
import { navigateAction } from 'fluxible-router';
import { createElementWithContext } from 'fluxible-addons-react';

import app from './app';
import config from './config';
import HtmlComponent from './components/Html';
import { checkSession } from './actions/auth';

const htmlComponent = React.createFactory(HtmlComponent);
const server = express();

server.use(bodyParser.json());
server.use(cookieParser());
server.use(compression());
server.use('/public', express.static(path.join(__dirname, '/build')));
server.use('/assets', express.static(path.join(__dirname, '/assets')));
server.use('/api', require('./api'));

/**
 * Isomorphic data fetching
 */

server.use((req, res, next) => {

  const context = app.createContext({ req, res, config });

  const actionContext = context.getActionContext();

  q.all([
    actionContext.executeAction(checkSession, null),
    actionContext.executeAction(navigateAction, { url: req.url })
  ])
  .then(() => {
    const dehydratedState = app.dehydrate(context);

    const exposed = `window.App=${serialize(dehydratedState)};`;

    const html = React.renderToStaticMarkup(htmlComponent({
      clientFile: config.env === 'prod' ? 'main.min.js' : 'main.js',
      context: context.getComponentContext(),
      state: exposed,
      markup: React.renderToString(createElementWithContext(context))
    }));

    res.type('html');
    res.write(`<!DOCTYPE html>${html}`);
    res.end();
  })
  .catch(err => { next(err); });

});

const port = process.env.PORT || 3000;

server.listen(port);

/* eslint-disable no-console */

console.log(`Application listening on port ${port}`);

/* eslint-enable no-console */

export default server;
