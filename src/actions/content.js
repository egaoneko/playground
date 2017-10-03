import * as types from "../constants/ActionTypes";

export function select(content) {
  return {
    type: types.EXAMPLE_SELECT,
    selectedContent: content
  };
}

export function filter(filterText) {
  return {
    type: types.EXAMPLE_FILTER,
    filterText: filterText
  };
}
