import * as types from "../constants/ActionTypes";

let initialChangeState = {
  source: "",
  output: ""
};

const transpilerCode = localStorage.transpilerCode;

if (transpilerCode) {
  initialChangeState = JSON.parse(transpilerCode);
}

export function change(state = initialChangeState, action) {
  switch (action.type) {
    case types.TRANSPILER_CHANGE:
      var transpilerCode = {source: action.source, output: ""};
      try {
        transpilerCode.output = window.Babel.transform(action.source, {presets: ['es2015', 'react']}).code;
      } catch (err) {
        transpilerCode.output = `// Error : ${err.message}`;
      }
      localStorage.transpilerCode = JSON.stringify(transpilerCode);
      return transpilerCode;
    default:
      return state;
  }
}
