import React from "react";
import PropTypes from "prop-types";
import content from "../constants/content";
import CategoryContent from "./CategoryContent";

const contentMap = content.contentMap;

const propTypes = {
  selected: PropTypes.object,
  handleSelect: PropTypes.func
};

function Sidebar(props) {
  const categoryContents = Array.from(contentMap.entries()).map(
    entry => {
      const category = entry[0];
      const contents = entry[1];
      return <CategoryContent key={category}
                              category={category}
                              contents={contents}
                              selected={props.selected}
                              handleSelect={props.handleSelect}/>;
    }
  );

  return (
    <div className="sidebar">
      {categoryContents}
    </div>
  );
}

Sidebar.propTypes = propTypes;

export default Sidebar;
