import React from 'react';
import '../../public/styles/style3.css';
import phone from '../../public/images/icons8-телефон-100.png';
import mail from '../../public/images/icons8-защищенное-письмо-100.png';
import vk from '../../public/images/icons8-вконтакте-144.png';
import google from '../../public/images/icons8-gmail-100.png';
import insta from '../../public/images/icons8-instagram-100.png';
import facebook from '../../public/images/icons8-значки-facebook-в-форме-круга-96.png';

class Footer extends React.Component {

  constructor() {
    super()

    this.foot = React.createRef();
  }

  componentDidMount() {
    if(window.location.pathname === '/' || window.location.pathname === '/hi' || window.location.pathname === '/ho' && window.screen.width < 1000) {
      this.foot.current.style.display = 'grid';
    } else { this.foot.current.style.display = 'none'; }
    if(window.screen.width > 1000) {
      this.foot.current.style.display = 'grid';
    }
  }

  render() {
    return (
      <div className="footer" ref={this.foot}>
        <div className="cat_1">
            <p className="info" id="con">Контакты</p>
              <div className="info_1"><img src={phone} id="ikon_phone" alt="phone"/><span id="tel">+7 (986) 902 9285</span></div>
             <div className="info_1"><img src={mail} id="mail" alt="mail"/><span id="mai">belysevartem9@gmail.com</span></div>
           <div className="info_im">
          <img src={facebook} className="social" id='fb' alt="facebook"/>
          <img src={insta} className="social" alt="insta"/>
          <img src={google} className="social" id="go" alt="google"/>
          <img src={vk} className="social" id='vk' alt="vk"/>
         </div>
        </div>

        <div className="cat_2">
          <div id="send"> Send us</div>
             <form action='/telegram' method="POST" className="contact_us">
               <input type="text" placeholder="Имя" name='name' />
                 <input type="text" placeholder="Email" name='email' id='mail2' />
                 <textarea id="text" placeholder="Сообщение" name='message' />
                <button type="submit" id="but"> send </button>
              </form>
            </div>
          <hr id='hr2' style={{ position: 'relative',
          top: '46px',
          width: '72%',
          height: '0.01px',
          gridColumn: '1 / 3'}}/>
        <div id="right"> © Все права защищены </div>
      </div>
    )
  }
}

export default Footer;
