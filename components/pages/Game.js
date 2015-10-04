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
import typeBadWord from '../../actions/typeBadWord';
import typeGoodWord from '../../actions/typeGoodWord';

class Game extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      currentWordIndex: 0,
      typedWord: ''
    };
  }

  increment () {
    if (this.state.currentWordIndex === this.props.text.words.length) { return; }
    this.setState({
      currentWordIndex: this.state.currentWordIndex + 1,
      typedWord: ''
    });
  }

  handleType (val) {
    this.setState({
      typedWord: val
    });
  }

  handleValidateWord (typedWord) {
    const wantedWord = this.props.text.words[this.state.currentWordIndex];
    const action = (typedWord !== wantedWord) ? typeBadWord : typeGoodWord;
    this.props.context.executeAction(action, this.state.currentWordIndex);
    this.increment();
  }

  render () {

    const { currentWordIndex, typedWord } = this.state;
    const { text, players } = this.props;
    const isFinished = currentWordIndex >= text.words.length;

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
            text={text}
            players={players} />
        )}

      </div>
    );
  }
}

export default connectToStores(Game, [GameStore], context => {
  const gameStore = context.getStore(GameStore);
  return {
    players: gameStore.getPlayers(),
    text: gameStore.getText()
  };
});
