'use strict';

import React from 'react';
import { NavLink } from 'fluxible-router';
import connectToStores from 'fluxible-addons-react/connectToStores';

import { ExploreStore } from '../../stores';
import { loadTexts } from '../../actions/explore';

@connectToStores([ExploreStore], context => {
  const exploreStore = context.getStore(ExploreStore);
  return {
    isFetching: exploreStore.isFetching(),
    texts: exploreStore.getTexts()
  };
})
export default class ExplorePage extends React.Component {

  constructor (props) {
    super(props);

    setTimeout(() => {
      props.context.executeAction(loadTexts);
    });
  }

  render () {

    const { texts } = this.props;

    return (
      <div className='Explore'>
        {texts.map((t, i) => (
          <div key={i} className='TestItem'>
            <div className='VoteBox'>
              <i className='ion-arrow-up-b' />
              <div className='vote'>{t.upvotes - t.downvotes}</div>
              <i className='ion-arrow-down-b' />
            </div>
            <NavLink href={`/game/${t.id}`} className='body'>
              <header>
                {t.title || 'Unnamed'}
              </header>
              <section>
                <img height='20' src={`assets/images/languages/${t.language.img}`} />
                <span className='language'>{t.language.name}</span>
              </section>
            </NavLink>
          </div>
        ))}
      </div>
    );
  }

}
