'use strict';

import BaseStore from 'fluxible/addons/BaseStore';
import Parser from '../utils/Parser';
import _ from 'lodash';

class GameStore extends BaseStore {

  constructor (dispatcher) {
    super(dispatcher);

    _.assign(this, {

      // the list of players in the game
      players: [

        // mocked current player
        { name: 'me', typedWords: 0, typedLetters: 0 }
      ],

      // the text used
      text: Parser.parseText('if (a === b) {\n  alert();\n}'),

      // used to show a progress while loading text
      isLoadingText: false

    });
  }

  getPlayers () { return this.players; }
  getText () { return this.text; }

  handleAddUserToGame (player) {
    this.players.push(player);
    this.emitChange();
  }

  handleTypeBadWord (wordIndex) {
    const chunk = this.text.wordsChunks[wordIndex];
    chunk.bad = true;
    this.emitChange();
  }

  handleTypeGoodWord (wordIndex) {
    const chunk = this.text.wordsChunks[wordIndex];
    ++this.players[0].typedWords;
    this.players[0].typedLetters += chunk.val.length;
    this.emitChange();
  }

}

GameStore.storeName = 'GameStore';

GameStore.handlers = {
  USER_JOIN_GAME: 'handleAddUserToGame',
  TYPE_BAD_WORD: 'handleTypeBadWord',
  TYPE_GOOD_WORD: 'handleTypeGoodWord'
};

export default GameStore;
