'use strict';

export function login (context) {
  context.dispatch('START_LOGIN');
  window.location.href = '/api/auth';
}

export function logout (context) {
  context.dispatch('LOGOUT');
}
