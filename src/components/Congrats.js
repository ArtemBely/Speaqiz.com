import React from 'react';
import Footer from './Footer';
import gold from '../../public/images/gold.svg';
import cloud from '../../public/images/cloud.svg';
import spaceman from '../../public/images/astronaut-3.svg';
import '../../public/styles/style3.css';
import '../../public/styles/style8.css';

class Congrats extends React.Component {

  constructor() {
    super()

    let cond;
    if(__isBrowser__) {
      cond = window.__INITIAL_STATE__;
    }
    this.state = {
      cond
    }
  }

  conditional = () => {
    if(this.state.cond) {
      return (
        <div className='congr'>
         <p>Теперь на вашем счете +1 ArtCoin!</p>
           <p>Ты можешь добавить свой личный вопрос и его увидят тысячи людей!</p>
          <p>ArtCoin будет на вашем счете только после того, как вы опубликуете свой вопрос!</p>
        </div>
      )
    }
    else {
      return (
        <p className="congr">Ваш ArtCoin будет доступен после прохождения регистрации и нового участия в викторине</p>
      )
    }
  }
  conditional2 = () => {
    if(!this.state.cond) {
      return (
        <div className="time_11">
           <a href='/registration' className='now_time'>Регистрация</a>
           <a href="/appear" id="same"><p>Пройти демо-викторину заново</p></a>
        </div>
      )
    }
  }

  conditional3 = () => {
    if(this.state.cond) {
      return (
         <div className="descr">
           <form method="post" action="/appear" className="descr_form" encType="multipart/form-data">
                <input type="text" name="name" className="hello" placeholder="*Укажите название вопроса" required/>
                    <input type="text" name="first" className="hello" placeholder="*1 вариант" required/>
                        <input type="text" name="second" className="hello" placeholder="*2 вариант" required/>
                        <input type="text" name="third" className="hello" placeholder="*3 вариант" required/>
                      <input type="text" name="right" className="hello" placeholder="*Правильный ответ" required/>
                   <div className='wrap_file'>Прикрепите картинку  <input type="file" name="cover" className="hello file1"  /></div>
               <button type="submit" id='but_quest'> Опубликовать вопрос </button>
            </form>
        </div>
      )
    }
  }

  cong = () => {
    if(!this.state.cond) {
      return(
        <p className="congr">Поздравляю! Ваша победа в викторине! Самое время начать создавать новое</p>
      )
    }
    else null;
  }

  render() {

    return (
      <div className="com_wrap">
         <div className='wrap_coin'>
            {this.cong()}
            {this.conditional()}
            <div className="gold" style={{
                  opacity: (this.state.cond && window.screen.width < 1000 ? 0 : 1),
                  zIndex: (this.state.cond && window.screen.width < 1000 ? -1 : 1)
                  }}>
                    <img src={gold} />
            </div>
         </div>
         {this.conditional2()}
         <div className="wrap_cloud" style={{
                 opacity: (this.state.cond && window.screen.width < 1000 ? 0 : 1),
                 zIndex: (this.state.cond && window.screen.width < 1000 ? -1 : 0)
                 }}>
                   <img src={spaceman} id="spaceman"/>
         </div>
         <div className="wrap_foo">{this.conditional3()}</div>
      </div>
    )
  }
}

export default Congrats;
