'use strict';

import React from 'react';

export default class GameStats extends React.Component {

  constructor (props) {
    super(props);
  }

  render () {

    const {
      stats
    } = this.props;

    return (
      <div className='GameStats'>
        accuracy: {stats.accuracy}%<br />
        wpm: {stats.wpm}
      </div>
    );
  }

}
