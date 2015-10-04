'use strict';

import React from 'react';

import GithubButton from '../GithubButton';
import Loader from '../Loader';

export default class Home extends React.Component {

  render () {
    return (
      <div>
        Hello. <GithubButton context={this.props.context} />
        <br />
        <Loader />
      </div>
    );
  }

}
