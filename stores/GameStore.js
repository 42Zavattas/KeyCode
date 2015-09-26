import BaseStore from 'fluxible/addons/BaseStore';
import _ from 'lodash';

class GameStore extends BaseStore {

  constructor (dispatcher) {
    super(dispatcher);

    _.assign(this, {

      // the list of players in the game
      players: [],

      // the text used
      text: 'if (id === 5) {\n  console.log(\'yallah\');\n}',

      // used to show a progress while loading text
      isLoadingText: false

    });
  }

  getPlayers () { return this.players; }
  getText () { return this.text; }

  handleAddUserToGame (player) {
    console.log('store: adding user to game', user);
    this.players.push(player);
    this.emitChange();
  }

}

GameStore.storeName = 'GameStore';

GameStore.handlers = {
  'USER_JOIN_GAME'  : 'handleAddUserToGame'
};

export default GameStore;
