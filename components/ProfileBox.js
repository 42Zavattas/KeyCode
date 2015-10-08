'use strict';

import React from 'react';
import ReactTransitionGroup from 'react/lib/ReactTransitionGroup';
import { NavLink } from 'fluxible-router';

import { logout } from '../actions/auth';

class LogoutButton extends React.Component {

  componentWillEnter (done) {
    const el = React.findDOMNode(this);
    new TimelineMax()
      .from(el, 0.25, { opacity: 0, x: 20, ease: 'Back.easeOut' })
      .addCallback(done);
  }

  componentWillLeave (done) {
    const el = React.findDOMNode(this);
    new TimelineMax()
      .to(el, 0.2, { opacity: 0, x: 20, ease: 'Back.easeIn' })
      .addCallback(done);
  }

  logout () {
    this.props.context.executeAction(logout);
  }

  render () {
    return (
      <button
        onClick={this.logout.bind(this)}
        className='ZavButton high logout'>
        <i className='ion-log-out' />
        {'Logout'}
      </button>
    );
  }

}

export default class ProfileBox extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      open: false
    };
  }

  toggleOn () {
    this.setState({
      open: true
    });
  }

  toggleOff () {
    this.setState({
      open: false
    });
  }

  render () {

    const { user } = this.props;
    const { open } = this.state;

    return (
      <div
        onMouseEnter={this.toggleOn.bind(this)}
        onMouseLeave={this.toggleOff.bind(this)}
        className='ProfileBox'>
        <ReactTransitionGroup>
          {open && (
            <LogoutButton
              context={this.props.context} />
          )}
        </ReactTransitionGroup>
        <NavLink
          routeName='profile'>
          <div
            className='ProfilePic'
            style={{
              backgroundImage: `url(${user.avatar})`,
              backgroundSize: '100%'
            }} />
        </NavLink>
      </div>
    );
  }

}
