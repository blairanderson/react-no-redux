import React, { Component } from 'react';
const slowUrl =
  'http://slowwly.robertomurray.co.uk/delay/3000/url/https://jsonplaceholder.typicode.com/posts';

class AsyncExample extends Component {
  constructor(props) {
    super(props);
    this.testAsync = this.testAsync.bind(this);
    this.update = this.update.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.fetchResponse = this.fetchResponse.bind(this);
  }

  update(newState) {
    this.props.update({
      async: Object.assign({}, this.props.data, newState)
    });
  }

  startTimer() {
    const startTime = new Date();
    // this is incredibly useless
    // just wanted to show you can do stuff while waiting for ajax
    this.interval = setInterval(() => {
      this.update({ loading: true, elapsed: new Date() - startTime });
    }, 20);
  }

  fetchResponse(json) {
    clearInterval(this.interval);
    console.log('parsed json', json);
    this.update({ loaded: true, loading: false, posts: json });
  }

  testAsync(e) {
    const state = this.props.data;
    e.preventDefault();

    //return early if we already have the data or currently fetching
    if (state.loaded || state.loading) {
      return false;
    }

    this.update({ loading: true });
    this.startTimer();
    fetch(slowUrl)
      .then(response => response.json())
      .then(this.fetchResponse)
      .catch(ex => console.log('failed', ex));
  }

  render() {
    const state = this.props.data;
    return (
      <div id="async-example" className="AsyncExample">
        <div className="mw8 center cf-ns nl2 nr2 vh-100">
          <div className="fl-ns w-50-ns ph2">
            <Header />
            <button
              className="f5 no-underline black pointer bg-near-white bg-animate db w-100 hover-bg-black hover-white pv1 ph3 ba border-box"
              onClick={this.testAsync}
            >
              Current Status:{' '} {state.loaded ? 'Loaded' : 'Not Loaded'}
            </button>
            <p>An Async Example typically consists of 3 states:</p>
            {RenderAwesomeList(state)}
          </div>
          <div className="fl-ns w-50-ns ph2">
            <h4 className="tc">
              Imaginary Blog Posts: ({state.posts ? state.posts.length : 0})
            </h4>
            {state.posts &&
              state.elapsed &&
              <small className="db tc">loaded in {state.elapsed}ms</small>}

            {!state.posts &&
              <div className="tc">
                Please click that button to load the posts!
              </div>}

            {state.loading && <h1>THANKS FOR LOADING THOSE!</h1>}

            {<RenderPosts posts={state.posts} />}
          </div>
        </div>
      </div>
    );
  }
}

export default AsyncExample;

const RenderPosts = ({ posts }) => {
  return posts
    ? <ol>
        {posts.map(post => {
          return (
            <li className="lh-copy pv3 ba bl-0 bt-0 br-0 b--dotted b--black-30">
              {post.title}
            </li>
          );
        })}
      </ol>
    : <span />;
};

const RenderAwesomeList = ({ loading, loaded, elapsed, posts }) => {
  return (
    <ol>
      <li>
        Data not yet loading{' '}
        {!loading && !loaded && <strong>(you are here)</strong>}
      </li>
      <li>
        Currently fetching{' '}
        {loading &&
          elapsed &&
          <strong>
            (you are here: {' '}
            {elapsed}ms)
          </strong>}
      </li>
      <li>
        Data has been fetched {' '}
        {loaded && posts && <strong>(now you're here!)</strong>}
      </li>
    </ol>
  );
};

const Header = () => {
  return (
    <h4 className="tc">
      <span className="b">An Async Example: </span>
      <span className="fw1">Loading some data...</span>
    </h4>
  );
};
