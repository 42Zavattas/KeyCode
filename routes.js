'use strict';

export default {
  home: {
    path: '/',
    method: 'get',
    page: 'home',
    title: 'Home',
    handler: require('./components/pages/Home')
  },
  login: {
    path: '/login',
    method: 'get',
    page: 'login',
    title: 'Login',
    handler: require('./components/pages/Login')
  },
  game: {
    path: '/game',
    method: 'get',
    page: 'game',
    title: 'Game',
    handler: require('./components/pages/Game')
  }
};
