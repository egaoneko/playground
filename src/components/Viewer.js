import React from "react";
import PropTypes from "prop-types";

const propTypes = {
  selectedContent: PropTypes.object
};

const defaultProps = {
  selectedContent: null
};

function Viewer(props) {
  const url = props.selectedContent ? props.selectedContent.url : "";
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
