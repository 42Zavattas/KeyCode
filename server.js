import React from 'react';
import path from 'path';
import debugLib from 'debug';
import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import serialize from 'serialize-javascript';
import { navigateAction } from 'fluxible-router';

import app from './app';
import config from './config';
import HtmlComponent from './components/Html';
import { createElementWithContext } from 'fluxible-addons-react';

const htmlComponent = React.createFactory(HtmlComponent);

const server = express();

server.use('/public', express.static(path.join(__dirname, '/build')));
server.use(compression());
server.use(bodyParser.json());
server.use('/api', require('./api'));

/**
 * Isomorphic data fetching
 */

server.use((req, res, next) => {

  let context = app.createContext();

  context
    .getActionContext()
    .executeAction(navigateAction, { url: req.url }, (err) => {
      if (err) {
        if (err.statusCode && err.statusCode === 404) { next(); }
        else { next(err); }
        return;
      }

      const exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';

      const html = React.renderToStaticMarkup(htmlComponent({
        clientFile: config.env === 'prod' ? 'main.min.js' : 'main.js',
        context: context.getComponentContext(),
        state: exposed,
        markup: React.renderToString(createElementWithContext(context))
      }));

      res.type('html');
      res.write('<!DOCTYPE html>' + html);
      res.end();

    });
});

const port = process.env.PORT || 3000;

server.listen(port);
console.log('Application listening on port ' + port);

export default server;
