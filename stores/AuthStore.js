'use strict';

import BaseStore from 'fluxible/addons/BaseStore';

export default class AuthStore extends BaseStore {

  static getToken () {
    const val = `; ${document.cookie}`;
    const parts = val.split('; token=');
    if (parts.length !== 2) { return null; }
    return parts.pop().split(';').shift();
  }

  static removeToken () {
    document.cookie = 'token =; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  constructor (dispatcher) {
    super(dispatcher);
    this._user = null;
    this._jwt = null;
    this._lognupMessage = null;
    this._isLogging = false;
  }

  isLogging () {
    return this._isLogging;
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

  handleStartLogin () {
    this._isLogging = true;
    this.emitChange();
  }

  handleLogin (user) {

    this._isLogging = false;
    this._user = user;
    this.emitChange();

    /*
    const token = AuthStore.getToken();
    if (!token) { return; }

    fetch('/api/users/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => { return res.json(); })
    .then(user => {
      this._user = user;
      this._jwt = token;
      this.emitChange();
    })
    .catch(err => {
      console.log(err);
      this._isLogging = false;
      this.handleLogout();
    });*/

  }

  handleLogout () {
    this._isLogged = false;
    this._jwt = null;
    this._user = null;
    AuthStore.removeToken();
    this.emitChange();
  }

  getUser () {
    return this._user;
  }

  getToken () {
    return this._jwt;
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
  START_LOGIN: 'handleStartLogin',
  LOGIN_SUCCESS: 'handleLogin',
  LOGOUT: 'handleLogout',
  USER_LOGNUP: 'handleLognup',
  USER_LOGIN: 'handleLogin',
  USER_LOGOUT: 'handleLogout'
};
