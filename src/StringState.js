import React, { Component } from 'react';

class StringState extends Component {
  render() {
    const stringState = JSON.stringify(this.props, null, 4);
    return (
      <div className="pa4-l">
        <label className="f6 b db mb2 tc">
          this is the <code>AppState</code>. It holds everything!
        </label>
        <textarea
          rows={Math.floor(stringState.split(/\r\n|\r|\n/).length * 1.5)}
          className="db w-100 w-70-ns center border-box ba b--black-20 pa2 br2 mb2"
          disabled={true}
          readOnly={true}
          value={stringState}
        >
          {stringState}
        </textarea>
      </div>
    );
  }
}

export default StringState;
