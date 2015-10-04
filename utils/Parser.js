'use strict';

export default class Parser {

  static parseText (text) {
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

}
