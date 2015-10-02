import BaseStore from 'fluxible/addons/BaseStore';

export default class AuthStore extends BaseStore {

  static getToken () {
    let val = '; ' + document.cookie;
    let parts = val.split('; token=');
    if (parts.length !== 2) { return null; }
    return parts.pop().split(';').shift();
  }

  constructor (dispatcher) {
    super(dispatcher);
    this._user = null;
    this._jwt = null;
    this._lognupMessage = null;
  }

  handleLognup (email) {

    fetch('/api/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    })
    .then(res => { return res.json(); })
    .then(data => {
      this._lognupMessage = data.message;
      this.emitChange();
    });

  }

  handleLogin () {
    fetch('/api/users/me', {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + 'tttt' }
    })
    .then(user => {
      console.log(user);
    })
    .catch(err => {
      console.log(err);
    });
    this._jwt = jwt;
    this._user = {};
    this.emitChange();
  }

  handleLogout () {
    this._jwt = null;
    this._user = null;
    this.emitChange();
  }

  getUser () {
    return this._user;
  }

  getLognupMessage () {
    return this._lognupMessage;
  }

  isLogged () {
    return !!this._user;
  }

}

AuthStore.storeName = 'AuthStore';

AuthStore.handlers = {
  USER_LOGNUP: 'handleLognup',
  USER_LOGIN: 'handleLogin',
  USER_LOGOUT: 'handleLogout'
};
