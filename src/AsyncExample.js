import React, { Component } from 'react';
const slowUrl = 'https://jsonplaceholder.typicode.com/posts';
const delayEnd = 3000 + Math.random() * 1000;

class AsyncExample extends Component {
  constructor(props) {
    super(props);
    this.testAsync = this.testAsync.bind(this);
    this.update = this.update.bind(this);
    this.startTimer = this.startTimer.bind(this);
  }

  update(newState) {
    this.props.update({
      async: Object.assign({}, this.props.data, newState)
    });
  }

  testAsync(e) {
    const state = this.props.data;
    e.preventDefault();

    //return early if we already have the data or currently fetching
    if (state.loaded || state.loading) {
      return false;
    }

    // update loading
    this.update({ loading: true });
    // for fun add this timer thing
    this.startTimer();
    // fetch the endpoint
    fetch(slowUrl)
      .then(response => response.json())
      .then(result => {
        // this can be thrown away! just here to make our response slower so you can see its loading
        return new Promise(resolve =>
          setTimeout(() => resolve(result), delayEnd)
        );
      })
      .then(json => {
        // cleanup the timer
        clearInterval(this.interval);
        console.log('parsed json', json);
        this.update({ loaded: true, loading: false, posts: json });
      })
      .catch(err => console.log('failed', err));
  }

  // this is incredibly useless
  // just wanted to show you can do stuff while waiting for ajax
  startTimer() {
    const startTime = new Date();
    this.interval = setInterval(() => {
      const elapsed = new Date() - startTime;
      const progress = elapsed / delayEnd * 100;
      this.update({ elapsed, progress });
    }, 20);
  }

  render() {
    const state = this.props.data;
    return (
      <div id="async-example" className="AsyncExample">
        <small className="db tc mt2">
          <a href="https://github.com/blairanderson/react-no-redux/blob/master/src/AsyncExample.js">
            AsyncExample Code on GitHub
          </a>
        </small>
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
            <RenderAwesomeList {...state} />
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

            {state.loading && <h1>LOADING!</h1>}

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
            <li
              key={post.id}
              className="lh-copy pv3 ba bl-0 bt-0 br-0 b--dotted b--black-30"
            >
              {post.title}
            </li>
          );
        })}
      </ol>
    : <span />;
};

const RenderAwesomeList = ({ loading, loaded, elapsed, posts, progress }) => {
  return (
    <ol>
      <li>
        Data not yet loading{' '}
        {!loading && !loaded && <strong>(you are here)</strong>}
      </li>
      <li>
        <div>
          Currently fetching{' '}
          {loading &&
            elapsed &&
            <div>
              <div className="b fw6">
                (you are here: {Math.floor(elapsed)}ms)
              </div>
              <progress width="100%" value={progress} max="100">
                {progress}
              </progress>
            </div>}
        </div>

      </li>
      <li>
        Data has been fetched {' '}
        {loaded && posts && <strong>(now you are here!)</strong>}
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
