import React from 'react';

export default class SourceInput extends React.Component {

  componentDidMount () {
    // focus input at start
    React.findDOMNode(this.refs.input).focus();
  }

  render () {
    return (
      <div className='SourceInput'>
        <input type='text' ref='input' />
      </div>
    );
  }

}
