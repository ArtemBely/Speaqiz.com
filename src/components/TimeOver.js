import React from 'react';
import Footer from './Footer';
import '../../public/styles/style8.css';
import book from '../../public/images/study.svg';
import rocket from '../../public/images/spring-swing-rocket.svg';

class TimeOver extends React.Component {

  render() {
    return (
      <div className='wrap_time'>
          <div className="wrap_fail">
                  <div className="time_1"> Время истекло или Вы ответили неправильно, но всегда можете попробовать проверить свои знания еще раз!</div>
                  <div className="time_2">
                        <a href="/appear" id="link"><div className="wrap_start">Начать заново</div></a>

                  </div>
          </div>
          <div className="rocket"> <img src={rocket} id="rocket" alt="rocket"/> </div>
          <div className="footer_pos">
                  <Footer />
          </div>

      </div>
    )
  }
}

export default TimeOver;
