'use strict';

import React from 'react';

export default class Pie extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      radius: props.radius || 4,
      circumference: 2 * (props.radius || 4) * Math.PI
    };
  }

  componentDidMount () {

    const circle = React.findDOMNode(this.refs.circle);

    circle.setAttribute('r', `${this.state.radius}em`);
    circle.setAttribute('stroke-dasharray', `${this.state.circumference}em`);

    const offset = ((this.props.percent / 100) * this.state.circumference);

    TweenMax.set(circle, {
      strokeDashoffset: `${offset}em`
    });
  }

  shouldComponentUpdate (nextProps) {
    return nextProps.percent !== this.props.percent;
  }

  componentDidUpdate () {
    const circle = React.findDOMNode(this.refs.circle);
    const offset = ((this.props.percent / 100) * this.state.circumference);
    TweenMax.to(circle, 0.5, {
      strokeDashoffset: `${offset}em`
    });
  }

  render () {
    return (
      <div className='Pie'>
        <div className='Pie-circle'>
          <div className='Pie-content'>
            {`${this.props.percent}%`}
          </div>
          <svg
            height='10em'
            width='10em'>

            <circle
              className='Pie-value'
              r='4em'
              cx='5em'
              cy='5em'
              fill='transparent'
              strokeDasharray='0em'
              stroke-dashoffset='0em' />

            <circle
              ref='circle'
              className='Pie-bg'
              r='4em'
              cx='5em'
              cy='5em'
              fill='transparent'
              strokeDasharray='0em'
              stroke-dashoffset='0em' />

          </svg>
        </div>
        <div className='Pie-desc'>
          {this.props.children}
        </div>
      </div>
    );
  }

}
