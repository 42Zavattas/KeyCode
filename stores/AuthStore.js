'use strict';

import BaseStore from 'fluxible/addons/BaseStore';

export default class AuthStore extends BaseStore {

  constructor (dispatcher) {
    super(dispatcher);
    this._user = null;
    this._token = null;
    this._isLogging = false;
  }

  dehydrate () {
    return {
      token: this._token,
      user: this._user,
      isLogging: this._isLogging
    };
  }

  rehydrate (state) {
    this._token = state.token;
    this._user = state.user;
    this._isLogging = state.isLogging;
  }

  loadSession (payload) {
    this._isLogging = false;
    if (!payload) { return this.emitChange(); }
    this._token = payload.token;
    this._user = payload.user;
    this.emitChange();
  }

  handleStartLogin () {
    this._isLogging = true;
    this.emitChange();
  }

  handleLogout () {
    this._token = null;
    this._user = null;
    this.emitChange();
  }

  isLogging () {
    return this._isLogging;
  }

  getUser () {
    return this._user;
  }

  getToken () {
    return this._token;
  }

  isLogged () {
    return !!this._user;
  }

}

AuthStore.storeName = 'AuthStore';

AuthStore.handlers = {
  START_LOGIN: 'handleStartLogin',
  USER_LOGOUT: 'handleLogout',
  LOAD_SESSION: 'loadSession'
};
