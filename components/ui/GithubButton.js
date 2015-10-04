'use strict';

import React from 'react';
import { connectToStores } from 'fluxible-addons-react';

import { AuthStore } from '../../stores';
import { login, logout } from '../../actions/auth';

class GithubButton extends React.Component {

  handleClick () {
    const { isLogged, isLogging } = this.props;
    if (isLogging) { return; }
    if (!isLogged) {
      this.props.context.executeAction(login);
    } else {
      this.props.context.executeAction(logout);
    }
  }

  render () {
    const { isLogged, isLogging } = this.props;
    return (
      <button
        onClick={this.handleClick.bind(this)}
        className='ZavButton high'
        style={{ padding: '0.5em 1em' }}>
        <i
          className='ion-social-github'
          style={{ fontSize: '1.5rem', marginRight: '0.5rem' }} />
        {!isLogged && !isLogging && (
          <span>{'Login with GitHub'}</span>
        )}
        {!isLogged && isLogging && (
          <span>{'Connecting...'}</span>
        )}
        {isLogged && (
          <span>{'Disconnect'}</span>
        )}
      </button>
    );
  }

}

export default connectToStores(
  GithubButton,
  [AuthStore],
  context => {
    const authStore = context.getStore(AuthStore);
    return {
      isLogged: authStore.isLogged(),
      isLogging: authStore.isLogging()
    };
  }
);
