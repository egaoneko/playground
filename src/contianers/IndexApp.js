import React from "react";
import {Link} from "react-router";

class IndexApp extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="wrapper">
        <div className="sidebar">
          <h1><Link to="/">Playground</Link></h1>
          <ul>
            <h2><Link to="/examples">Examples</Link></h2>
          </ul>
        </div>
        <div className="content">
        </div>
      </div>
    );
  }
}

export default IndexApp;
