import React from 'react';

export default class SourceCode extends React.Component {

  render () {

    const { text } = this.props;

    return (
      <div className='SourceCode'>
        <pre>
          { text }
        </pre>
      </div>
    );
  }

}
