import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import {select, filter} from "./content";
import {change} from "./transpiler";

const reducers = combineReducers({
  select,
  filter,
  change,
  routing: routerReducer
});

export default reducers;
