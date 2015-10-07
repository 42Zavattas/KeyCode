import _ from 'lodash';
import superagent from 'superagent';

import AuthStore from '../stores/AuthStore';

class Api {

  constructor (opts) {
    opts = opts || {};
    this._getUrl = opts.getUrl;
    this._getToken = opts.getToken;
  }

  getSession (token, cb) {

    superagent.get(`${this._getUrl()}/users/me`)
      .accept('json')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        cb(err, res.body);
      });

  }

};

export default {

  name: 'ApiPlugin',

  plugContext: opts => {

    let apiUrl = _.get(opts, 'config.apiUrl');

    return {
      plugActionContext: ctx => {
        ctx.api = new Api({
          getUrl: () => { return apiUrl; },
          getToken: () => { return ctx.getStore(AuthStore).getToken(); }
        });
      },
      dehydrate: () => { return { apiUrl }; },
      rehydrate: state => { apiUrl = state.apiUrl; }
    }

  }

};
