import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../public/styles/mobi.css';

class Mobile extends React.Component {


    constructor() {
      super()

      this.headest = React.createRef();
      this.first = React.createRef();
      this.second = React.createRef();
      this.third = React.createRef();
      this.mobmob = React.createRef();
    }

    componentDidMount() {
    if(window.location.pathname === '/enter' || window.location.pathname === '/registration' || window.location.pathname === '/profile' || window.location.pathname === '/change') {
      this.headest.current.style.display = 'none';
    }
  }

  movi = () => {
    this.headest.current.classList.toggle('movi');
    setTimeout(() => {
      this.first.current.classList.toggle('from_up');
      this.second.current.classList.toggle('obso');
      this.third.current.classList.toggle('from_down');
      this.mobmob.current.classList.toggle('change_left');
    },500);
  }

  render() {
    return(
      <p className='mobile' ref={this.headest}>

      <p onClick={this.movi} className='wr_mob' ref={this.mobmob}><p className='claa' ref={this.first}></p>
      <p className='claa' ref={this.second}></p>
      <p className='claa' ref={this.third}></p></p>

        <ul className='ulmenu' onClick={this.movi}>
          <NavLink to='/' className='link_li'><li className='limenu'>Главная</li></NavLink>
          <NavLink to='/appear' className='link_li' activeClassName='actlink_li'><li className='limenu'>О нас</li></NavLink>
          <NavLink to='/contacts' className='link_li' activeClassName='actlink_li'><li className='limenu'>Викторина</li></NavLink>
        </ul>
      </p>
    )
  }
}

export default Mobile;
