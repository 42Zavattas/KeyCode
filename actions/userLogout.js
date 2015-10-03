'use strict';

export default function userLogout (context, payload) {
  context.dispatch('USER_LOGOUT', payload);
}
