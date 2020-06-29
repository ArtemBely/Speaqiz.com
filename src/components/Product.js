import React from 'react';
import '../../public/styles/style3.css';
import Footer from './Footer';
import axios from 'axios';


class Product extends React.Component {

    constructor() {
      super()

      this.state = {
        questId: [],
      }
      this.va = React.createRef();
      this.rad = React.createRef();
      this.rad2 = React.createRef();
      this.rad3 = React.createRef();
      this.radoo = React.createRef();
    }

      async componentDidMount(props) {

        await axios.get('/appear/' + this.props.match.params.id)
        .then(res => {
          let questId = res.data;
          this.setState({ questId: questId });
          console.log(questId);
        });

    }


    renderId = () => {
      if(this.state.questId.name) {
      return (
        <div className="sepo1">
                 <div  className="separate">
                       <p> {this.state.questId.name} </p>
                              <div><img src={"/public_back/uploads/" + this.state.questId.coverImageName} className="com_im" alt="just a second.."/></div>
                          <div className="answer" ref={this.rad} onClick={this.cla}> {this.state.questId.first} </div>
                       <div className="answer" ref={this.rad2} onClick={this.cla2}> {this.state.questId.second} </div>
                   <div className="answer" ref={this.rad3} onClick={this.cla3}> {this.state.questId.third} </div>
                   <input type="hidden" value= { this.state.questId.right }  ref={this.radoo} />


                   <div className="co" onClick={this.compa}>Compare</div>
                 </div>
           </div>
        )
      }
    }


        render() {
            return (

                    <div className="each_pr">
                          <div className="ea" key={this.state.questId._id}>
                              {this.renderId()}
                               </div>
                           <input type="hidden" value='' id="val" ref={this.va} />
                        <Footer />
                  </div>

            )
       }
    }

export default Product;
