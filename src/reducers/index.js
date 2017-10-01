import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import {select, filter} from "./content";

const reducers = combineReducers({
  select,
  filter,
  routing: routerReducer
});

export default reducers;
