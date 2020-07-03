import React from 'react';
import '../../public/styles/style5.css';
import '../../public/styles/style6.css';
import self from '../../public/images/Иконка_пользователь.svg';
import letter from '../../public/images/icons8-новое-письмо-100.png';
import password from '../../public/images/icons8-замок-100.png';
import sky from '../../public/images/cloud — копия.svg';

class Enter extends React.Component {

constructor(props) {
  super()

    let messages;
    let messages2;
    let cond;

  if(__isBrowser__) {
    messages = window.__INITIAL_DATA__;
    messages2 = window.__INITIAL_INFO__;
    cond = window.__INITIAL_STATE__;
  }

  this.state = {
    messages,
    messages2,
    cond
  }
  console.log(this.state.messages2);

  this.wrong = React.createRef();

}

er2 = () => {
  if(this.state.messages2 && this.state.messages2.length === 1) {
    return ( <p className="errors2">{this.state.messages2}</p> )
  }

}
er = () => {
  if(this.state.messages && this.state.messages.length === 1) {
    return ( <p className="errors" ref={this.wrong}>{this.state.messages}</p> )
  }

}

  render() {
      return (
        <p className="forma">
          <p className='form_enter'>Log in to your account</p>
          {this.er()}
          {this.er2()}
          <img src={self} id="selfy" style={{
            display: (this.state.messages2 ? 'block' : 'none')
              }}/>
          <form action="registration/signin" method="POST" className="hey1" style={{
            display: (this.state.messages2 ? 'grid' : 'none')
              }}>
             <img src={letter} className="image_signin" id="letter" /><input type="text" name="email" placeholder="email" className='inp' id='inp1' required />
             <img src={password} className="image_signin" id="pass" /><input type="password" name="password" placeholder="password" className='inp' id='inp2' required />
             <button type="submit" className='sub'>SUBMIT</button>
          </form>
          <p className="hrr"></p>
          <p className="c_name"><a href="/" className="linka">SPEAQIZ</a></p>
          <p className="privacy">Privacy data is protected by encryption &nbsp; © 2020</p>
          <p className="think" id="th">think</p><em className="think" id="ink">before</em><img src ={sky} className="sky_2" style={{
            display: (this.state.messages2 ? 'block' : 'none')
              }}/>
        </p>
      )
  }
}

export default Enter;
