import React from 'react';

export default class SourceCode extends React.Component {

  constructor (props) {
    super(props);
  }

  componentDidMount () {
    let follow = React.findDOMNode(this.refs.follow);
    TweenMax.from(follow, 0.5, { opacity: 0 });
    this.follow();
  }

  componentDidUpdate () {
    this.follow();
  }

  follow () {
    if (this.props.isFinished) { return; }
    let box = React.findDOMNode(this.refs.box);
    let follow = React.findDOMNode(this.refs.follow);
    let cur = React.findDOMNode(this.refs.cur);
    let rectBox = box.getBoundingClientRect();
    let rect = cur.getBoundingClientRect();
    TweenMax.to(follow, 0.15, {
      scaleX: rect.width + 5,
      x: rect.left - rectBox.left - 2,
      y: rect.top - rectBox.top + 30
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
      no: { background: 'rgba(255, 255, 255, 0.1)' },
      cur: { background: 'rgba(255, 255, 255, 0.5)', color: 'black' }
    };

    onCursor = (onCursor || '');
    onCursor = [
      <span style={styleByType.no} key={1}>
        {onCursor.substr(0, typedWord.length)}
      </span>,
      <span style={styleByType.cur} key={2}>
        {onCursor.substr(typedWord.length, 1)}
      </span>,
      <span style={styleByType.no} key={3}>
        {onCursor.substr(typedWord.length + 1)}
      </span>
    ];

    const followStyle = {};
    let isBad = false;

    if (wordToType) {
      isBad = typedWord !== wordToType.substr(0, typedWord.length);

      if (isBad) {
        followStyle.backgroundColor = 'red';
      }
    }

    afterCursor = afterCursor.join('');

    return (
      <div className='SourceCode' ref='box'>
        {!this.props.isFinished && (
          <div
            style={followStyle}
            className='follow'
            ref='follow' />
        )}
        <pre>
          <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{beforeCursor}</span>
          <span ref='cur' style={{ color: isBad ? 'red' : 'white' }}>
            {onCursor}
          </span>
          <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{afterCursor}</span>
        </pre>
      </div>
    );
  }

}
