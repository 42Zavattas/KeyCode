import React from 'react';
import { NavLink } from 'fluxible-router';

class Home extends React.Component {

  render() {
    return (
      <div>
        <div className='brand'>
          <NavLink routeName='game'>Start a new game</NavLink>
        </div>
      </div>
    );
  }

}

export default Home;
