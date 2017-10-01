import React from "react";
import PropTypes from "prop-types";

const propTypes = {
  location: PropTypes.object
};

function NoMatch({location}) {
  return (
    <div>
      <h3>No match for <code>{location.pathname}</code></h3>
    </div>
  );
}

NoMatch.propTypes = propTypes;

export default NoMatch;
