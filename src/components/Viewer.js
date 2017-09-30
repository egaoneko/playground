import React from "react";
import PropTypes from "prop-types";

const propTypes = {
  selected: PropTypes.object
};

const defaultProps = {
  selected: null
};

function Viewer(props) {
  const url = props.selected ? props.selected.url : "";
  return (
    <div className="content">
      <div className="viewer">
        <iframe src={url}></iframe>
      </div>
    </div>
  );
}

Viewer.propTypes = propTypes;
Viewer.defaultProps = defaultProps;

export default Viewer;
