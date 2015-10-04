'use strict';

import React from 'react';

export default class GameStats extends React.Component {

  constructor (props) {
    super(props);
  }

  render () {

    const {
      text,
      players,
      duration
    } = this.props;

    // for the moment, only 1 player
    const player = players[0];

    const accuracy = Math.round((player.typedLetters / text.words.join('').length) * 100);
    const wordsTyped = player.typedLetters / text.averageLettersByWord;
    const minutes = (duration / 1000 / 60);
    const wpm = Math.ceil((1 / minutes) * wordsTyped);

    return (
      <div className='GameStats'>
        accuracy: {accuracy}%<br />
        wpm: {wpm}
      </div>
    );
  }

}
