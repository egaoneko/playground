import * as types from "../constants/ActionTypes";

export function select(content) {
  return {
    type: types.SELECT,
    selected: content
  };
}
