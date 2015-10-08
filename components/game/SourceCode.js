'use strict';

import React from 'react';

import { setFocus } from '../../actions/game';

export default class SourceCode extends React.Component {

  constructor (props) {
    super(props);
    this.scrolledY = 0;
    this.scrolledX = 0;
  }

  componentDidUpdate () {
    this.follow();
  }

  follow () {
    if (this.props.isFinished) { return; }

    // boxes
    const box = React.findDOMNode(this);
    const pre = React.findDOMNode(this.refs.pre);

    // cursor
    const cur = React.findDOMNode(this.refs.cur);
    const letter = React.findDOMNode(this.refs.letter);

    if (!letter) { return; }

    // get rectangles
    const containerRect = box.getBoundingClientRect();
    const cursorRect = cur.getBoundingClientRect();
    const letterRect = letter.getBoundingClientRect();

    // create timeline
    const t = new TimelineMax();

    // calc cursor offset
    const offsetTop = cursorRect.top - containerRect.top;
    const offsetLeft = letterRect.left - containerRect.left;

    const scroll = {};

    // vertical scroll
    if (offsetTop > containerRect.height / 2) {
      this.scrolledY += offsetTop / 2 - 20;
      scroll.y = this.scrolledY;
    }

    // horizontal scroll
    if (offsetLeft > containerRect.width / 2) {
      this.scrolledX += offsetLeft / 2 - 20;
      scroll.x = this.scrolledX;
    }
    if (offsetLeft < 0) {
      this.scrolledX = 0;
      scroll.x = this.scrolledX;
    }

    t.to(pre, 0.25, { scrollTo: scroll });

  }

  handleClick () {
    this.props.context.executeAction(setFocus, true);
  }

  render () {

    const {
      text,
      typedWord,
      isFocused,
      currentWordIndex
    } = this.props;

    const colorRed = '#FF5252';
    const wantedWord = text.words[currentWordIndex];
    const beforeCursor = [];
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
      if (onCursor) {
        afterCursor.push(token.val);
      } else {
        const style = {};
        if (token.bad) {
          style.color = colorRed;
        }
        beforeCursor.push(
          <span
            key={beforeCursor.length}
            style={style}>
            {token.val}
          </span>
        );
      }
    });

    const styleByType = {
      bad: { background: 'rgba(255, 255, 255, 0.1)', color: colorRed },
      badHigh: { background: colorRed },
      no: { background: 'rgba(255, 255, 255, 0.1)' },
      cur: { background: 'rgba(255, 255, 255, 0.5)', color: 'black' }
    };

    onCursor = (onCursor || '')
      .split('')
      .map((letter, i) => {
        const typedLetter = typedWord[i];
        if (i === typedWord.length) {
          return (
            <span
              ref='letter'
              key={i}
              style={isFocused ? styleByType.cur : styleByType.no}>
              {letter}
            </span>
          );
        }
        return (
          <span
            key={i}
            style={styleByType[(typedLetter && letter !== typedLetter) ? 'bad' : 'no']}>
            {letter}
          </span>
        );
      });

    if (typedWord.length >= wantedWord.length) {
      onCursor.push(
        <span
          key={typedWord.length}
          style={typedWord === wantedWord ? styleByType.cur : styleByType.badHigh}>
          {' '}
        </span>
      );
      if (afterCursor[0] === ' ') { afterCursor[0] = afterCursor[0].substr(1); }
    }

    afterCursor = afterCursor.join('');

    return (
      <div
        style={{ opacity: isFocused ? 1 : 0.8 }}
        className='SourceCode'
        onClick={this.handleClick.bind(this)}>
        <pre ref='pre'>
          <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{beforeCursor}</span>
          <span ref='cur'>
            {onCursor}
          </span>
          <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{afterCursor}</span>
        </pre>
      </div>
    );
  }

}
