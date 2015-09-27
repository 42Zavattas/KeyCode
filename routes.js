export default {
  home: {
    path: '/',
    method: 'get',
    page: 'home',
    title: 'Home',
    handler: require('./components/pages/Home')
  },
  game: {
    path: '/game',
    method: 'get',
    page: 'game',
    title: 'Game',
    handler: require('./components/pages/Game')
  }
};
