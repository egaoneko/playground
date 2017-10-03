import React from "react";
import PropTypes from "prop-types";
import Sidebar from "../components/index/sidebar/Sidebar";
import Viewer from "../components/index/viewer/Viewer";

const propTypes = {
  path: PropTypes.string
};

class Index extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <Sidebar/>
        <Viewer path={this.props.path}/>
      </div>
    );
  }
}

Index.propTypes = propTypes;

export default Index;
