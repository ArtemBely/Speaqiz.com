import React from 'react';
import '../../public/styles/style2.css';
import '../../public/styles/style6.css';
import '../../public/styles/style8.css';
import Header from './Header';
import Start from './Start';
import Question from './Question';
import Body from './Body';
import Footer from './Footer';
import self from '../../public/images/Иконка_пользователь.svg';
import done from '../../public/images/tick.svg';
import close from '../../public/images/close.svg';
import { Spring } from 'react-spring/renderprops.cjs';


class Registration extends React.Component {

constructor() {
  super()

      let suc;
      let mistake;
      let cond;
      let cond2;

  if(__isBrowser__) {
      cond = window.__INITIAL_STATE__;
      cond2 = window.__INITIAL_INFO__;
      suc = window.__INITIAL_SUC__;
      mistake = window.__INITIAL_MIS__;
  }

  this.state = {
    cond,
    cond2,
    suc,
    mistake
  }
  console.log(this.state.mistake);
}

teleSuc = () => {
  if(this.state.suc) {
    return (
      <Spring
      from={{opacity: 1, zIndex: 1000}}
      to={{opacity: 0, zIndex: 0}}
      config={{delay: 1500, duration: 2000}}
      >
       {props =>
        <p className='wrap_telegramMsg' style={props}>
            <Spring
            from={{top: 0}}
            to={{top: 350}}
            config={{delay: 1500, duration: 2000}}
            >
          {props =>
             <p className='wrap_grid' style={props}>
                <p className='telegramMsg' ref={this.telegram}>{this.state.suc}</p>
                <p className='wrap_verde'>{this.checkk()}</p>
              </p>
            }
            </Spring>
        </p>
      }
      </Spring>
    );
  }
}

checkk = () => {
  if(this.state.mistake) {
    return (
      <img src={close} id='done2'/>
    )
  }
  else {
    return(
      <img src={done} id='done2'/>
    )
  }
}

check = () => {
  if(this.state.cond === true) {
    return ( <div>
                 <a href="/profile"><img src={self} className="self" /></a>
             </div> )
  }
  else {
    return ( <div className='wrap_sign'><a href="/enter" className="regi">Войти</a></div> )
   }
}

check1 = () => {
  if(this.state.cond === false || this.state.cond2 === false || this.state.suc) {
    return ( <div className='wrap_regi'><a href="/registration" className="regi"><li>Регистрация</li></a></div> )
  }
}

  render() {
    return (
      <p>
          <ul className="register" style={{float:'right'}}>
             {this.check()}
             {this.check1()}
          </ul>

          <Header />
            <Start />
              <Question />
            <Body />
          <Footer />
        {this.teleSuc()}
      </p>
    )
  }
}

export default Registration;
