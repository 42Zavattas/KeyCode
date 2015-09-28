import React from 'react';

import ApplicationStore from '../stores/ApplicationStore';

export default class Html extends React.Component {

  render () {

    let pageTitle = this.props.context.getStore(ApplicationStore).getPageTitle();

    return (
      <html>
        <head>
          <meta charSet='utf-8' />
          <title>{ pageTitle }</title>
          <meta name='viewport' content='width=device-width, user-scalable=no' />
          {
            process.env.NODE_ENV === 'prod' &&
            <link rel='stylesheet' href='/public/styles.css' />
          }
        </head>
        <body>
          <div id='app' dangerouslySetInnerHTML={ { __html: this.props.markup } }></div>
        </body>
        <script dangerouslySetInnerHTML={ { __html: this.props.state } }></script>
        <script src={ '/public/' + this.props.clientFile }></script>
      </html>
    );
  }

}
