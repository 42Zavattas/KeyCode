'use strict';

import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';

import { navigateAction } from 'fluxible-router';
import { Loader } from '../ui';
import { loadRandom } from '../../actions/game';
import { GameStore } from '../../stores';

class RandomPage extends React.Component {

  componentDidMount () {
    setTimeout(() => {
      this.props.context.executeAction(loadRandom);
    });
  }

  componentDidUpdate () {
    if (this.props.isReady) {
      this.props.context.executeAction(
        navigateAction,
        {
          url: `/game/${this.props.textId}`
        }
      );
    }
  }

  render () {
    return (
      <div className='brand'>
        <Loader />
      </div>
    );
  }

}

export default connectToStores(RandomPage, [GameStore], ctx => {
  const gameStore = ctx.getStore(GameStore);
  return {
    isReady: gameStore.isReady(),
    textId: gameStore.getTextId()
  };
});
