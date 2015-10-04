'use strict';

export function login (context) {
  context.dispatch('START_LOGIN');
  setTimeout(() => {
    context.dispatch('LOGIN_SUCCESS', {
      username: 'foo'
    });
  }, 1e3);
}

export function logout (context) {
  context.dispatch('LOGOUT');
}
