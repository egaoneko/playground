import React from 'react';
import Sidebar from '../components/Sidebar';

class Playground extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  render() {
    return(
      <div>
        <Sidebar/>
      </div>
    );
  }
}

export default Playground;