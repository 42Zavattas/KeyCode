'use strict';

import React from 'react';

import { GithubButton, Loader } from '../ui';

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
