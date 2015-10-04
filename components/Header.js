'use strict';

import React from 'react';
import { NavLink } from 'fluxible-router';

import connectToStores from 'fluxible-addons-react/connectToStores';
import AuthStore from '../stores/AuthStore';
import userLogout from '../actions/userLogout';

import GithubButton from './GithubButton';

class Header extends React.Component {

  constructor (props) {
    super(props);
  }

  logout () {
    this.props.context.executeAction(userLogout);
  }

  render () {
    return (
      <div className='Header'>
        <div className='f'>

          <NavLink
            routeName='home'
            style={{ padding: '1em', marginRight: '1em' }}>
            {'KeyCode'}
          </NavLink>

          <NavLink
            className='ZavButton high'
            routeName='game'
            style={{ padding: '0.5em 1em' }}>
            <i
              className='ion-ios-keypad'
              style={{ fontSize: '1.5rem', marginRight: '0.5rem' }} />
            {'Play'}
          </NavLink>

        </div>
        <div className='f mla fai'>

          {this.props.isLogged && (
            <div className='f'>
              <div className='ProfilePic' />
            </div>
          )}

          {!this.props.isLogged && (
            <GithubButton context={this.props.context} />
          )}

        </div>
      </div>
    );
  }

}

export default connectToStores(Header, [AuthStore], context => {
  const authStore = context.getStore(AuthStore);
  return {
    isLogged: authStore.isLogged(),
    user: authStore.getUser()
  };
});
