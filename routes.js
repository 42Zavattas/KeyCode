'use strict';

export default {
  home: {
    path: '/',
    method: 'get',
    page: 'home',
    title: 'Home',
    handler: require('./components/pages/Home')
  },
  profile: {
    path: '/profile',
    method: 'get',
    page: 'profile',
    title: 'Profile',
    handler: require('./components/pages/Profile')
  },
  languages: {
    path: '/languages',
    method: 'get',
    page: 'languages',
    title: 'Choose you language',
    handler: require('./components/pages/Languages')
  },
  game: {
    path: '/game/:id',
    method: 'get',
    page: 'game',
    title: 'Game',
    handler: require('./components/pages/Game')
  }
};
