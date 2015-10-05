'use strict';

// modules
import React from 'react';
import ReactTransitionGroup from 'react/lib/ReactTransitionGroup';
import connectToStores from 'fluxible-addons-react/connectToStores';

// stores
import GameStore from '../../stores/GameStore';

// components
import SourceCode from '../SourceCode';
import SourceInput from '../SourceInput';
import GameStats from '../GameStats';
import { Slider } from '../ui';

// actions
import { beginTest, updateWord, typeWord, setFocus } from '../../actions/game';

class Game extends React.Component {

  componentDidMount () {
    setTimeout(() => {
      this.props.context.executeAction(setFocus, true);
    });
  }

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
      stats,
      currentWordIndex,
      typedWord,
      text,
      isFinished,
    } = this.props;

    return (
      <div className='Game'>

        <ReactTransitionGroup>
          {!isFinished && (
            <Slider>

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

            </Slider>
          )}
        </ReactTransitionGroup>

        <GameStats
          stats={stats} />

      </div>
    );
  }
}

export default connectToStores(Game, [GameStore], context => {
  const gameStore = context.getStore(GameStore);
  return {
    stats: gameStore.getStats(),
    text: gameStore.getText(),
    currentWordIndex: gameStore.currentWordIndex(),
    typedWord: gameStore.typedWord(),
    isPlaying: gameStore.isPlaying(),
    isFinished: gameStore.isFinished(),
    isFocused: gameStore.isFocused()
  };
});
