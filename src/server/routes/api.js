import express from 'express';
import mongoose from 'mongoose';
import axios from 'axios';
import Question from '../models/question';
import User from '../models/registration';
const router = express.Router();


require('dotenv/config');

var conn1 = mongoose.createConnection(
  process.env.CHECK,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  },
  () => { console.log('CHECK DB connected!');}
);

const Model2 = conn1.model('Question', new mongoose.Schema({
  name: { type: String, require: true },
  first: { type: String, require: true },
  second: { type: String, require: true },
  third: { type: String, require: true },
  right: { type: String, require: true },
  coverImageName: { type: String, require: true }
}))

router.get('/smash', async (req, res) => {
  let quest = await Model2.find();
  res.json(quest);
});

router.get('/profile', async (req, res, next) => {
          let user = await User.find();
          let user1 = user.map(user => user.score);  // ==> Массив чисел(баллов)

          var largest = Math.max.apply(Math, user1);  // ==> Наибольшее число в массиве
          let maxi = user1.indexOf(largest);  // ==> Порядковый номер наибольшего числа в массиве
          let first = user[maxi];

    user.splice(maxi, 1); // ==> Исключение наибольшего числа из массива
    user1.splice(maxi, 1); // ==> Исключение наибольшего числа из массива
    var secondMax = Math.max.apply(Math, user1);
    var maxi2 = user1.indexOf(secondMax);
    let second = user[maxi2];

          user.splice(maxi2, 1);
          user1.splice(maxi2, 1);
          var thirdMax = Math.max.apply(Math, user1);
          var maxi3 = user1.indexOf(thirdMax);
          let third = user[maxi3];

    user.splice(maxi3, 1);
    user1.splice(maxi3, 1);
    var fourMax = Math.max.apply(Math, user1);
    var maxi4 = user1.indexOf(fourMax);
    let fourth = user[maxi4];

          user.splice(maxi4, 1);
          user1.splice(maxi4, 1);
          var fithMax = Math.max.apply(Math, user1);
          var maxi5 = user1.indexOf(fithMax);
          var fith = user[maxi5];

    let best = [first, second, third, fourth, fith];

    res.json(best);
});

export default router;
