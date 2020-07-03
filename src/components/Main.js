import React from 'react';
import seoul from '../../public/images/594.jpg';


class Main extends React.Component {

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
      <img src ={seoul} id="photo1" className="new_im" ref={this.head} alt="Soul" />
    )
  }
}

export default Main;
