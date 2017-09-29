import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import Routes from "./Routes";
import store from "./lib/store";
import "./sass/style.scss";

ReactDOM.render(
  <Provider store={store}>
    <Routes/>
  </Provider>
  , document.querySelector('#root'));
