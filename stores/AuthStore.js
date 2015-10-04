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

  handleStartLogin () {
    this._isLogging = true;
    this.emitChange();
  }

  handleLogin (user) {
    this._isLogging = false;
    this._user = user;
    this.emitChange();
  }

  handleLogout () {
    this._jwt = null;
    this._user = null;
    AuthStore.removeToken();
    this.emitChange();
  }

  isLogging () {
    return this._isLogging;
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
  USER_LOGOUT: 'handleLogout'
};
