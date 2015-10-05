'use strict';

import React from 'react';

import { Pie } from './ui';

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
        accuracy:
        <Pie percent={stats.accuracy} />
        wpm: {stats.wpm}
      </div>
    );
  }

}
