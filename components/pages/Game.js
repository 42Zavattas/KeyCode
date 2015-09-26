import React from 'react';

import SourceCode from '../SourceCode';
import SourceInput from '../SourceInput';

import connectToStores from 'fluxible-addons-react/connectToStores';
import GameStore from '../../stores/GameStore';

class Game extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      currentWord: 0
    };
  }

  increment () {
    this.setState({
      currentWord: this.state.currentWord + 1
    });
  }

  render() {
    return (
      <div className='Game'>
        <SourceCode text={this.props.text} currentWord={this.state.currentWord} />
        <SourceInput />
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
