'use strict';

import React from 'react';
import { NavLink } from 'fluxible-router';

import connectToStores from 'fluxible-addons-react/connectToStores';
import AuthStore from '../stores/AuthStore';
import { logout } from '../actions/auth';

import { GithubButton } from './ui';

class Header extends React.Component {

  constructor (props) {
    super(props);
  }

  logout () {
    this.props.context.executeAction(logout);
  }

  render () {
    return (
      <div className='Header'>
        <div className='f fai'>

          <NavLink
            routeName='home'
            className='f fai'
            style={{ marginRight: '1em' }}>
            <img
              height='50'
              src='assets/images/logo-1.svg' />
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
            <div className='f fai'>
              <div
                className='ProfilePic'
                style={{
                  backgroundImage: 'url(https://avatars2.githubusercontent.com/u/6033345?v=3&s=400)',
                  backgroundSize: '100%'
                }} />
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
