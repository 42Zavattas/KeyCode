import React from 'react';

export default class SourceInput extends React.Component {

  componentDidMount () {
    // focus input at start
    React.findDOMNode(this.refs.input).focus();
  }

  handleChange (e) {
    let val = e.target.value;
    if (val[val.length - 1] === ' ') {
      this.props.onValidate(val.substring(0, val.length - 1));
    }
    else {
      this.props.onChange(val);
    }
  }

  handleKeyUp (e) {
    if (e.which === 13) {
      this.props.onValidate(e.target.value);
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
          onKeyDown={this.handleKeyUp.bind(this)}
          onChange={this.handleChange.bind(this)} />
      </div>
    );
  }

}
