'use strict';

// modules
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';

// stores
import GameStore from '../../stores/GameStore';

// components
import SourceCode from '../SourceCode';
import SourceInput from '../SourceInput';
import GameStats from '../GameStats';

// actions
import { beginTest, updateWord, typeWord } from '../../actions/game';

class Game extends React.Component {

  handleType (val) {
    if (!this.props.isPlaying) {

      // start timer
      this.props.context.executeAction(beginTest);
    }

    // update word
    this.props.context.executeAction(updateWord, val);
  }

  handleValidateWord () {
    this.props.context.executeAction(typeWord);
  }

  render () {

    const {
      currentWordIndex,
      typedWord,
      text,
      isFinished,
      typedLetters,
      duration
    } = this.props;

    return (
      <div className='Game'>

        {!isFinished && (
          <div>
            <SourceCode
              text={text}
              isFinished={isFinished}
              currentWordIndex={currentWordIndex}
              typedWord={typedWord} />
            <SourceInput
              typedWord={typedWord}
              onChange={this.handleType.bind(this)}
              onValidate={this.handleValidateWord.bind(this)} />
          </div>
        )}

        {isFinished && (
          <GameStats
            duration={duration}
            typedLetters={typedLetters}
            text={text} />
        )}

      </div>
    );
  }
}

export default connectToStores(Game, [GameStore], context => {
  const gameStore = context.getStore(GameStore);
  return {
    text: gameStore.getText(),
    currentWordIndex: gameStore.currentWordIndex(),
    typedWord: gameStore.typedWord(),
    isPlaying: gameStore.isPlaying(),
    isFinished: gameStore.isFinished(),
    typedLetters: gameStore.typedLetters(),
    duration: gameStore.getDuration()
  };
});
