import React from "react";
import PropTypes from "prop-types";

const propTypes = {
  content: PropTypes.object.isRequired
};

function Content(props) {
  return (
    <li><a href={props.content.url}>{props.content.name}</a></li>
  );
}

Content.propTypes = propTypes;

export default Content;
