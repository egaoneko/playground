import React from "react";
import PropTypes from "prop-types";

const propTypes = {
  name: PropTypes.string.isRequired
};

function Category(props) {
  return (
    <h2>{props.name}</h2>
  );
}

Category.propTypes = propTypes;

export default Category;
