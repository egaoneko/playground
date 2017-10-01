import * as types from "../constants/ActionTypes";

export function select(content) {
  return {
    type: types.SELECT,
    selectedContent: content
  };
}

export function filter(filterText) {
  return {
    type: types.FILTER,
    filterText: filterText
  };
}
