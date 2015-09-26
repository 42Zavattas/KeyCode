import React from 'react';

export default class SourceCode extends React.Component {

  static buildText (text) {
    let out = [];
    const mem = {
      word: [],
      ret: [],
      space: []
    };

    for (let i = 0; i < text.length; i++) {
      let c = text[i];
      if (c === ' ') {
        checkAndPush('word', 'ret');
        mem.space.push(c);
      }
      else if (c === '\n') {
        checkAndPush('word', 'space');
        mem.ret.push(c);
      }
      else {
        checkAndPush('ret', 'space');
        mem.word.push(c);
      }
    }

    checkAndPush('word', 'space', 'ret');

    function checkAndPush () {
      var args = Array.prototype.slice.call(arguments);
      args.forEach(term => {
        if (mem[term].length) {
          out.push({ type: term, val: mem[term].join('') });
          mem[term] = [];
        }
      });
    }

    return out;
  }

  constructor (props) {
    super(props);

    this.state = {
      text: SourceCode.buildText(props.text)
    };
  }

  render () {

    const { text } = this.state;
    const { currentWord } = this.props;

    let beforeCursor = [];
    let afterCursor = [];
    let onCursor;

    // used to see at which word we are
    let wordIndex = 0;

    text.forEach(token => {
      if (token.type === 'word') {
        if (wordIndex === currentWord) {
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
