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
  explore: {
    path: '/explore',
    method: 'get',
    page: 'explore',
    title: 'Explore tests',
    handler: require('./components/pages/Explore')
  },
  game: {
    path: '/game/:id',
    method: 'get',
    page: 'game',
    title: 'Game',
    handler: require('./components/pages/Game')
  }
};
