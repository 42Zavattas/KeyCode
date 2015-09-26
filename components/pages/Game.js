import React from 'react';

import SourceCode from '../SourceCode';
import SourceInput from '../SourceInput';

export default class Game extends React.Component {

  constructor () {
    super();

    this.state = {
      text: 'if (id === 5) {\n  console.log(\'yallah\');\n}'
    };
  }

  render() {
    return (
      <div className='Game'>
        <SourceCode text={ this.state.text } />
        <SourceInput />
      </div>
    );
  }
}
