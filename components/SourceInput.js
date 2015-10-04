'use strict';

import React from 'react';

export default class SourceInput extends React.Component {

  componentDidMount () {

    // focus input at start
    React.findDOMNode(this.refs.input).focus();
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

  render () {
    return (
      <div className='SourceInput'>
        <input
          type='text'
          ref='input'
          placeholder='Type here'
          value={this.props.typedWord}
          onKeyDown={this.handleKeyDown.bind(this)}
          onChange={this.handleChange.bind(this)} />
      </div>
    );
  }

}
