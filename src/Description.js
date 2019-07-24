import React, { Component } from "react";

class Description extends Component {
  render() {
    return (
      <div className="measure-wide center tl bg-near-white b--near-black pa4 br4 lh-copy">
        <h3 className="ma0 pa0">What's going on?</h3>
        <p>
          Go ahead and change some text in the right form. Notice how it updates
          in {this.props.updatedYet ? <strong>4</strong> : 3} different places?
        </p>
        {this.props.updatedYet ? (
          <p>
            Updated state:
            <ul>
              <li>
                from <em>Welcome to React-No-Redux</em>{" "}
              </li>
              <li>
                to <strong>{this.props.header.text}</strong>
              </li>
            </ul>
          </p>
        ) : (
          <p>You Have Not Yet updated the state! go ahead and try!</p>
        )}
        <h4>Whats the secret?</h4>
        <ul>
          <li>
            The state is not localized in the form, because otherwise the
            remaining components wouldn't have it!
          </li>
          <li>Its not redux...</li>
          <li>or any other library for that matter!</li>
        </ul>
        <p>
          Its the basic strategy of moving component state to the highest
          component possible and passing it down as props.
        </p>
      </div>
    );
  }
}

export default Description;
