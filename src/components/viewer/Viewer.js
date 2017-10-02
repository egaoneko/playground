import React from "react";
import PropTypes from "prop-types";
import ContentBoard from "./ContentBoard";

const propTypes = {
  selectedContent: PropTypes.object,
  handleSelectContent: PropTypes.func,
};

const defaultProps = {
  selectedContent: null
};

function Viewer(props) {
  const url = props.selectedContent ? props.selectedContent.url : ""
  const contentBoard = <ContentBoard handleSelectContent={props.handleSelectContent}/>
  const contentViewer = <iframe src={url}></iframe>;

  const viewer = props.selectedContent ? contentViewer : contentBoard;
  return (
    <div className="content">
      <div className="viewer">
        {viewer}
      </div>
    </div>
  );
}

Viewer.propTypes = propTypes;
Viewer.defaultProps = defaultProps;

export default Viewer;
