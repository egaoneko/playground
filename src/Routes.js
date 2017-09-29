import React, { Component } from 'react';
import { Router, Route, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import store from './lib/store';
const history = syncHistoryWithStore(hashHistory, store);
import IndexApp from './contianers/IndexApp';
import SampleApp from './contianers/SampleApp';

export default class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <Route path="/" component={IndexApp} />
        <Route path="/sample" component={SampleApp} />
      </Router>
    );
  }
}
