import React from 'react';

export default class SourceCode extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      text: this.props.text.split(' ')
    };
  }

  render () {

    const { text } = this.state;
    const { currentWord } = this.props;

    const beforeCursor = text.slice(0, currentWord).join(' ');
    const onCursor = text[currentWord];
    const afterCursor = text.slice(currentWord + 1).join(' ');

    return (
      <div className='SourceCode'>
        <pre>
          {beforeCursor}<span style={{background: 'red'}}>{onCursor}</span> {afterCursor}
        </pre>
      </div>
    );
  }

}
