import React, {Component} from "react";
import {Router, Route, hashHistory} from "react-router";
import {syncHistoryWithStore} from "react-router-redux";
import store from "./lib/store";
import IndexApp from "./contianers/IndexApp";
import ExampleApp from "./contianers/ExampleApp";
import NoMatch from "./components/NoMatch";

const history = syncHistoryWithStore(hashHistory, store);

export default class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <Route path="/" component={IndexApp}/>
        <Route path="/examples" component={ExampleApp}/>
        <Route path="/examples/:id" component={ExampleApp}/>
        <Route path="/:path" component={IndexApp}/>
        <Route path="*" component={NoMatch}/>
      </Router>
    );
  }
}
