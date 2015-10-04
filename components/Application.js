'use strict';

import React from 'react';
import { connectToStores, provideContext } from 'fluxible-addons-react';
import { handleHistory } from 'fluxible-router';

import ApplicationStore from '../stores/ApplicationStore';
import AuthStore from '../stores/AuthStore';

import Header from './Header';

if (process.env.BROWSER === true) {
  require('gsap');
  require('gsap/src/minified/plugins/ScrollToPlugin.min.js');
  require('../styles/app.scss');
}

class Application extends React.Component {

  componentDidUpdate (prevProps) {
    const newProps = this.props;
    if (newProps.pageTitle === prevProps.pageTitle) { return; }
    document.title = newProps.pageTitle;
  }

  render () {

    const Handler = this.props.currentRoute.get('handler');

    return (
      <div className='App'>
        <Header context={this.props.context} />
        <div className='View'>
          <Handler context={this.props.context} />
        </div>
      </div>
    );
  }

}

export default handleHistory(provideContext(connectToStores(
  Application,
  [ApplicationStore, AuthStore],
  context => {
    const appStore = context.getStore(ApplicationStore);
    return {
      currentPageName: appStore.getCurrentPageName(),
      pageTitle: appStore.getPageTitle(),
      pages: appStore.getPages()
    };
  }
)));
