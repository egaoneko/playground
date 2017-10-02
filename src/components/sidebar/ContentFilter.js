import React from "react";
import PropTypes from "prop-types";
import {log} from "../../utils";

const propTypes = {
  filterText: PropTypes.string,
  handleFilter: PropTypes.func
};

const defaultProps = {
  filterText: "",
  handleFilter: log.createWarning('handleSelect')
};

function ContentFilter(props) {
  const onChange = (e) => {
    props.handleFilter(e.target.value);
  };

  const clearFilter = (e) => {
    e.preventDefault();
    props.handleFilter("");
  };

  return (
    <div className="filter">
      <input type="text"
             placeholder="Type to filter"
             value={props.filterText}
             onChange={onChange}/>
      <a href="#"
         className="clear-btn"
         onClick={clearFilter}>x</a>
    </div>
  );
}

ContentFilter.propTypes = propTypes;
ContentFilter.defaultProps = defaultProps;

export default ContentFilter;
