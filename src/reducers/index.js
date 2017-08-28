import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import list from './content';

const reducers = combineReducers({
  list,
  routing: routerReducer
});

export default reducers;