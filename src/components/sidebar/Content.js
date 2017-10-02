import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router";
import {log} from "../../utils";

const propTypes = {
  content: PropTypes.object.isRequired,
  selectedContent: PropTypes.object,
  handleSelectContent: PropTypes.func
};

const defaultProps = {
  selected: null,
  handleSelectContent: log.createWarning('handleSelect')
};

function Content(props) {
  const onSelect = () => {
    props.handleSelectContent(props.content);
  };

  return (
    <li className={`link ${props.selectedContent === props.content ? "selected" : ""}`}>
      <Link to={`/examples/${props.content.id}`} onClick={onSelect}>{props.content.name}</Link>
    </li>
  );
}

Content.propTypes = propTypes;
Content.defaultProps = defaultProps;

export default Content;
