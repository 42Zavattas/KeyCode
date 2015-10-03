'use strict';

import BaseStore from 'fluxible/addons/BaseStore';
import _ from 'lodash';

class GameStore extends BaseStore {

  static buildText (text) {
    const chunks = [];
    const words = [];
    const mem = {
      word: [],
      ret: [],
      space: []
    };

    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (c === ' ') {
        checkAndPush('word', 'ret');
        mem.space.push(c);
      } else if (c === '\n') {
        checkAndPush('word', 'space');
        mem.ret.push(c);
      } else {
        checkAndPush('ret', 'space');
        mem.word.push(c);
      }
    }

    checkAndPush('word', 'space', 'ret');

    function checkAndPush () {
      const args = Array.prototype.slice.call(arguments);
      args.forEach(term => {
        if (mem[term].length) {
          const val = mem[term].join('');
          chunks.push({ type: term, val });
          if (term === 'word') {
            words.push(val);
          }
          mem[term] = [];
        }
      });
    }

    return {
      chunks,
      wordsChunks: chunks.filter(c => c.type === 'word'),
      words
    };
  }

  constructor (dispatcher) {
    super(dispatcher);

    _.assign(this, {

      // the list of players in the game
      players: [

        // mocked current player
        { name: 'me', typedWords: 0, typedLetters: 0 }
      ],

      // the text used
      text: GameStore.buildText('server.use(\'/public\', express.static(path.join(__dirname, \'/build\')));\nserver.use(compression());\nserver.use(bodyParser.json());\n\n/**\n * Isomorphic data fetching\n */\n\nimport textService from \'./services/TextService\';\nimport userService from \'./services/UserService\';\n\nconst fetchrPlugin = app.getPlugin(\'FetchrPlugin\');\nfetchrPlugin.registerService(textService);\nfetchrPlugin.registerService(userService);\n\nserver.use(fetchrPlugin.getXhrPath(), fetchrPlugin.getMiddleware());\n'),

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
