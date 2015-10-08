'use strict';

import React from 'react';

import Game from '../game';

export default class GamePage extends React.Component {

  render () {
    return (
      <Game
        context={this.props.context} />
    );
  }
}
