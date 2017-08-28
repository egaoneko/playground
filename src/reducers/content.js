import * as types from '../actions/ActionTypes';

const initialState = {
    current: null
};

export default function content(state = initialState, action) {
    switch(action.type) {
        case types.SELECT:
            return { current: action.current };
        default:
            return state;
    }
}