import React from 'react';

import SourceCode from '../SourceCode';
import SourceInput from '../SourceInput';

import connectToStores from 'fluxible-addons-react/connectToStores';
import GameStore from '../../stores/GameStore';

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

  decrement () {
    if (this.state.currentWordIndex === 0) { return; }
    this.setState({
      currentWordIndex: this.state.currentWordIndex - 1,
      typedWord: ''
    });
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
    let wantedWord = this.props.text.words[this.state.currentWordIndex];
    console.log(wantedWord);
    let action = (typedWord !== wantedWord) ? typeBadWord : typeGoodWord;
    this.props.context.executeAction(action, this.state.currentWordIndex);
    this.increment();
  }

  render() {
    return (
      <div className='Game'>

        <SourceCode
          text={this.props.text}
          currentWordIndex={this.state.currentWordIndex}
          typedWord={this.state.typedWord} />

        {this.state.currentWordIndex < this.props.text.words.length && (
          <SourceInput
            typedWord={this.state.typedWord}
            onChange={this.handleType.bind(this)}
            onValidate={this.handleValidateWord.bind(this)} />
        )}

      </div>
    );
  }
}

export default connectToStores(Game, [GameStore], (context) => {
  var gameStore = context.getStore(GameStore);
  return {
    players: gameStore.getPlayers(),
    text: gameStore.getText()
  };
});
