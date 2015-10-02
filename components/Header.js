import React from 'react';
import { NavLink } from 'fluxible-router';

import connectToStores from 'fluxible-addons-react/connectToStores';
import AuthStore from '../stores/AuthStore';

class Header extends React.Component {

  render () {
    return (
      <div className='Header'>
        <div className='f'>
          <NavLink className='Header-item active' routeName='home'>
            KeyCode
          </NavLink>
          <NavLink className='Header-item active' routeName='game'>
            Game
          </NavLink>
        </div>
        <div className='f mla fai'>

          {this.props.isLogged && (
            <div className='f'>
              <div className='GoldEarned p1 f fai'>
                530
                <div className='GoldIcon'></div>
              </div>
              <div className='p1'>
                <div className='ProfilePic' />
              </div>
            </div>
          )}

          {!this.props.isLogged && (
            <NavLink routeName='login' className='Header-item'>
              Login
            </NavLink>
          )}

        </div>
      </div>
    );
  }

}

export default connectToStores(Header, [AuthStore], (context) => {
  let authStore = context.getStore(AuthStore);
  return {
    isLogged: authStore.isLogged(),
    user: authStore.getUser()
  };
});
