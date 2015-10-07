'use strict';

import React from 'react';

export default class LanguagesPage extends React.Component {

  render () {

    const languages = [
      'javascript',
      'python',
      'ruby',
      'css',
      'html',
      'c++',
      'c'
    ];

    return (
      <div className='LanguagesList'>
        {languages.map((l, i) => (
          <div
            key={i}
            className='LanguageItem'>
            <div className='img'>
              <img
                src={`assets/images/languages/${l}.svg`} />
            </div>
            <span>{l}</span>
          </div>
        ))}
      </div>
    );
  }

}
