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
        {'KeyCode will come soon.'}<br />
        {'Be prepared.'}<br /><br />
        <div className='f fjc'>
          <NavLink
            routeName='game'
            className='ZavButton high'
            ref='startbtn'>
            <i
              className='ion-ios-keypad'
              style={{ fontSize: '1.5rem', marginRight: '0.5rem' }} />
            Play a practice game now
          </NavLink>
        </div>
      </div>
    );
  }

}
