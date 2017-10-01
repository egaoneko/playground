import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router";
import CategoryContent from "./CategoryContent";
import ContentFilter from "./ContentFilter";

const propTypes = {
  contentMap: PropTypes.instanceOf(Map).isRequired,
  filterText: PropTypes.string,
  selectedContent: PropTypes.object,
  handleSelectContent: PropTypes.func,
  handleFilter: PropTypes.func
};

function Sidebar(props) {
  const categoryContents = Array.from(props.contentMap.entries()).map(
    entry => {
      const category = entry[0];
      const contents = entry[1];
      return <CategoryContent key={category}
                              category={category}
                              contents={contents}
                              selectedContent={props.selectedContent}
                              handleSelectContent={props.handleSelectContent}/>;
    }
  );

  return (
    <div className="sidebar">
      <h1><Link to="/">Playground</Link> / examples</h1>
      <ContentFilter filterText={props.filterText}
                     handleFilter={props.handleFilter}/>
      {categoryContents}
    </div>
  );
}

Sidebar.propTypes = propTypes;

export default Sidebar;
