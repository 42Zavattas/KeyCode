'use strict';

import React from 'react';

import connectToStores from 'fluxible-addons-react/connectToStores';
import AuthStore from '../../stores/AuthStore';

import userLognup from '../../actions/userLognup';

class Login extends React.Component {

  constructor (props) {
    super(props);
    this.state = { email: '' };
  }

  lognup () {
    this.props.context.executeAction(userLognup, this.state.email);
  }

  handleInput (e) {
    if (e.which === 13) { return this.lognup(); }
    this.setState({ email: e.target.value });
  }

  render () {
    return (
      <div className='Login'>
        <p>Enter your email to login.</p>
        <input
          className='ZavInput'
          value={this.state.email}
          onChange={this.handleInput.bind(this)}
          onKeyDown={this.handleInput.bind(this)}
          type='text'
          placeholder='Email'/>
        <p>{this.props.lognupMessage}</p>
      </div>
    );
  }

}

export default connectToStores(Login, [AuthStore], context => {
  const authStore = context.getStore(AuthStore);
  return {
    isLogged: authStore.isLogged(),
    lognupMessage: authStore.getLognupMessage()
  };
});
