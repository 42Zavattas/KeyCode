'use strict';

import React from 'react';

import { setFocus } from '../actions/game';

export default class SourceInput extends React.Component {

  componentDidUpdate () {
    const input = React.findDOMNode(this.refs.input);
    if (this.props.isFocused && input !== document.activeElement) {
      input.focus();
    }
  }

  handleChange (e) {
    const val = e.target.value;
    if (val[val.length - 1] === ' ') {
      this.props.onValidate();
    } else {
      this.props.onChange(val);
    }
  }

  handleKeyDown (e) {
    if (e.which === 13) {
      this.props.onValidate();
    }
  }

  handleBlur () {
    this.props.context.executeAction(setFocus, false);
  }

  handleFocus () {
    if (this.props.isFocused) { return; }
    this.props.context.executeAction(setFocus, true);
  }

  render () {
    return (
      <div className='SourceInput'>
        <input
          type='text'
          ref='input'
          placeholder='Type here'
          value={this.props.typedWord}
          onFocus={this.handleFocus.bind(this)}
          onBlur={this.handleBlur.bind(this)}
          onKeyDown={this.handleKeyDown.bind(this)}
          onChange={this.handleChange.bind(this)} />
      </div>
    );
  }

}
