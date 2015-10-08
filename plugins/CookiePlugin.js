import _ from 'lodash';

import Env from '../utils/Env';

class Cookie {

  constructor (opts) {
    opts = opts || {};
    if (Env.isServer() && (!opts.req || !opts.res)) {
      throw new Error('Express req & res are required.');
    }

    this._req = opts.req;
    this._res = opts.res;
  }

  get (name) {
    if (Env.isServer()) { return _.get(this._req, `cookies.${name}`); }

    const val = `; ${document.cookie}`;
    const parts = val.split(`; ${name}=`);
    if (parts.length !== 2) { return null; }
    return parts.pop().split(';').shift();
  }

  set (name, val) {
    if (Env.isServer()) { return this._res.cookie(name, val); }
    document.cookie = `${name}=${val}`;
  }

  clear (name) {
    if (Env.isServer()) { return this._res.clearCookie(name); }
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  }

};

export default {

  name: 'CookiePlugin',

  plugContext: opts => {

    return {
      plugActionContext: ctx => {
        ctx.cookie = new Cookie({
          req: opts.req,
          res: opts.res
        });
      }
    };

  }
};
