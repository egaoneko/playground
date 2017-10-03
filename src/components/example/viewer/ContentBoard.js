import React from "react";
import PropTypes from "prop-types";
import CategoryContent from "./CategoryContent";
import content from "../../../constants/content";

const propTypes = {
  handleSelectContent: PropTypes.func
};

function ContentBoard(props) {
  const categoryContents = Array.from(content.contentMap.entries()).map(
    entry => {
      const category = entry[0];
      const contents = entry[1];
      return <CategoryContent key={category}
                              category={category}
                              contents={contents}
                              handleSelectContent={props.handleSelectContent}/>;
    }
  );

  return (
    <div className="board">
      {categoryContents}
    </div>
  );
}

ContentBoard.propTypes = propTypes;

export default ContentBoard;
