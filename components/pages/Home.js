'use strict';

import React from 'react';

import { NavLink } from 'fluxible-router';
import { loadRandom } from '../../actions/game';

export default class Home extends React.Component {

  componentDidMount () {
    React.findDOMNode(this.refs.startbtn).focus();
  }

  randomGame () {
    this.props.context.executeAction(loadRandom);
  }

  render () {
    return (
      <div style={{ padding: '8rem 0', textAlign: 'center' }}>

        <div
          className='f fjc fai'
          style={{ marginBottom: '2em' }}>
          <div
            style={{ cursor: 'pointer' }}
            onClick={this.randomGame.bind(this)}
            routeName='random'>
            <img
              style={{ display: 'block' }}
              height='200'
              src='assets/images/logo-1.svg' />
          </div>
        </div>

        <p className='light'>
          {'Increase your coding speed.'}
        </p>
        <p
          className='dark'
          style={{ marginBottom: '2em' }}>
          {'Now. Right now.'}
        </p>
        <div
          className='f fjc'
          style={{ marginBottom: '1em' }}>
          <button
            onClick={this.randomGame.bind(this)}
            className='ZavButton high'
            ref='startbtn'>
            <i
              className='ion-ios-play'
              style={{ fontSize: '1.5rem', marginRight: '0.5rem' }} />
            {'Play a random game'}
          </button>
        </div>
        <p className='dark'>
          {'or '}
          <NavLink
            className='underline'
            routeName='languages'>
            {'choose a language'}
          </NavLink>
        </p>
      </div>
    );
  }

}
