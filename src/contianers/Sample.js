import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Sidebar from "../components/Sidebar";
import Viewer from "../components/Viewer";
import * as actions from "../actions";

const propTypes = {
  selected: PropTypes.object,
  handleSelect: PropTypes.func
};

class Sample extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="wrapper">
        <Sidebar selected={this.props.selected}
                 handleSelect={this.props.handleSelect}/>
        <Viewer selected={this.props.selected}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selected: state.content.selected
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSelect: (content) => {
      dispatch(actions.select(content));
    }
  };
};

Sample.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Sample);
