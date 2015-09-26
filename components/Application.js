/*globals document*/

import React from 'react';
import ApplicationStore from '../stores/ApplicationStore';
import TextStore from '../stores/TextStore';
import { connectToStores, provideContext } from 'fluxible-addons-react';
import { handleHistory } from 'fluxible-router';

import Footer from './Footer';
import Header from './Header';

if (process.env.BROWSER === true) {
  require('gsap');
  require('../styles/app.scss');
}

class Application extends React.Component {

  render() {

    var Handler = this.props.currentRoute.get('handler');

    return (
      <div className='App'>
        <Header />
        <div className='View'>
          <Handler context={this.props.context} />
        </div>
        <Footer />
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    const newProps = this.props;
    if (newProps.pageTitle === prevProps.pageTitle) { return; }
    document.title = newProps.pageTitle;
  }

}

export default handleHistory(provideContext(connectToStores(
  Application,
  [ApplicationStore, TextStore],
  (context, props) => {
    var appStore = context.getStore(ApplicationStore);
    console.log('"YOOOOOOOOOOOOOOOOOOOOOOOOOO"');
    return {
      currentPageName: appStore.getCurrentPageName(),
      pageTitle: appStore.getPageTitle(),
      pages: appStore.getPages()
    };
  }
)));
