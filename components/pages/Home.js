import React from 'react';

import connectToStores from 'fluxible-addons-react/connectToStores';
import provideContext from 'fluxible-addons-react/provideContext';
import { NavLink } from 'fluxible-router';

export default class Home extends React.Component {

  render () {
    return (
      <div>
        Hello.
      </div>
    );
  }

}
