import React from 'react';
import seoul from '../../public/images/594.jpg';
import spaceman from '../../public/images/astronaut-3.svg';
import '../../public/styles/style2.css';

class Header extends React.Component {
  constructor () {
    super()
    this.head = React.createRef();
  }


async componentDidMount() {
  window.addEventListener('scroll', () => {
    const head = this.head.current;
    if (head) {
      let s = window.scrollY / 18;
      head.style.marginTop = - s + 'px'
    }
  });


  window.addEventListener('mousemove', () => {
    const head = this.head.current;
    if (head) {
      head.classList.add('load');
    }
  });
}

render() {
  return (

    <div className="photo">
      <img src={spaceman} id='space' />
       <img src ={seoul} id="photo1" className="new_im" ref={this.head} alt="Soul"/>
    </div>

  )
 }
}

export default Header;
