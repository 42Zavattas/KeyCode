'use strict';

import React from 'react';
import { NavLink } from 'fluxible-router';

import connectToStores from 'fluxible-addons-react/connectToStores';
import AuthStore from '../stores/AuthStore';
import { logout } from '../actions/auth';
import { loadRandom } from '../actions/game';

import { GithubButton } from './ui';
import ProfileBox from './ProfileBox';

class Header extends React.Component {

  constructor (props) {
    super(props);
  }

  randomGame () {
    this.props.context.executeAction(loadRandom);
  }

  logout () {
    this.props.context.executeAction(logout);
  }

  render () {

    const { isLogged, user } = this.props;

    return (
      <div className='Header'>
        <div className='f fai'>

          <NavLink
            routeName='home'
            className='f fai headerLogo'
            style={{ marginRight: '1em' }}>
            <img
              height='50'
              src='assets/images/logo-1.svg' />
          </NavLink>

          <button
            onClick={this.randomGame.bind(this)}
            className='ZavButton clear'
            style={{ padding: '0.5em 1em', marginRight: '0.5rem' }}>
            <i
              className='ion-ios-play'
              style={{ fontSize: '1.5rem', marginRight: '0.5rem' }} />
            {'Random game'}
          </button>

          <NavLink
            className='ZavButton clear'
            routeName='languages'
            style={{ padding: '0.5em 1em' }}>
            <i
              className='ion-code-working'
              style={{ fontSize: '1.5rem', marginRight: '0.5rem' }} />
            {'Explore'}
          </NavLink>

        </div>
        <div className='f mla fai'>

          {isLogged && (
            <ProfileBox
              context={this.props.context}
              user={user} />
          )}

          {!isLogged && (
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
