import React from "react";
import PropTypes from "prop-types";
import Example from "./Example";

const propTypes = {
  routeParams: PropTypes.object
};

class ExampleApp extends React.Component {
  render() {
    return (
      <Example id={this.props.routeParams.id}/>
    );
  }
}

ExampleApp.propTypes = propTypes;

export default ExampleApp;
