import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import '../../public/styles/style5.css';
import '../../public/styles/style7.css';
import person from '../../public/images/person.svg';
import mail from '../../public/images/icons8-почта-100 — копия.png';
import location from '../../public/images/icons8-местонахождение-пользователя-100.png';
import phone from '../../public/images/icons8-телефон-101.png';
import statistic from '../../public/images/sports-and-competition.svg';
import cup from '../../public/images/gold-cup.svg';
import id from '../../public/images/id-card.svg';
import bronze from '../../public/images/cup.svg';
import silver from '../../public/images/silver.svg';
import gold from '../../public/images/gold.svg';
import award from '../../public/images/gold — копия.svg';
import { Spring } from 'react-spring/renderprops.cjs';
import { getRaiting } from './fetchData';
import Footer from './Footer';


class Profile extends React.Component {

constructor() {
  super()

      let raiting;
      let user;
      let check;
      let success;

  if(__isBrowser__) {
    raiting = window.__INITIAL_DATA__;
    user = window.__INITIAL_INFO__;
    check = window.__INITIAL_CHECK__;
    success = window.__INITIAL_SUCCESS__;
  }

  this.state = {
    user: user,
    check,
    raiting,
    success
  }
  this.uniq = React.createRef();
  this.id = React.createRef();
  this.bronze = React.createRef();
  this.silver = React.createRef();
  this.cup = React.createRef();
  this.exact = React.createRef();
  this.hid = React.createRef();
  this.footer = React.createRef();
}

componentDidMount() {
  if(!this.state.raiting) {
    getRaiting().then(raiting => this.setState({ raiting: raiting }));
    console.log(this.state.raiting);
  }
  if(this.state.user.score >= 20) {
    this.bronze.current.style.opacity = 1;
  }
  else { this.bronze.current.style.opacity = 0.4; }

  if(this.state.user.score >= 40) {
    this.silver.current.style.opacity = 1;
  }
  else { this.silver.current.style.opacity = 0.4; }

  if(this.state.user.score >= 60) {
    this.cup.current.style.opacity = 1;
  }
  else { this.cup.current.style.opacity = 0.4; }

  if(this.state.user.name && this.state.user.lastname && this.state.user.email && this.state.user.city && this.state.user.telephone) {
    this.id.current.style.opacity = 1;
  }
  else { this.id.current.style.opacity = 0.4; }

}



  cond = () => {
  if(this.state.user) {
    let a = this.state.user.name[0];
    return(
      <p>{a}</p>
    )
  }
}

cond2 = () => {
  if(this.state.user) {
    return (
      <div className='com_data'>
          <p className='name_1'>{this.state.user.name}</p>
          <p className='lastname_1'>{this.state.user.lastname}</p>
      </div>
    )
  }
}

check_mail = () => {
  if(this.state.check) {
    return (
      <p className='uniq' ref={this.uniq}>
        {this.state.check[0].msg}
      </p>
    )
  }
}

disapp = () => {
  if(this.uniq.current && this.state.check) {
  this.uniq.current.style.display = 'none';
 }
}

succ = () => {
  if(this.state.success) {
    return (
      <Spring
      from={{marginTop: 0, opacity: 1}}
      to={{marginTop: -50, opacity: 0}}
      config={{duration: 1500, delay: 2000}}
      >
      {props =>
          <p className='suc_2' style={props}>{this.state.success}</p>
      }
      </Spring>
    )
  }
}

data_1 = () => {
  if(this.state.user) {
    return (
      <p className='wrap_full'>
         <p className='my_success'>Мои достижения</p>
           <img src={id} className='dignity' ref={this.id}/>
            <img src={bronze} className='dignity' ref={this.bronze}/>
          <img src={silver} className='dignity' ref={this.silver}/>
        <img src={cup} className='dignity' ref={this.cup}/>
      </p>
    )
  }
}

score = () => {
  if(this.state.user) {
    return (
      <p className='wrap_scores'>
        <p className='scores'><img src={statistic} id='cup' /></p>
        <NavLink to='/appear' className='start2'>Начать</NavLink>
      </p>
    )
  }
}

raiting = () => {
  if(this.state.raiting) {
    return (
      <p className='raiting'>
         {this.state.raiting.map((rait, index ) => (
               <p className='wrap_each' key={index} ref={this.hid}>
                     <p className='sCore'>{rait.score}</p>
                     <p className='naLa' ref={this.exact}
                      style={{
                     color: (rait._id === this.state.user._id ? '#FE2E64' : 'white')
                      }}>
                    {rait.name}&nbsp;{rait.lastname}</p>
              </p>
           ))}
      </p>
    )
  }
}


part2 = () => {
  if(this.state.raiting) {
    return (
      <p className='wrap_part2'>Рейтинг участников</p>
    )
  }
}


