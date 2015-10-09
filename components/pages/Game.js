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
    text: gameStore.getText(),
    route: routeStore.getCurrentNavigate()
  };
})
export default class GamePage extends React.Component {

  constructor (props) {
    super(props);

    if (!props.text) {
      const id = props.route.url.split('/')[2];
      props.context.executeAction(loadText, id);
    }
  }

  render () {

    const { text } = this.props;
    const hasText = !!text;

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
