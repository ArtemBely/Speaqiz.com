import React from 'react';
import { NavLink } from 'react-router-dom';
import home from '../../public/images/icons8-главная-50.png';
import menu from '../../public/images/icons8-id-проверен-80.png';
import launch from '../../public/images/spring-swing-rocket.svg';
import question from '../../public/images/icons8-вопросы-ответы-80.png';
import sky from '../../public/images/cloud — копия.svg';
import '../../public/styles/style5.css';
import '../../public/styles/style6.css';
import { Spring } from 'react-spring/renderprops.cjs';

class NewRegistration extends React.Component {

    constructor(props) {
      super(props)

      let errors;
      let success;
      let cond;
      let cond2;
      if(__isBrowser__) {
        errors = window.__INITIAL_DATA__;
        cond = window.__INITIAL_INFO__;
        success = window.__INITIAL_STATE__;
        cond2 = window.__INITIAL_COND__;
      }

     this.state = {
       errors,
       cond,
       cond2,
       success
      }
      console.log(this.state.cond2);

      this.ind = React.createRef();
      this.first = React.createRef();
    }

    componentDidMount() {
      if(this.state.cond) {
        setTimeout(() => {
            window.location.replace('/enter');
        },3000);
      }
    }

    erAp = () => {
      if(this.state.errors) {
      return (
            <p className="mistakes">
                {this.state.errors.map(error => (
                  <p className="mess" ref={this.ind}>{error.msg}</p>
                ))}
            </p>
       )
       console.log(this.state.errors);
      }
    }

    success = () => {
      if(this.state.success) {
        return (
          <Spring
          from={{marginLeft: -100, opacity:0}}
          to={{marginLeft: 0, opacity:1}}
          config={{duration: 500}}
          >
          {props =>
          <p className="suc" style={props}>
            {this.state.success}
          </p>
        }
        </Spring>
        )
      }
    }

    only2 = () => {
      if(!this.state.cond) {
        return (
          <div className='launch_empty'>
            <img src={launch} />
          </div>
        )
      }
    }
    only = () => {
      if(this.state.cond) {
        return (
          <div className='launch'>
            <img src={launch} />
          </div>
        )
      }
    }

  render() {

  return (
    <div className='wrap_reggy'>
     {this.success()}
        {this.erAp()}
         {this.only()}
        {this.only2()}
        <p className="wrap_form">
         <p className='mobile_form' style={{
           opacity: (this.state.errors || this.state.success ? 0 : 1)
         }}>
         Форма регистрации</p>
          <form className="registration" action="/registration" method="POST" style={{
            display: (this.state.cond2 ? 'grid' : 'none')
          }}>
            <input className="field" type="text" name="name" placeholder="Введите ваше имя"/>
                <input className="field" type="text" name="lastname" placeholder="Введите вашу фамилию"/>
                  <input className="field" type="text" name="email" placeholder="Введите ваш email"/>
                  <input className="field" type="text" name="password" placeholder="Введите ваш пароль"/>
                 <input className="field" type="text" name="confirm" placeholder="Подтвердите ваш пароль"/>
                 <input type="hidden" name="score" value={0} />
               <input type="hidden" name="city" value='' />
               <input type="hidden" name="telephone" value='' />
             <button type="submit" className="sub2"> Принять </button>
            <p className="agree">Отаправляя форму Я принимаю политику конфиденциальности</p>
          </form>
        </p>
         <div className="crypto_wrap">
        <p className="privacy2">Privacy data is protected by encryption &nbsp; © 2020</p>
        <p className="think2" id="th2">think</p><em className="think2" id="ink2">before</em><img src ={sky} className="sky_22"/>
         </div>
      </div>

    )

  }
}

export default NewRegistration;
