import React from "react";
import PropTypes from "prop-types";
import {log} from "../utils";

const propTypes = {
  content: PropTypes.object.isRequired,
  selected: PropTypes.object,
  handleSelect: PropTypes.func
};

const defaultProps = {
  selected: null,
  handleSelect: log.createWarning('handleSelect')
};

function Content(props) {
  const onSelect = () => {
    props.handleSelect(props.content);
  };

  return (
    <li onClick={onSelect}><a>{props.content.name}</a></li>
  );
}

Content.propTypes = propTypes;
Content.defaultProps = defaultProps;

export default Content;
