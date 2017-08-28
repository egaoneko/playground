import React from "react";
import ReactDOM from "react-dom";
import App from "./contianers/App";

import { createStore } from 'redux';
import reducers from './reducers';
import { Provider } from 'react-redux';

import './sass/style.sass';
import list from "./list.json";

const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
      <App list={list}/>
  </Provider>
  , document.querySelector('#root'));