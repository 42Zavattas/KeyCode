'use strict';

import React from 'react';

import GithubButton from '../GithubButton';

export default class Home extends React.Component {

  render () {
    return (
      <div>
        Hello. <GithubButton context={this.props.context} />
      </div>
    );
  }

}
