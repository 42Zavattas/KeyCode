'use strict';

import React from 'react';

export default class WpmBar extends React.Component {

  componentDidMount () {
    const { wpm } = this.props;
    const bar = React.findDOMNode(this.refs.bar);
    const scaleX = (wpm > 100) ? 1 : wpm / 100;
    TweenMax.set(bar, { scaleX });
  }

  shouldComponentUpdate (nextProps) {
    return nextProps.wpm !== this.props.wpm;
  }

  componentDidUpdate () {
    const { wpm } = this.props;
    const bar = React.findDOMNode(this.refs.bar);
    const scaleX = (wpm > 100) ? 1 : wpm / 100;
    TweenMax.to(bar, 0.25, { scaleX });
  }

  render () {
    return (
      <div className='WpmBar'>
        <div className='WpmBar-thumb'>
          <div
            className='WpmBar-bar'
            ref='bar' />
        </div>
        <div className='WpmBar-desc'>
          <span className='value'>{this.props.wpm}</span>
          <span className='label'>WPM</span>
        </div>
      </div>
    );
  }

}
