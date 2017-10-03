import React from "react";
import {Link} from "react-router";

function Sidebar() {
  return (
    <div className="sidebar">
      <h1><Link to="/">Playground</Link></h1>
      <ul>
        <h2><Link to="/examples">Examples</Link></h2>
        <h2><Link to="/transpiler">Transpiler</Link></h2>
      </ul>
    </div>
  )
}

export default Sidebar;
