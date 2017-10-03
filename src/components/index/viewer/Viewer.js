import React from "react";
import PropTypes from "prop-types";
import Transpiler from "./transpiler/Transpiler";

const propTypes = {
  path: PropTypes.string
};

function Viewer(props) {
  const viewer = (path) => {
    switch (path) {
      case "transpiler":
        return <Transpiler/>;
    }
  };
  return (
    <div className="content">
      <div className="viewer">
        {viewer(props.path)}
      </div>
    </div>
  );
}

Viewer.propTypes = propTypes;

export default Viewer;
