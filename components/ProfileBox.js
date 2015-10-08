'use strict';

import React from 'react';
import ReactTransitionGroup from 'react/lib/ReactTransitionGroup';
import { NavLink } from 'fluxible-router';

import { logout } from '../actions/auth';

class ProfileDrop extends React.Component {

  componentDidMount () {
    const first = React.findDOMNode(this).querySelector('.item');
    first.focus();
  }

  componentWillEnter (done) {
    const els = React.findDOMNode(this).querySelectorAll('.item');
    new TimelineMax()
      .staggerFrom(els, 0.15, {
        opacity: 0,
        y: -10
      }, 0.1)
      .addCallback(done);
  }

  componentWillLeave (done) {
    const els = React.findDOMNode(this).querySelectorAll('.item');
    new TimelineMax()
      .staggerTo(els, 0.15, { opacity: 0, y: -10 }, -0.1)
      .addCallback(done);
  }

  logout () {
    this.props.context.executeAction(logout);
  }

  render () {
    return (
      <div className='ProfileBox-drop'>
        <NavLink
          className='item'
          routeName='home'>
          <i className='ion-person' />
          {'Profile'}
        </NavLink>
        <button
          className='item'
          onClick={this.logout.bind(this)}>
          <i className='ion-log-out' />
          {'Logout'}
        </button>
      </div>
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

  toggle () {
    this.setState({
      open: !this.state.open
    });
  }

  render () {

    const { user } = this.props;
    const { open } = this.state;

    const toggleClassName = [
      'Profile-toggle',
      open ? 'open' : ''
    ].join(' ');

    return (
      <div className='ProfileBox'>
        <button
          onClick={this.toggle.bind(this)}
          className={toggleClassName}>
          <div className='ProfileName'>
            {user.name}
          </div>
          <div
            className='ProfilePic'
            style={{
              backgroundImage: `url(${user.avatar}&s=200)`,
              backgroundSize: '100%'
            }} />
        </button>
        <ReactTransitionGroup>
          {open && (
            <ProfileDrop
              context={this.props.context} />
          )}
        </ReactTransitionGroup>
      </div>
    );
  }

}
