import React from 'react';
import '../../public/styles/style2.css';
import { Link } from 'react-router-dom';

class Start extends React.Component {
  render () {
    return (
      <div className="start">
           <Link to="/appear" style={{
             color: "#FAFAFA",
             textDecoration: "none"
           }}>
           <div className="started"> НАЧАТЬ ПРОГРАММУ </div>
           </Link>
      </div>
    )
  }
}

export default Start;
