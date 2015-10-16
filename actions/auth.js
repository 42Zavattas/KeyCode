'use strict';

export function login (context, payload) {
  context.dispatch('START_LOGIN');
  window.location.href = `/api/auth${ payload ? `data=${JSON.stringify(payload)}` : '' }`;
}

export function checkSession (context, payload, done) {
  const token = context.cookie.get('token');

  if (!token) {
    context.dispatch('LOAD_SESSION');
    return done();
  }

  context.api.getSession(token, (err, user) => {
    if (err) { return done(err); }
    context.dispatch('LOAD_SESSION', { token, user });
    if (!user) { context.cookie.clear('token'); }
    done();
  });
}

export function logout (context) {
  context.cookie.clear('token');
  context.dispatch('USER_LOGOUT');
}
