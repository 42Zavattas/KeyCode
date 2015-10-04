'use strict';

import BaseStore from 'fluxible/addons/BaseStore';
import Parser from '../utils/Parser';
import _ from 'lodash';
import moment from 'moment';

class GameStore extends BaseStore {

  constructor (dispatcher) {
    super(dispatcher);

    _.assign(this, {

      // number of letter typed
      _typedLetters: 0,

      // current word index
      _currentWordIndex: 0,

      // typed word
      _typedWord: '',

      // the text used
      text: Parser.parseText('context\n  .getActionContext()\n  .executeAction(navigateAction, { url: req.url }, (err) => {\n    if (err) {\n      if (err.statusCode && err.statusCode === 404) { next(); }\n      else { next(err); }\n      return;\n    }\n'),

      // used to show a progress while loading text
      isLoadingText: false,

      // used to see if a test is in progress
      _isPlaying: false,

      // used to see if test is finished
      _isFinished: false,

      // begin/end timestamps
      _startDate: null,
      _endDate: null

    });
  }

  getPlayers () { return this.players; }
  getText () { return this.text; }
  getDuration () {
    if (!this._startDate || !this._endDate) { return null; }
    return this._endDate.diff(this._startDate);
  }
  typedLetters () { return this._typedLetters; }
  isPlaying () { return this._isPlaying; }
  isFinished () { return this._isFinished; }
  currentWordIndex () { return this._currentWordIndex; }
  typedWord () { return this._typedWord; }

  handleTypeWord () {
    if (!this._startDate) {
      this._startDate = moment();
    }
    const chunk = this.text.wordsChunks[this._currentWordIndex];
    if (chunk.val !== this._typedWord) {
      chunk.bad = true;
    } else {
      this._typedLetters += chunk.val.length;
    }
    if (this._currentWordIndex >= this.text.words.length - 1) {
      this._isFinished = true;
      this._endDate = moment();
    }
    ++this._currentWordIndex;
    this._typedWord = '';
    this.emitChange();
  }

  handleBeginTest (momentDate) {
    this._isPlaying = true;
    this._startDate = momentDate;
    this.emitChange();
  }

  handleUpdateWord (word) {
    this._typedWord = word;
    this.emitChange();
  }

}

GameStore.storeName = 'GameStore';

GameStore.handlers = {
  BEGIN_TEST: 'handleBeginTest',
  UPDATE_WORD: 'handleUpdateWord',
  TYPE_WORD: 'handleTypeWord'
};

export default GameStore;
