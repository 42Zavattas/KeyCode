'use strict';

import BaseStore from 'fluxible/addons/BaseStore';
import Parser from '../utils/Parser';
import _ from 'lodash';
import moment from 'moment';

class GameStore extends BaseStore {

  constructor (dispatcher) {
    super(dispatcher);

    _.assign(this, {
      text: null,
      _source: null,
      _isReady: false,
      _stats: {},
      _typedLetters: 0,
      _currentWordIndex: 0,
      _typedWord: '',
      _isPlaying: false,
      _isFinished: false,
      _isFocused: false,
      _startDate: null
    });
  }

  init (text) {
    _.assign(this, {

      // check if a text is currently being fetched
      _isFetching: false,

      // source from server
      _source: text || null,

      _isReady: !!text,

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
      text: text ? Parser.parseText(text.data) : null,

      // used to see if a test is in progress
      _isPlaying: false,

      // used to see if test is finished
      _isFinished: false,

      // input is focused ?
      _isFocused: !!text,

      // begin/end timestamps
      _startDate: null

    });
  }

  getStats () { return this._stats; }
  getText () { return this.text; }
  getTextSource () { return this._source; }
  getTextId () { return _.get(this._source, 'id'); }
  getDuration () {
    if (!this._startDate) { return 0; }
    return moment().diff(this._startDate);
  }
  typedLetters () { return this._typedLetters; }
  isFetching () { return this._isFetching; }
  isPlaying () { return this._isPlaying; }
  isReady () {
    return this._isReady;
  }
  isFinished () { return this._isFinished; }
  currentWordIndex () { return this._currentWordIndex; }
  typedWord () { return this._typedWord; }
  isFocused () { return this._isFocused; }

  calcStats () {
    if (this._currentWordIndex === 0) { return; }
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
    if (!this.text) { return; }
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
    this.init(this._source);
    this.emitChange();
  }

  handleGameTick () {
    this.calcStats();
    this.emitChange();
  }

  handleTextLoad () {
    this._isReady = false;
    this._isFetching = true;
    this.text = null;
    this._source = null;
    this.emitChange();
  }

  handleRandomTextLoaded (text) {
    this.init(text);
    this.emitChange();
  }

  handleTextLoaded (text) {
    this.init(text);
    this.emitChange();
  }

  handleDestroyGame () {
    this.init();
    this.emitChange();
  }

}

GameStore.storeName = 'GameStore';

GameStore.handlers = {
  DESTROY_GAME: 'handleDestroyGame',
  TEXT_LOAD: 'handleTextLoad',
  TEXT_LOADED: 'handleTextLoaded',
  RANDOM_TEXT_LOADED: 'handleRandomTextLoaded',
  GAME_TICK: 'handleGameTick',
  RESET_GAME: 'handleReset',
  INPUT_SET_FOCUS: 'handleSetFocus',
  BEGIN_TEST: 'handleBeginTest',
  UPDATE_WORD: 'handleUpdateWord',
  TYPE_WORD: 'handleTypeWord'
};

export default GameStore;
