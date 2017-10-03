import React from "react";
import PropTypes from "prop-types";
import Category from "./Category";
import Content from "./Content";

const propTypes = {
  category: PropTypes.string.isRequired,
  contents: PropTypes.array.isRequired,
  handleSelectContent: PropTypes.func
};

function CategoryContent(props) {
  const contents = props.contents.map(content=><Content key={content.name}
                                                        content={content}
                                                        handleSelectContent={props.handleSelectContent}/>);

  return (
    <div className="card">
      <Category name={props.category}/>
      <ul>{contents}</ul>
    </div>
  );
}

CategoryContent.propTypes = propTypes;

export default CategoryContent;
