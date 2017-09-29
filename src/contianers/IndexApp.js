import React from 'react';
import { Link } from 'react-router';

class IndexApp extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="wrapper">
        <div className="sidebar">
          <Link to="/sample">Sample</Link>
        </div>
        <div className="content">
        </div>
      </div>
    );
  }
}

export default IndexApp;
