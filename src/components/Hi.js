import React from 'react';
import { Spring } from 'react-spring/renderprops.cjs';

class Hi extends React.Component {
render() {
  return (
    <Spring
         from={{opacity: 0, marginLeft: 250}}
           to={{opacity: 1, marginLeft: 120}}>
           {props =>
              <div className="wrap_2" style={props}>
                  <div id="one_5" className="second">Проверка заний в колледже / университете</div>
                <div id="one_6" className="second">Минимальное участие учителя</div>
              <div id="one_7" className="second">Награждение лучших учеников</div>
            </div>
            }
   </Spring>
      )
   }
}

export default Hi;
