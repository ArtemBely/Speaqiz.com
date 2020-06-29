import React from 'react';
import { Spring } from 'react-spring/renderprops.cjs';
import '../../public/styles/style2.css';
import woman from '../../public/images/question.svg';

class Body extends React.Component {
  render() {
    return (
      <Spring
      from={{opacity: 0}}
      to={{opacity: 1}}
      config={{ duration: 1000, delay: 100 }}>
      {props =>
      <div className="myBody" style={props}>
         <div id="wrap_im"> <img src={woman} id="im_wo" alt="Women"/> </div>
         <div className = "main">
           <div id="one" className="our_1">Какие Ваши знания по данной тематике ?</div>
               <div id="two" className="our_1 supy">Участвуйте в свежих викторинах по вашей любимой тематике</div>
                <div id="three" className="our_1 supy">Отвечайте правильно на все 3 вопроса викторины</div>
              <div id="four" className="our_1 supy">Получайте возможность самим стать создателем, опубликовав свой уникальный вопрос</div>
            <div id="five" className="our_1 supy">Получайте награду в виде коина за каждую пройденную викторину !</div>
         </div>
      </div>
     }
     </Spring>
    )
  }
}

export default Body;
