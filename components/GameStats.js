'use strict';

import React from 'react';

export default class GameStats extends React.Component {

  constructor (props) {
    super(props);
  }

  render () {

    const {
      text,
      duration,
      typedLetters
    } = this.props;

    const accuracy = Math.round((typedLetters / text.words.join('').length) * 100);
    const wordsTyped = typedLetters / text.averageLettersByWord;
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
