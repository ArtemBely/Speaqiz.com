import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import '../../public/styles/style2.css';
import Hi from './Hi';
import girls from '../../public/images/girls.svg';
import boy from '../../public/images/female-user.svg';
import buisness from '../../public/images/businessman.svg';
import { Spring } from 'react-spring/renderprops.cjs';


class Question extends React.Component {


  constructor() {
    super();
    this.state = {
      count: 1
    }

  }

  oppaName = () => {
    this.setState(prevState => ({ count: prevState.count + 1 }))
    console.log(this.state);
  }



  render () {

    return (

       <div className="more">
         <NavLink to="/" className="nav" exact activeClassName="big"><div id="one_1" className="same">1</div></NavLink>
            <NavLink to="/hi" className="nav" exact activeClassName="big"><div id="one_2" className="same">2</div></NavLink>
              <NavLink to="/ho" className="nav" exact activeClassName="big"><div id="one_3" className="same">3</div></NavLink>
               <div id="one_4"></div>

               <Route exact={true} path="/">
               <Spring
                from={{opacity: 0, marginLeft: 250}}
                to={{opacity:1, marginLeft: 120}}>
                {props =>
               <div className="wrap_1" style={props}>
              <div  id="one_5" className="first">Оптимизация процессов обучения языку</div>
             <div  id="one_6" className="first">Проверка уровня знаний в школах</div>
           <div  id="one_7" className="first">Проверка знаний студентов колледжей и университетов</div>
          </div>
        }
        </Spring>
    </Route>

    <Route exact path={["/hi", "/telegram"]}>
          <Hi />
      </Route>

      <Route exact path="/ho">
      <Spring
          from={{opacity: 0, marginLeft: 250}}
          to={{opacity: 1, marginLeft: 120}}>
             {props =>
                   <div className="wrap_3" style={props}>
                      <div id="one_5" className="third">Мотивация к ежедневным занятиям</div>
                    <div id="one_6" className="third">Улучшения навыков общения с иностранными партнерами</div>
                  <div id="one_7" className="third">Проверка уровня знаний на рабочих местах</div>
                </div>
              }
          </Spring>
      </Route>

      <Route exact path='/'>
      <Spring
          from={{opacity: 0, marginTop: -100}}
            to={{opacity: 1, marginTop: 0}}
               config={{ delay: 100, duration: 400 }}>
                {props =>
                    <div id="one_8" style={props}>
                 <img src={girls} id="girl" alt="Girl" onClick={this.oppaName}/>
             </div>
           }
         </Spring>
      </Route>

   <Route exact path={['/hi', '/telegram']}>
     <Spring
       from={{opacity: 0, marginTop: -100}}
         to={{opacity: 1, marginTop: 0}}
           config={{ delay: 100, duration: 400 }}>
              {props =>
                <div id="one_8" style={props}>
              <img src={boy} id="girl" alt="Girl" onClick={this.oppaName}/>
           </div>
         }
      </Spring>
   </Route>

   <Route exact path='/ho'>
       <Spring
          from={{opacity: 0, marginTop: -100}}
            to={{opacity: 1, marginTop: 0}}
              config={{ delay: 100, duration: 400 }}>
                 {props =>
                 <div id="one_8" style={props}>
              <img src={buisness} id="girl" alt="Girl" onClick={this.oppaName}/>
           </div>
         }
      </Spring>
   </Route>

      </div>

    )
  }
}

export default Question;
