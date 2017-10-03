import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import actions from "../../../../actions";
import "codemirror/mode/javascript/javascript";
import CodeMirror from "react-codemirror2";

const propTypes = {
  source: PropTypes.string,
  output: PropTypes.string,
  handleChange: PropTypes.func
};

class Transpiler extends React.Component {
  render() {
    const sourceOptions = {
      mode: 'javascript',
      lineNumbers: true
    };
    const outputOptions = {
      mode: 'javascript',
      lineNumbers: true,
      readOnly: true
    };
    return (
      <div className="transpiler">
        <div className="code">
          <h2>Source</h2>
          <hr/>
          <CodeMirror value={this.props.source} onChange={this.props.handleChange} options={sourceOptions}/>
        </div>
        <div className="code">
          <h2>Output</h2>
          <hr/>
          <CodeMirror value={this.props.output} options={outputOptions}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    source: state.change.source,
    output: state.change.output
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleChange: (editor, metadata, source) => {
      dispatch(actions.transpiler.change(source));
    }
  };
};

Transpiler.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Transpiler);