  render () {

          return (
            <div>
                <p className="wrap_profile">
                     <p className='wrap_2profile'>
                        <img src={person} className='profile_image'/>
                        {this.cond2()}
                    </p>
                <Route exact path='/change'>
                   <p className='wrap_nav'><NavLink to='/profile' className='additional' onClick={this.disapp}>профиль</NavLink></p>
                      <Spring
                      from={{opacity: 0, marginTop: -360}}
                      to={{opacity:1, marginTop: -320}}
                      config={{duration: 500}}
                      >
                      {props =>
                        <form action='/change' method='POST' className='change_form' style={props}>
                            <p className='change_data' id='name_2'>Изменить имя</p><input type='text' name='name' className='com_change dir_1' />
                              <p className='change_data' id='lastname_2'>Изменить фамилию</p><input type='text' name='lastname' className='com_change dir_2' />
                                <p className='change_data' id='email_2'>Изменить email</p><input type='text' name='email' className='com_change dir_3' />
                                <p className='change_data' id='telephone_2'>Добавить телефон</p>  <input type='text' name='telephone' className='com_change dir_4' />
                              <p className='change_data' id='city_2'>Добавить город</p><input type='text' name='city' className='com_change dir_5' />
                            <button type='submit' id='but_2'>Изменить</button>
                        </form>
                      }
                      </Spring>
                </Route>

                <Route exact path='/profile'>
                     <Spring
                     from={{opacity: 0, marginTop: -310}}
                     to={{opacity: 1, marginTop: -290}}
                     config={{duration: 500}}
                     >
                     {props =>
                       <p style={props} className='general_info'>
                           <p className='wrap_full22'>
                             <p className='wrap_full1'> <img src ={mail} className='info_about' /> {this.state.user.email}</p>
                                 <p className='wrap_full1' id='my_city'> <img src ={location} id='loc' className='info_about' /> {this.state.user.city}</p>
                               <p className='wrap_full1' id='my_phone'> <img src ={phone} className='info_about' id='ph' />  {this.state.user.telephone}</p>
                             <p className='wrap_full1' id='my_coins'> <img src={gold} id='gold1' /> <img src={gold} id='gold2' /> <img src={gold} id='gold3' /> {this.state.user.score} ArtCoins</p>
                             <NavLink to='/change' className='additional'>добавить инфо</NavLink>
                             <a href= '/profile/logout' className='log'>Выйти</a>
                           </p>
                       </p>
                     }
                     </Spring>
                </Route>
                </p>
                {this.succ()}
                {this.check_mail()}
                <p className="ourour">
                    {this.cond()}
                     </p>
                     <p className='main_2'>
                        <p className='profile_zone'>
                          {this.data_1()}
                        </p>
                          {this.score()}
                        <p className='wrap_rait'>
                          {this.part2()}
                          <p className='wrap_score'>Баллы</p>
                            <p className='wrap_part'>Участник</p>
                              <p className='place'>Место</p>
                                <p className='place1'>1</p><img src={award} id='goldy'/>
                                <p className='place2'>2</p>
                              <p className='place3'>3</p>
                            <p className='place4'>4</p>
                          <p className='place5'>5</p>
                          {this.raiting()}
                        </p>
                     </p>
                  <p className='wrap_f' ref={this.footer}><Footer /></p>
              </div>
          )

  }

}

export default Profile;
