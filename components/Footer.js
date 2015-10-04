'use strict';

import React from 'react';

export default class Footer extends React.Component {

  render () {
    return (
      <div className='Footer'>
        {'Built with '}
        <i className='ion-ios-heart' />
        {' by the '}
        <a
          href='https://github.com/42Zavattas'
          target='_blank'>
          {'42Zavattas'}
        </a>
      </div>
    );
  }

}
