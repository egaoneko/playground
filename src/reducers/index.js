import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import content from "./content";

const reducers = combineReducers({
  content,
  routing: routerReducer
});

export default reducers;
