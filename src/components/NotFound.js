import React from 'react';
import { Link } from 'react-router-dom';
import '../../public/styles/style3.css';
import baby from '../../public/images/happy.svg';
import man from '../../public/images/man.svg';
import women from '../../public/images/woman.svg';

class NotFound extends React.Component {

render() {
 return (
   <div className="n_found">
     <img src={baby} className="fun" id="baby" alt="baby"/>
     <img src={man} className="fun" id="man" alt="baby"/>
   <div className="fooo">404 - Not Found
      <p>Вы ошиблись страничкой, но вы всегда можете вернуться <Link to='/' className="linky">домой</Link> и начать все сначала! </p>
   </div>
      <img src={women} className="fun" id="woman" alt="baby"/>
   </div>
  );
 }
}

export default NotFound;
