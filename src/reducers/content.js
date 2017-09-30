import * as types from "../constants/ActionTypes";

const initialState = {
  selected: null
};

export default function content(state = initialState, action) {
  switch (action.type) {
    case types.SELECT:
      return {selected: action.selected};
    default:
      return state;
  }
}
