import React from 'react';

import Sidebar from '../components/Sidebar';
import Viewer from '../components/Viewer';

class Sample extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="wrapper">
        <Sidebar/>
        <Viewer/>
      </div>
    );
  }
}

export default Sample;
