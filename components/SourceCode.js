import React from 'react';

export default class SourceCode extends React.Component {

  constructor (props) {
    super(props);
  }

  render () {

    const { text } = this.props;
    const {
      typedWord,
      currentWordIndex
    } = this.props;

    let beforeCursor = [];
    let afterCursor = [];
    let onCursor;

    // used to see at which word we are
    let wordIndex = 0;

    text.chunks.forEach(token => {
      if (token.type === 'word') {
        if (wordIndex === currentWordIndex) {
          onCursor = token.val;
          return ++wordIndex;
        }
        ++wordIndex;
      }
      if (onCursor) { afterCursor.push(token.val); }
      else { beforeCursor.push(token.val); }
    });

    afterCursor = afterCursor.join('');
    beforeCursor = beforeCursor.join('');

    return (
      <div className='SourceCode'>
        <pre>
          {beforeCursor}<span style={{background: 'rgba(255, 0, 0, 0.4)'}}>{onCursor}</span>{afterCursor}
        </pre>
      </div>
    );
  }

}
