'use strict';

import React from 'react';

import { Loader } from '../ui';

export default class RandomPage extends React.Component {

  render () {
    return (
      <div className='brand'>
        <Loader />
      </div>
    );
  }

}
