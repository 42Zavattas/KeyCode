'use strict';

import React from 'react';

export default class GameStats extends React.Component {

  constructor (props) {
    super(props);
  }

  render () {

    const {
      text,
      players
    } = this.props;

    // for the moment, only 1 player
    const player = players[0];

    const accuracy = Math.round((player.typedLetters / text.words.join('').length) * 100);

    return (
      <div className='GameStats'>
        accuracy: {accuracy}%
      </div>
    );
  }

}
