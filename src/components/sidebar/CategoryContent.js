import React from "react";
import PropTypes from "prop-types";
import Category from "./Category";
import Content from "./Content";

const propTypes = {
  category: PropTypes.string.isRequired,
  contents: PropTypes.array.isRequired,
  selectedContent: PropTypes.object,
  handleSelectContent: PropTypes.func
};

function CategoryContent(props) {
  const contents = props.contents.map(content=><Content key={content.name}
                                                        content={content}
                                                        selectedContent={props.selectedContent}
                                                        handleSelectContent={props.handleSelectContent}/>);

  return (
    <ul>
      <Category name={props.category}/>
      <ul>{contents}</ul>
    </ul>
  );
}

CategoryContent.propTypes = propTypes;

export default CategoryContent;