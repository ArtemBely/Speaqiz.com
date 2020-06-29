import React from 'react';
import { Route, Switch } from 'react-router-dom';
import '../../public/styles/style4.css';
import '../../public/styles/style5.css';
import '../../public/styles/style8.css';
import '../../public/styles/mini.css';
import Self from './Self';
import Footer from './Footer';
import done from '../../public/images/tick.svg';
import goldy from '../../public/images/achievement.svg';
import prize from '../../public/images/prize.svg';
import cup from '../../public/images/gold-cup.svg';
import id from '../../public/images/id-card.svg';
import bronze from '../../public/images/cup.svg';
import silver from '../../public/images/silver.svg';
import raiting from '../../public/images/trend.svg';
import { Spring } from 'react-spring/renderprops.cjs';


class Todoslist extends React.Component {

  constructor() {
    super()

    let cond;
    let success;
    if(__isBrowser__) {
      cond = window.__INITIAL_STATE__;
      success = window.__INITIAL_SUCCESS__;
    }
    this.state = {
      cond,
      success: success
    }
  }

zuc = () => {
  if(this.state.success) {
    return(
      <Spring
      from={{opacity: 1, top: 500}}
      to={{opacity: 0, top: 400}}
      config={{duration: 3000}}
      >
      {props =>
      <p className='zuc' style={props}>{this.state.success}</p>
     }
     </Spring>
    )
  }
}

  exch = () => {
    if(this.state.cond) {
      return (
        <div className='wrap2_appear'>
            <p className='wrap_dig'>
              <img src={id} className='dignity2' id='id2' /><p className='dignity3' id='dig_get2'>Достижение присваивается в случае, если вы указали свои данные после регистрации, пройдя верификацию(мобильный телефон, город проживания)</p>
                <img src={bronze} className='dignity2' id='bronze2'/><p className='dignity3' id='dig_get'>Бронзовый кубок за 20 заданных вами вопросов!</p>
                <img src={silver} className='dignity2' id='silver2' /><p className='dignity3' id='text_silver'>За 40 заданных вопросов, помимо 40 ArtCoin вы получаете серебряный кубок!</p>
              <img src={cup} className='dignity2' id='gold_super' /><p className='dignity3' id='text_gold'>Вы награждаетесь золотым кубком при 60 заданных вопросов!</p>
               <p className='rais2'>Зарабатывыйте рейтинг, следите за своими и другими достижениями и взлетайте вверх в таблице лучших! <img src={raiting} id='rait2' /></p>
            </p>
            {this.zuc()}
            <a href="/smash" className="linko">
              <p className='wrap_starto'>
              <div className="starto"  style={{
                top: (this.state.cond && window.screen.width < 569 ? 0 : 550),
                width: (this.state.cond && window.screen.width < 1000 ? '100%' : '118%'),
                fontSize: (this.state.cond && window.screen.width < 1000 ? 17 : 23),
                left: (this.state.cond && window.screen.width < 1000 ? '-3%' : -4)
              }}>
              Начать викторину! </div>
              </p>
            </a>
        </div>
      )
    }

    else {
      return (
        <div className='wrap_appear'>
        <Switch>
          <Route exact path="/appear">
                <p className='wrap_starto2'><a href="/smash" className="linko">  <div className="starto">  Начать викторину! </div></a></p>
            <div className="wrap_desc">
                <div className="comm try">
                    <span className="special">Попробуй себя в демо-опросе</span> <p>ответив верно на 3 вопроса подряд, вы зарабатывыете 1 ArtCoin</p>
                </div>
                <div className="comm can">
                    <span className="special">Здесь ты можешь опробовать пробную версию викторины</span> <p>чтобы иметь доступ ко всем возможностям викторины необходимо <a href='/registration' className='regi2'>зарегистрироваться</a></p>
                </div>
                <div className="comm desc">
                  <span className="special">Описание демо-викторины:</span>
                       <p><img src={prize} id='prize' className='com_gold' />На каждый вопрос тебе дается 10 секунд</p>
                       <p><img src={prize} id='prize' className='com_gold' />При правильном ответе время обновляется</p>
                       <p><img src={prize} id='prize' className='com_gold' />Необходимо ответить правильно на 3 вопроса подряд </p>
                </div>
                <div className="comm vict">
                    <span className="special">Чем же отлчается полная версия викторины от демо?</span>
                        <img src={done} alt="done" id="done"/><p className="yeah">Отвтетив правильно на 3 вопроса у тебя будет возможность самому придумать интересный вопрос и опубликовать его для всех!</p>
                        <img src={done} alt="done" id="done"/><p className="yeah">У тебя появится свой личный кабинет, где за каждый созданный тобой вопрос тебе будет назначаться 1 ArtCoin</p>
                        <img src={done} alt="done" id="done"/><p className="yeah">Появится возможность откладывать Coin!</p>
                </div>
            </div>
                <div className="wrap_foot"><Footer /></div>
          </Route>

          <Route exact path="/smash" component={Self} />
        </Switch>
        </div>
      )
    }
  }



  render () {
    return (

      <p className='wrap_wrap'>{this.exch()}</p>

    )
  }
}

export default Todoslist;
