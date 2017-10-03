import * as types from "../constants/ActionTypes";

export function change(source) {
  return {
    type: types.TRANSPILER_CHANGE,
    source: source
  }
}
