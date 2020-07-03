import React from 'react';
import Main from './Main';
import { Route } from 'react-router-dom';
import spaceman from '../../public/images/astronaut-3.svg';
import '../../public/styles/style2.css';

class Header extends React.Component {


render() {
  return (

    <div className="photo">
      <img src={spaceman} id='space' />
      <Route exact path={['/', '/hi', '/ho', '/telegram']} component={Main} /> 
    </div>

  )
 }
}

export default Header;
