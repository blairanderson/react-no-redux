import React, { Component } from "react";
import Form from "./Form";
import StringState from "./StringState";
import Description from "./Description";
import AsyncExample from "./AsyncExample";
import Footer from "./Footer";
import indexjsImage from "./images/Index.png";
import appStateImage from "./images/AppState.png";
const indexjsimageDesc = `
Wrap your top level app in a regular react component called AppState.
This wrapper component will be the new place to hold all state logic.`;

const appStateImageDesc = `AppState passes down the entire state object to the App component.
It also passes a callback to update the AppState object`;

class App extends Component {
  render() {
    const state = this.props.appState;
    return (
      <div>
        {state.hoverText && (
          <div
            className="w-100 pa4 bg-near-black"
            style={{ position: "fixed", bottom: 0 }}
          >
            <h1 className="measure ma0 near-white center tc">
              {state.hoverText}
            </h1>
          </div>
        )}
        <div className="pv1 pv3-ns tc bg-near-black">
          <img src={state.header.logo} className="mw5" alt="logo" />
          <h2 className="near-white">{state.header.text}</h2>
        </div>
        <div className="tc">
          <a
            className="mh3 dib f4 near-black"
            href="https://github.com/blairanderson/react-no-redux/"
          >
            Fork me on GitHub
          </a>
          <a
            className="mh3 dib f4 near-black"
            href="https://medium.com/@blairanderson/you-probably-dont-need-redux-1b404204a07f"
          >
            Read the Blog Post
          </a>
        </div>

        <div className="cf">
          <div className="fl w-50">
            <StringState
              header={state.header}
              update={this.props.setAppState}
              updatedYet={state.updatedYet}
            />
          </div>
          <div className="fl w-50">
            <Form header={state.header} update={this.props.setAppState} />
          </div>
        </div>
        <div className="cf">
          <Description header={state.header} updatedYet={state.updatedYet} />
        </div>
        <h3 className="tc">What does it look like?</h3>
        <div className="cf pb6" style={{ background: "rgb(40,44,52)" }}>
          <div
            onMouseEnter={e => {
              this.props.setAppState({ hoverText: indexjsimageDesc });
            }}
            onMouseLeave={e => {
              this.props.setAppState({ hoverText: false });
            }}
            className="fl w-100 w-50-ns"
          >
            <img
              src={indexjsImage}
              className="db center"
              title={indexjsimageDesc}
              alt={indexjsimageDesc}
            />
          </div>
          <div
            onMouseEnter={e => {
              this.props.setAppState({ hoverText: appStateImageDesc });
            }}
            onMouseLeave={e => {
              this.props.setAppState({ hoverText: false });
            }}
            className="fl w-100 w-50-ns"
          >
            <img
              src={appStateImage}
              className="db center"
              alt={appStateImageDesc}
              title={appStateImageDesc}
            />
          </div>
        </div>
        <AsyncExample update={this.props.setAppState} data={state.async} />
        <Footer />
      </div>
    );
  }
}

export default App;
