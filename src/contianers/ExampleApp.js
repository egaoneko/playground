import React from "react";
import Example from "./Example";
import PropTypes from "prop-types";

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
