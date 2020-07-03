import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import routes from './routes';
import home from '../../public/images/icons8-главная-50.png';
import menu from '../../public/images/icons8-id-проверен-80.png';
import question from '../../public/images/icons8-вопросы-ответы-80.png';
import '../../public/styles/style5.css';
import '../../public/styles/planchet.css';
import '../../public/styles/planchet2.css';
import '../../public/styles/mini.css';
import '../../public/styles/mobile_regi.css';
import '../../public/styles/mobile.css';
import '../../public/styles/appear.css';
import '../../public/styles/victory.css';
import '../../public/styles/def.css';
import '../../public/styles/main2.css';
import '../../public/styles/profile.css';
import Mobile from './Mobile_menu';

class App extends React.Component {

constructor() {
  super()

  this.spec = React.createRef();
  this.head = React.createRef();
  this.ourC = React.createRef();
}

change = () => {
  const spec = this.spec.current;
    spec.classList.add('our');
}

componentDidMount() {
  if(window.location.pathname === '/enter' || window.location.pathname === '/registration') {
    this.head.current.style.display = 'none';
    this.ourC.current.style.backgroundColor = '#3a7bd5';
    this.ourC.current.style.height = '120vh';
  }
}

  render () {

    return (

    <div ref={this.ourC}>

       <div className="header" ref={this.head}>
          <NavLink to="/" className="common" activeClassName="our"> <img src={home} className="home rapido" alt="home"/> </NavLink>
            <NavLink to="/appear" className="common" activeClassName="our"><img src={menu} className="menu rapido" alt="menu"/></NavLink>
             <NavLink to="/contacts" className="common" activeClassName="our"><img src={question} className="question rapido" alt="question"/></NavLink>
             <p></p>
             </div>

              <Switch>
                {routes.map((route,i) => (
                  <Route
                  key={i}
                  path={route.path}
                  exact={route.exact}
                  component={route.component}
                  />
                ))}
              </Switch>

            <Mobile />
    </div>

    )
  }
}

export default App;
