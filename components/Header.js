import React from 'react';
import { NavLink } from 'fluxible-router';

export default class Header extends React.Component {

  render () {
    return (
      <div className='Header'>
        <h1>
          <NavLink routeName='home'>KeyCode</NavLink>
        </h1>
      </div>
    );
  }

}
