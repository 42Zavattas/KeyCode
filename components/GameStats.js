'use strict';

import React from 'react';

import { Pie, WpmBar } from './ui';

export default class GameStats extends React.Component {

  constructor (props) {
    super(props);
  }

  render () {

    const {
      stats
    } = this.props;

    return (
      <div className='GameStats f fae fjc'>
        <div style={{ marginRight: '4rem' }}>
          <WpmBar wpm={stats.wpm} />
        </div>
        <Pie percent={stats.accuracy}>
          Accuracy
        </Pie>
      </div>
    );
  }

}
