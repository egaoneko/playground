import React from "react";
import PropTypes from "prop-types";

const propTypes = {
  content: PropTypes.object.isRequired
};

function Content(props) {
  return (
    <li>{JSON.stringify(props.content)}</li>
  );
}

Content.propTypes = propTypes;

export default Content;
