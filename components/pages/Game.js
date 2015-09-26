import React from 'react';

import SourceCode from '../SourceCode';
import SourceInput from '../SourceInput';

import connectToStores from 'fluxible-addons-react/connectToStores';
import GameStore from '../../stores/GameStore';

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
    if (this.state.currentWordIndex === this.props.text.words.length - 1) { return; }
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

  handleValidateWord (word) {
    this.increment();
  }

  render() {
    return (
      <div className='Game'>

        <SourceCode
          text={this.props.text}
          currentWordIndex={this.state.currentWordIndex}
          typedWord={this.state.typedWord} />

        <SourceInput
          typedWord={this.state.typedWord}
          onChange={this.handleType.bind(this)}
          onValidate={this.handleValidateWord.bind(this)} />

        <button onClick={this.decrement.bind(this)}>dec</button>
        <button onClick={this.increment.bind(this)}>inc</button>
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
