'use strict';

import BaseStore from 'fluxible/addons/BaseStore';
import _ from 'lodash';

class ExploreStore extends BaseStore {

  constructor (dispatcher) {
    super(dispatcher);

    _.assign(this, {

      // the texts container
      _texts: [],

      // check if store is currently fetching
      _isFetching: false

    });
  }

  getTexts () { return this._texts; }
  isFetching () { return this._isFetching; }

  /**
   * Load texts start
   */
  handleTextsLoad () {
    this._isFetching = true;
    this.emitChange();
  }

  /**
   * Texts are loaded
   */
  handleTextsLoaded (texts) {
    this._texts = texts;
    this._isFetching = false;
    this.emitChange();
  }

}

ExploreStore.storeName = 'ExploreStore';

ExploreStore.handlers = {
  TEXTS_LOAD: 'handleTextsLoad',
  TEXTS_LOADED: 'handleTextsLoaded'
};

export default ExploreStore;
