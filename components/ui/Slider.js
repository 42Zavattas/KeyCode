'use strict';

import React from 'react';

export default class Slider extends React.Component {

  componentWillLeave (done) {
    const el = React.findDOMNode(this);
    new TimelineMax()
      .to(el, 0.15, { opacity: 0 })
      .to(el, 0.25, { height: 0 })
      .addCallback(done);
  }

  componentWillEnter (done) {
    const el = React.findDOMNode(this);
    new TimelineMax()
      .set(el, { opacity: 0 })
      .from(el, 0.25, { height: 0 })
      .to(el, 0.15, { opacity: 1 })
      .addCallback(done);
  }

  render () {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }

}
