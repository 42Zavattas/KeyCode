'use strict';

import BaseStore from 'fluxible/addons/BaseStore';
import Parser from '../utils/Parser';
import _ from 'lodash';
import moment from 'moment';

class GameStore extends BaseStore {

  constructor (dispatcher) {
    super(dispatcher);
    this.init();
  }

  init () {
    _.assign(this, {

      // stats on the current game
      _stats: {
        wpm: 0,
        accuracy: 100
      },

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

      // input is focused ?
      _isFocused: false,

      // begin/end timestamps
      _startDate: null

    });
  }

  getStats () { return this._stats; }
  getText () { return this.text; }
  getDuration () {
    if (!this._startDate) { throw new Error('Nope !'); }
    return moment().diff(this._startDate);
  }
  typedLetters () { return this._typedLetters; }
  isPlaying () { return this._isPlaying; }
  isFinished () { return this._isFinished; }
  currentWordIndex () { return this._currentWordIndex; }
  typedWord () { return this._typedWord; }
  isFocused () { return this._isFocused; }

  calcStats () {
    const textPart = this.text.words.slice(0, this._currentWordIndex);
    const lettersInText = textPart.join('').length;
    const averageLettersByWord = lettersInText / textPart.length;
    const accuracy = Math.round((this._typedLetters / lettersInText) * 100);
    const wordsTyped = this._typedLetters / averageLettersByWord;
    const duration = this.getDuration();
    const minutes = (duration / 1000 / 60);
    if (!minutes) { return; }
    let wpm = (1 / minutes) * wordsTyped;
    wpm = Math.ceil(wpm * (accuracy / 100));

    _.assign(this._stats, {
      accuracy,
      wpm
    });
  }

  handleTypeWord () {
    if (!this._startDate) {
      this._startDate = moment();
    }
    const chunk = this.text.wordsChunks[this._currentWordIndex];
    if (!chunk) { return; }
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
    this.calcStats();
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

  handleSetFocus (isFocused) {
    this._isFocused = isFocused;
    this.emitChange();
  }

  handleReset () {
    this.init();
    this.emitChange();
  }

}

GameStore.storeName = 'GameStore';

GameStore.handlers = {
  RESET_GAME: 'handleReset',
  INPUT_SET_FOCUS: 'handleSetFocus',
  BEGIN_TEST: 'handleBeginTest',
  UPDATE_WORD: 'handleUpdateWord',
  TYPE_WORD: 'handleTypeWord'
};

export default GameStore;
