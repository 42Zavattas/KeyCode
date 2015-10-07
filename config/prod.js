'use strict';

export default {

  postgres: process.env.POSTGRES_PROD,

  apiUrl: 'http://localhost:3000/api' || 'http://keycode.sh/api',
  callbackURL: 'http://keycode.sh/api/auth/callback'

};
