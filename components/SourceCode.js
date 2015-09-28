import React from 'react';

export default class SourceCode extends React.Component {

  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this.follow();
  }

  componentDidUpdate () {
    this.follow();
  }

  follow () {
    let box = React.findDOMNode(this.refs.box);
    let follow = React.findDOMNode(this.refs.follow);
    let cur = React.findDOMNode(this.refs.cur);
    let rectBox = box.getBoundingClientRect();
    let rect = cur.getBoundingClientRect();
    TweenMax.to(follow, 0.15, {
      scaleX: rect.width + 5,
      x: rect.left - rectBox.left - 2,
      y: rect.top - rectBox.top + 23
    });
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
      else {
        const style = {};
        if (token.bad) {
          style.color = 'red';
        }
        beforeCursor.push(
          <span key={beforeCursor.length} style={style}>{token.val}</span>
        );
      }
    });

    // get the right word to type
    let wordToType = text.words[currentWordIndex];

    let styleByType = {
      bad: { background: 'rgba(255, 0, 0, 0.3)', color: 'white' },
      no: {},
      cur: { background: 'rgba(255, 255, 255, 0.5)', color: 'black' }
    };

    // split the current word by good/bad/no/cur typed
    onCursor = (onCursor || '')
      .split('')
      .reduce((out, c, i) => {
        let lastCell = out[out.length - 1];
        if (i === typedWord.length) {
          out.push({ type: 'cur', val: c });
        }
        else if (i < typedWord.length) {
          if (typedWord[i] === wordToType[i]) {
            if (lastCell && lastCell.type === 'no') { lastCell.val += c; }
            else { out.push({ type: 'no', val: c }); }
          }
          else {
            if (lastCell && lastCell.type === 'bad') { lastCell.val += c; }
            else { out.push({ type: 'bad', val: c }); }
          }
        }
        else {
          if (lastCell && lastCell.type === 'no') { lastCell.val += c; }
          else { out.push({ type: 'no', val: c }); }
        }
        return out;
      }, [])
      .map((chunk, i) => (
        <span
          key={i}
          style={styleByType[chunk.type]}>
          {chunk.val}
        </span>
      ));

    afterCursor = afterCursor.join('');

    return (
      <div className='SourceCode' ref='box'>
        <div className='follow' ref='follow' />
        <pre>
          <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{beforeCursor}</span>
          <span ref='cur' style={{ color: 'white' }}>
            {onCursor}
          </span>
          <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{afterCursor}</span>
        </pre>
      </div>
    );
  }

}
