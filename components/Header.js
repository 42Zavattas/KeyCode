import React from 'react';
import { NavLink } from 'fluxible-router';

import connectToStores from 'fluxible-addons-react/connectToStores';
import AuthStore from '../stores/AuthStore';
import userLogout from '../actions/userLogout';

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
          <NavLink routeName='home' style={{ padding: '1em', marginRight: '1em' }}>
            KeyCode
          </NavLink>
          <NavLink className='ZavButton high' routeName='game' style={{ padding: '0.5em 1em' }}>
            <i className='ion-ios-keypad' style={{ fontSize: '1.5rem', marginRight: '0.5rem' }} />
           Play
          </NavLink>
        </div>
        <div className='f mla fai'>

          {this.props.isLogged && (
            <div className='f'>
              <div className='GoldEarned p1 f fai'>
                {this.props.user.gold}
                <div className='GoldIcon'></div>
              </div>
              <div className='p1'>
                <div className='ProfilePic' />
              </div>
              <i onClick={this.logout.bind(this)} className="Logout f fai fa fa-sign-out p1"></i>
            </div>
          )}

          {!this.props.isLogged && (
            <NavLink className='ZavButton' routeName='login' style={{ padding: '0.5em 1em' }}>
              <i className='ion-social-github' style={{ fontSize: '1.5rem', marginRight: '0.5rem' }} />
              Login with GitHub
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
