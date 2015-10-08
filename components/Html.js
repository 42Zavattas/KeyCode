'use strict';

import React from 'react';

import ApplicationStore from '../stores/ApplicationStore';

export default class Html extends React.Component {

  render () {

    const pageTitle = this.props.context.getStore(ApplicationStore).getPageTitle();

    return (
      <html>
        <head>

          <meta charSet='utf-8' />
          <link rel='icon' href='assets/favicon.ico' />

          <title>{pageTitle}</title>

          <meta
            name='viewport'
            content='width=device-width, user-scalable=no' />

          <link
            rel='stylesheet'
            href='http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css' />

          {process.env.NODE_ENV === 'prod' && (
            <link
              rel='stylesheet'
              href='/public/styles.css' />
          )}

        </head>
        <body>

          <div
            id='app'
            dangerouslySetInnerHTML={{ __html: this.props.markup }} />

        </body>

        <script dangerouslySetInnerHTML={{ __html: this.props.state }}></script>
        <script src={`/public/${this.props.clientFile}`}></script>

      </html>
    );
  }

}
