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

  render () {
    return (
      <div className='SourceInput'>
        <input
          type='text'
          ref='input'
          value={this.props.typedWord}
          onChange={this.handleChange.bind(this)} />
      </div>
    );
  }

}
