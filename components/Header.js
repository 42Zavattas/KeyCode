import React from 'react';
import { NavLink } from 'fluxible-router';

export default class Header extends React.Component {

  render () {
    return (
      <div className='Header'>
        <div className='f'>
          <NavLink className='Header-item active' routeName='home'>
            KeyCode
          </NavLink>
          <NavLink className='Header-item active' routeName='game'>
            Game
          </NavLink>
        </div>
        <div className='f mla fai'>
          <div className='GoldEarned p1 f fai'>
            530
            <div className='GoldIcon'></div>
          </div>
          <div className='p1'>
            <div className='ProfilePic' />
          </div>
        </div>
      </div>
    );
  }

}
