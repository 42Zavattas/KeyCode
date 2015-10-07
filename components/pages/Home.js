'use strict';

import React from 'react';

import { NavLink } from 'fluxible-router';

export default class Home extends React.Component {

  componentDidMount () {
    React.findDOMNode(this.refs.startbtn).focus();
  }

  render () {
    return (
      <div style={{ padding: '8rem 0', textAlign: 'center' }}>

        <div
          className='f fjc fai'
          style={{ marginBottom: '2em' }}>
          <NavLink
            routeName='game'>
            <img
              style={{ display: 'block' }}
              height='200'
              src='assets/images/logo-1.svg' />
          </NavLink>
        </div>

        <p className='dark'>
          {'Increase your coding speed.'}
        </p>
        <p
          className='dark'
          style={{ marginBottom: '2em', fontStyle: 'italic' }}>
          {'Right now.'}
        </p>
        <div
          className='f fjc'
          style={{ marginBottom: '1em' }}>
          <NavLink
            routeName='game'
            className='ZavButton high'
            ref='startbtn'>
            <i
              className='ion-ios-keypad'
              style={{ fontSize: '1.5rem', marginRight: '0.5rem' }} />
            {'Play a random game'}
          </NavLink>
        </div>
        <p className='dark'>
          {'or '}
          <NavLink
            className='underline'
            routeName='game'>
            {'choose a langage'}
          </NavLink>
        </p>
      </div>
    );
  }

}
