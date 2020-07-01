import React from 'react';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom';
import Product from './Product';
import Footer from './Footer';
import Congrats from './Congrats';
import '../../public/styles/style3.css';
import '../../public/styles/style4.css';
import '../../public/styles/style8.css';
import { getRandom } from './fetchData';


class Self extends React.Component {

constructor(props) {
  super(props)

  let question;

  if (__isBrowser__) {
    question = window.__INITIAL_DATA__;
    console.log(question);
  } else {
    question = this.props.staticContext.data;
  }

  this.state = {
    question,
    randomQuest: '',
    count: 0,
    check: 'q',
    control: ''
  }

  this.radoo = React.createRef();
  this.rad = React.createRef();
  this.rad2 = React.createRef();
  this.rad3 = React.createRef();
  this.va = React.createRef();
  this.st = React.createRef();
  this.salamba = React.createRef();
  this.plus = React.createRef();
  this.compare = React.createRef();
  this.vaCheck = React.createRef();
}

componentDidMount() {
  function getRandom1 (min, max) {
  return (Math.floor(Math.random() * (max - min + 1) ) + min);
}

  if(!this.state.question) {
    getRandom().then(question => this.setState({ question: question }))
    return ( <div>LOADING</div> )
  }

  else {
    this.setState({ randomQuest: this.state.question[getRandom1(0, (this.state.question.length - 1))] });
}


      var i = 10
         const cle = setInterval(()=> {
            i = i - 1;
                if(i === 0) {
                  window.location.replace("/salamba");
                      clearInterval(cle);
                           }

                             if(this.state.count === 3) {
                               clearInterval(cle);
                             }

                              if ( this.state.control === this.state.randomQuest.right ) {
                                i = 10;
                                console.log(this.state.control, this.state.randomQuest.right);
                              }
                              else { console.log(this.state.control, this.state.randomQuest.right); }

                              if(window.location.pathname !== "/smash") {
                                clearInterval(cle);
                             }

                         if(window.location.pathname === "/smash" && this.state.count < 3)
                     return (
                <p>{this.st.current.innerHTML = i}</p>
              )
         },1000);

}

cla = () => {
  if(this.state.count < 3) {
  let rad = this.rad.current;
  let va = this.va.current;
  let rad3 = this.rad3.current;
  rad.nextElementSibling.classList.remove('redd')
  rad.classList.add('redd');
  if (rad3.classList.contains('redd')) {
    rad3.classList.remove('redd');
  }
  this.setState({ check: this.state.randomQuest.first });
  setTimeout (() => {va.value = this.state.check;
                    console.log(this.state.check);
  },50);
}}

cla2 = () => {
  if(this.state.count < 3) {
  let rad2 = this.rad2.current;
  let rad3 = this.rad3.current;
  let va = this.va.current;
  rad2.previousElementSibling.classList.remove('redd')
  rad2.classList.add('redd');
  if (rad3.classList.contains('redd')) {
    rad3.classList.remove('redd');
  }
  this.setState({ check: this.state.randomQuest.second })
  setTimeout (() => {va.value = this.state.check;
                    console.log(this.state.check);
  },50);
}}

cla3 = () => {
  if(this.state.count < 3) {
  let rad = this.rad.current;
  let rad2 = this.rad2.current;
  let rad3 = this.rad3.current;
  let va = this.va.current;
  rad3.classList.add('redd');
  if(rad.classList.contains('redd') || rad2.classList.contains('redd')) {
    rad.classList.remove('redd');
    rad2.classList.remove('redd');
    rad3.classList.add('redd');
  }

  this.setState({ check: this.state.randomQuest.third });
  setTimeout (() => {va.value = this.state.check;
                    console.log(this.state.check);
  },50);
}}

co = () => {
  function getRandom2 (min, max) {
  return (Math.floor(Math.random() * (max - min + 1) ) + min);
}


let va = this.va.current;
this.setState({ control: this.state.check });
setTimeout(() => { this.setState({ control: '' }); }, 1000);

  if(va.value.toLowerCase() === this.state.randomQuest.right.toLowerCase() && this.state.count < 3) {
    alert('Правильно!');
      this.setState(prevState => ({ count: prevState.count + 1 }));
    setTimeout (() => {
    if(this.state.count < 3){
      this.setState({ randomQuest: this.state.question[getRandom2(0, (this.state.question.length - 1))] });
      this.rad.current.classList.remove('redd');
      this.rad2.current.classList.remove('redd');
      this.rad3.current.classList.remove('redd');
    }},500);

  }

  else { window.location.replace('/salamba'); }
}


dudu = () => {
  if (this.state.count < 3) {
    return (
      <Switch>

          <Route exact path="/smash">
            <div className="wrap_self">
                 <div className="que">
                        {this.loading()}
                 </div>
                  <div className="counter"> {this.simp()} </div>
                 <input type="hidden" value="" ref={this.va}/>
                 <input type="hidden" value="" ref={this.vaCheck}/>
                 <div className="countDown"> {this.countDown()} </div>
            </div>

           </Route>

          <Route exact path="/appear/:id" component={Product} />


      </Switch>
    )
  }
  else {
    return( <Congrats /> )
  }
}

loading = () => {
  if(this.state.randomQuest.name) {
    return (
        <div className="quest">
          <p id="name_q"> {this.state.randomQuest.name} </p>
            <img src={'/public_back/uploads/' + this.state.randomQuest.coverImageName} className="im_q" alt="squere"/>
               <div className="answer" ref={this.rad} onClick={this.cla}> {this.state.randomQuest.first} </div>
             <div className="answer" ref={this.rad2} onClick={this.cla2}> {this.state.randomQuest.second} </div>
             <div className="answer" ref={this.rad3} onClick={this.cla3}> {this.state.randomQuest.third} </div>
             <input type="hidden" ref={this.radoo} value={this.state.randomQuest.right} />
             <div  ref={this.compare} onClick={this.co} id="ans">ОТВЕТИТЬ</div>
       </div>
    )
  }
}

simp = () => {
  if(this.state.randomQuest.second) {
    return (
      <div ref={this.st} className="time"> </div>
    )
  }
}

countDown = () => {
  if(this.state.randomQuest.third) {
    return (
      <div ref={this.plus} className="countDown1">{this.state.count} / 3</div>
    )
  }
}


render() {

        return (
                <div className='wrapSelf_wrapper'>
                  {this.dudu()}
                </div>
        )
    }
}

export default Self;
