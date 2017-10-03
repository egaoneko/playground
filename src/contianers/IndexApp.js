import React from "react";
import PropTypes from "prop-types";
import Index from "./Index";

const propTypes = {
  routeParams: PropTypes.object
};

class IndexApp extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Index path={this.props.routeParams.path}/>
    );
  }
}

IndexApp.propTypes = propTypes;

export default IndexApp;
