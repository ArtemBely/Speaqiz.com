import React from 'react';
import '../../public/styles/style3.css';

class Contactslist extends React.Component {
  render () {
    return (
      <div>
         <form method="post" action="/ahead" className="forma" encType="multipart/form-data">
              <input type="text" name="name" className="hello" placeholder="Укажите название вопроса"/>
                  <input type="text" name="first" className="hello" placeholder="1 вариант"/>
                    <input type="text" name="second" className="hello" placeholder="2 вариант"/>
                    <input type="text" name="third" className="hello" placeholder="3 вариант"/>
                   <input type="text" name="right" className="hello" placeholder="Правильный ответ"/>
                <input type="file" name="cover" className="hello" placeholder="Прикрепите картинку"/>
            <button type="submit"> Submit </button>
         </form>
       </div>
    )
  }
}

export default Contactslist;
