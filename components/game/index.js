'use strict';

// modules
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';

// stores
import { AuthStore, GameStore } from '../../stores';

// components
import SourceCode from './SourceCode';
import SourceInput from './SourceInput';
import GameStats from './GameStats';

// actions
import {
  submitStats,
  destroyGame,
  tick,
  beginTest,
  updateWord,
  typeWord,
  reset
} from '../../actions/game';

class Game extends React.Component {

  constructor (props) {
    super(props);

    // handle 'restart' listener
    this._hasRestartListener = false;
    this.handleResetWithKb = this.handleResetWithKb.bind(this);

    // handle game tick, for refreshing stats
    this._gameTick = null;
    this._hasGameTick = false;
    this.updateStats = this.updateStats.bind(this);
  }

  componentDidUpdate () {

    if (this.props.isFinished) {

      // clear tick at the end of the test
      if (this._hasGameTick) {
        clearInterval(this._gameTick);
        this._hasGameTick = false;
      }

      // listen to 'R' key for restart
      if (!this._hasRestartListener) {
        document.addEventListener('keydown', this.handleResetWithKb);
        this._hasRestartListener = true;
      }

    } else if (this._hasRestartListener) {

      // remove restart listener
      document.removeEventListener('keydown', this.handleResetWithKb);
      this._hasRestartListener = false;
    }

  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.handleResetWithKb);
    if (this._hasGameTick) {
      clearInterval(this._gameTick);
    }
    setTimeout(() => {
      this.props.context.executeAction(destroyGame);
    });
  }

  updateStats () {
    this.props.context.executeAction(tick);
  }

  handleType (val) {
    if (!this.props.isPlaying) {

      // start timer
      this.props.context.executeAction(beginTest);

      // start interval
      this.updateStats();
      this._gameTick = setInterval(this.updateStats, 5e2);
      this._hasGameTick = true;
    }

    // update word
    this.props.context.executeAction(updateWord, val);
  }

  handleValidateWord () {
    this.props.context.executeAction(typeWord);
    if (this.props.currentWordIndex === this.props.text.words.length - 1) {
      this.props.context.executeAction(submitStats, {
        textId: this.props.textId,
        ...this.props.stats,
        isLogged: this.props.isLogged
      });
    }
  }

  handleReset () {
    this.props.context.executeAction(reset);
  }

  handleResetWithKb (e) {
    if (e.which === 82) {
      this.handleReset();
    }
  }

  render () {

    const {
      stats,
      currentWordIndex,
      typedWord,
      text,
      isFinished,
    } = this.props;

    return (
      <div className='Game'>

        <GameStats
          stats={stats} />

        {!isFinished && (
          <div className='GameContainer'>

            <SourceCode
              context={this.props.context}
              isFocused={this.props.isFocused}
              text={text}
              isFinished={isFinished}
              currentWordIndex={currentWordIndex}
              typedWord={typedWord} />

            <SourceInput
              isFocused={this.props.isFocused}
              context={this.props.context}
              typedWord={typedWord}
              onChange={this.handleType.bind(this)}
              onValidate={this.handleValidateWord.bind(this)} />

          </div>
        )}

        <div
          className='f fai fjc'
          style={{ marginTop: '5em' }}>

          <button
            className='ZavButton high f fai'
            onClick={this.handleReset.bind(this)}>
            <i
              className='ion-android-refresh'
              style={{ fontSize: '1.5rem', marginRight: '0.5rem' }} />
            {isFinished ? 'Press \'R\' to restart' : 'Restart'}
          </button>

        </div>

      </div>
    );
  }
}

export default connectToStores(Game, [AuthStore, GameStore], context => {
  const gameStore = context.getStore(GameStore);
  const authStore = context.getStore(AuthStore);
  return {
    stats: gameStore.getStats(),
    text: gameStore.getText(),
    textId: gameStore.getTextId(),
    currentWordIndex: gameStore.currentWordIndex(),
    typedWord: gameStore.typedWord(),
    isPlaying: gameStore.isPlaying(),
    isFinished: gameStore.isFinished(),
    isFocused: gameStore.isFocused(),
    isLogged: authStore.isLogged()
  };
});
