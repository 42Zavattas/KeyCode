'use strict';

export default {
  home: {
    path: '/',
    method: 'get',
    page: 'home',
    title: 'Home',
    handler: require('./components/pages/Home')
  },
  languages: {
    path: '/languages',
    method: 'get',
    page: 'languages',
    title: 'Choose you language',
    handler: require('./components/pages/Languages')
  },
  game: {
    path: '/game',
    method: 'get',
    page: 'game',
    title: 'Game',
    handler: require('./components/pages/Game')
  }
};
