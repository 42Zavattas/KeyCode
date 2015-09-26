import React from 'react';

import connectToStores from 'fluxible-addons-react/connectToStores';
import provideContext from 'fluxible-addons-react/provideContext';

import { NavLink } from 'fluxible-router';

import TextStore from '../../stores/TextStore';
import createText from '../../actions/createText';

class Home extends React.Component {

  handleClick () {
    console.log(this.context.executeAction);
    /*this.context.executeAction(createText, {
      text: 'yolo'
    });*/
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick.bind(this)}>toto queal eot</button>
        <div className='brand'>
          <NavLink routeName='game'>Start</NavLink>
        </div>
      </div>
    );
  }

}

Home = connectToStores(Home, [TextStore], (context, props) => ({
}));

export default Home;
