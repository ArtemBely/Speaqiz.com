import React from 'react';
import '../../public/styles/style3.css';
import '../../public/styles/style8.css';
import Footer from './Footer';
import english from '../../public/images/england.svg';
import question from '../../public/images/question-3.svg';
import discussion from '../../public/images/discussion.svg';
import business from '../../public/images/business-and-finance.svg';
import { Spring } from 'react-spring/renderprops.cjs';

class Description extends React.Component {

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

  render() {
    return (
      <div className='gen_wrap'>
        <p className='wrap_about'>

              <Spring
              from={{top: 0, opacity: 0}}
              to={{top: 120, opacity: 1}}
              config={{duration: 500, delay: 100}}
              >
              {props =>
                <p className='wrap_about1' id='dev' style={props}>Приложение разработано для проверки знаний иностранных языков в школах, образовательных учреждениях
                и на рабочих местах, улучшения и качества быстрого поиска ответа
                <img src={english} className='im_desc' id='eng'/> </p>
              }
              </Spring>

              <Spring
              from={{top: 40, opacity: 0}}
              to={{top: 80, opacity: 1}}
              config={{duration: 500, delay: 700}}
              >
              {props =>
                <p className='wrap_about1' id='we' style={props}>
                <img src={discussion} className='im_desc' id='disc'/>
                  Мы находимся на стадии доработки, поэтому рады вашей обратной связи в любом виде по представленным на сайте контактам а также по форме внизу сайта.
                  Платформа внедряется в образовательные учреждения для успешной и легкой работы преподавателей
                   </p>
                }
              </Spring>

              <Spring
              from={{top: 80, opacity: 0}}
              to={{top: 120, opacity: 1}}
              config={{duration: 500, delay: 1000}}
              >
              {props =>
                  <p className='wrap_about1' id='platf' style={props}>Платформа, предназначенная для образовательных учреждений будет иметь иной формат представления заданий и станет доступен по другому url-адресу
                  <img src={question} className='im_desc' id='quest'/> </p>
              }
              </Spring>

              <Spring
              from={{top: 300, opacity: 0}}
              to={{top: 400, opacity: 1}}
              config={{duration: 500, delay: 1300}}
              >
              {props =>
                  <p className='together' style={props}><p>Присоединяйтесь к миру саморазвития вместе с нами!</p>
                  <img src={business} id='rocky' /></p>
                }
              </Spring>

          </p>
        <div className='wrap_f2'><Footer /></div>
      </div>
    )
  }
}

export default Description;
