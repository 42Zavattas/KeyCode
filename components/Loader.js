'use strict';

import React from 'react';

export default class Loader extends React.Component {

  componentDidMount () {
    const container = React.findDOMNode(this);
    const letters = container.querySelectorAll('.Loader-letter');

    new TimelineMax({ repeat: -1 })
      .staggerTo(letters, 0.3, { y: 10, ease: 'Back.easeIn' }, 0.1)
      .staggerTo(letters, 0.3, { y: 0 }, 0.1, '-=0.6');
  }

  render () {
    return (
      <div className='Loader'>
        <div className='Loader-letter'>L</div>
        <div className='Loader-letter'>O</div>
        <div className='Loader-letter'>A</div>
        <div className='Loader-letter'>D</div>
        <div className='Loader-letter'>I</div>
        <div className='Loader-letter'>N</div>
        <div className='Loader-letter'>G</div>
      </div>
    );
  }

}
