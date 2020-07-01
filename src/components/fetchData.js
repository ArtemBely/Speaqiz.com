import React, { Component } from "react";
import axios from 'axios';


 async function getRandom() {

    return await axios.get('http://127.0.0.1:8888/api/smash')
    .then(res => {
      let question = res.data;
      return question;
    })
    .catch(err => console.log(err))
}

    getRandom()
    .then(question => question)
    .catch(err => console.log(err))


  async function getRaiting() {

    return await axios.get('http://127.0.0.1:8888/api/profile')
    .then(res => {
      let raiting = res.data;
      return raiting;
    })
    .catch(err => console.log(err))
  }

  getRaiting()
  .then(raiting => raiting)
  .catch(err => console.log(err))

export { getRandom, getRaiting };
