import React, { Component } from 'react';

class Form extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }
  onChange(event) {
    this.props.update({
      updatedYet: true,
      header: Object.assign({}, this.props.header, { text: event.target.value })
    });
  }
  render() {
    return (
      <div className="pa4-l">
        <label className="f6 b db mb2 tc">
          this is an editable form change the state!
        </label>
        <form className="bg-light-red mw7 center ph1 pv4 br2-ns ba b--black-10">
          <fieldset className="cf bn ma0 pa0">
            <div className="cf">
              <input
                className="db f6 f5-l input-reset tc bn black-80 bg-white pa1 lh-solid w-100 w-60-ns center"
                type="text"
                value={this.props.header.text}
                onChange={this.onChange}
              />
            </div>
            <small className="i db tc">Go ahead and change me!</small>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default Form;
