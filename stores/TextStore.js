'use strict';

import BaseStore from 'fluxible/addons/BaseStore';

class TextStore extends BaseStore {

  constructor (dispatcher) {
    super(dispatcher);
  }

  handleCreateText (payload) {
    console.log('yaaaa');
    console.log(payload);
  }

}

TextStore.storeName = 'TextStore';
TextStore.handlers = {
  'CREATE_TEXT': 'handleCreateText'
};

export default TextStore;
