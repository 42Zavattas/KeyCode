/* globals document */

import React from 'react';
import { connectToStores, provideContext } from 'fluxible-addons-react';
import { handleHistory } from 'fluxible-router';

import ApplicationStore from '../stores/ApplicationStore';
import AuthStore from '../stores/AuthStore';
import userLogin from '../actions/userLogin';

import Footer from './Footer';
import Header from './Header';

if (process.env.BROWSER === true) {
  require('gsap');
  require('gsap/src/minified/plugins/ScrollToPlugin.min.js');
  require('../styles/app.scss');
}

class Application extends React.Component {

  render () {

    var Handler = this.props.currentRoute.get('handler');

    return (
      <div className='App'>
        <Header />
        <div className='View'>
          <Handler context={this.props.context} />
        </div>
      </div>
    );
  }

  componentDidMount () {
    this.props.context.executeAction(userLogin);
  }

  componentDidUpdate (prevProps, prevState) {
    const newProps = this.props;
    if (newProps.pageTitle === prevProps.pageTitle) { return; }
    document.title = newProps.pageTitle;
  }

}

export default handleHistory(provideContext(connectToStores(
  Application,
  [ApplicationStore, AuthStore],
  (context, props) => {
    let appStore = context.getStore(ApplicationStore);
    return {
      currentPageName: appStore.getCurrentPageName(),
      pageTitle: appStore.getPageTitle(),
      pages: appStore.getPages()
    };
  }
)));
