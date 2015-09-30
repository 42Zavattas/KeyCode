import React from 'react';

export default class SourceCode extends React.Component {

  constructor (props) {
    super(props);
    this.scrolledY = 0;
    this.scrolledX = 0;
  }

  componentDidMount () {
    let follow = React.findDOMNode(this.refs.follow);
    TweenMax.to(follow, 0.5, { opacity: 1 });
    this.follow();
  }

  componentDidUpdate () {
    this.follow();
  }

  follow () {
    if (this.props.isFinished) { return; }

    // boxes
    let box = React.findDOMNode(this);
    let pre = React.findDOMNode(this.refs.pre);

    // cursor
    let cur = React.findDOMNode(this.refs.cur);
    let letter = React.findDOMNode(this.refs.letter);

    // follower
    let follow = React.findDOMNode(this.refs.follow);

    // get rectangles
    let containerRect = box.getBoundingClientRect();
    let cursorRect = cur.getBoundingClientRect();
    let letterRect = letter.getBoundingClientRect();

    // create timeline
    const t = new TimelineMax();

    // calc cursor offset
    let offsetTop = cursorRect.top - containerRect.top;
    let offsetLeft = letterRect.left - containerRect.left;

    let scroll = {};

    // vertical scroll
    if (offsetTop > containerRect.height / 2) {
      this.scrolledY += offsetTop / 2;
      scroll.y = this.scrolledY;
    }

    // horizontal scroll
    if (offsetLeft > containerRect.width / 2) {
      this.scrolledX += offsetLeft / 2;
      scroll.x = this.scrolledX;
    }
    if (offsetLeft < 0) {
      this.scrolledX = 0;
      scroll.x = this.scrolledX;
    }

    t.set(pre, { scrollTo: scroll });

    // update follow
    t.to(follow, 0.15, {
      scaleX: cursorRect.width + 5,
      x: cursorRect.left - containerRect.left - 2,
      y: cursorRect.top - containerRect.top + 30
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
      <span style={styleByType.cur} key={2} ref='letter'>
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
      <div className='SourceCode'>
        {!this.props.isFinished && (
          <div
            style={followStyle}
            className='follow'
            ref='follow' />
        )}
        <pre ref='pre'>
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
