'use strict';

import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';

import Game from '../game';
import GameStore from '../../stores/GameStore';
import { RouteStore } from 'fluxible-router';
import { Loader } from '../ui';
import {
  loadText
} from '../../actions/game';

@connectToStores([GameStore, RouteStore], context => {
  const gameStore = context.getStore(GameStore);
  const routeStore = context.getStore(RouteStore);
  return {
    isFetching: gameStore.isFetching(),
    textSource: gameStore.getTextSource(),
    route: routeStore.getCurrentNavigate()
  };
})
export default class GamePage extends React.Component {

  constructor (props) {
    super(props);

    const id = props.route.url.split('/')[2];

    if (!props.textSource || id !== String(props.textSource.id)) {
      setTimeout(() => {
        props.context.executeAction(loadText, id);
      });
    }
  }

  render () {

    const { textSource } = this.props;
    const hasText = !!textSource;

    return (
      <div>

        {hasText && (
          <Game
            context={this.props.context} />
        )}

        {!hasText && (
          <div className='brand'>
            <Loader />
          </div>
        )}

      </div>
    );
  }
}

