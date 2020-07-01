import express from 'express';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import serialize from 'serialize-javascript';
import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import passport from 'passport';
import Question from '../models/question';
import User from '../models/registration';
import Todoslist from '../../components/Todoslist';

const router = express.Router();


router.get('/', async (req, res, next) => {
  const cond = req.isAuthenticated();
  const lay = renderToString(
    <StaticRouter>
       <Todoslist />
    </StaticRouter>
  )
  res.send(
    `<!DOCTYPE html>
        <html>
            <head>
              <title>SSR</title>
                   <link rel="stylesheet" type="text/css" href="main.css">
                     <meta name="viewport" content="width=device-width, initial-scale=1">
                       <script src='bundle.js' defer></script>
                         <script>window.__INITIAL_STATE__ = ${serialize(cond)}</script>
                       </head>
                     <body>
                   <div id="app">
                 ${lay}
              </div>
            </body>
        </html>`
  )

});

aws.config.update({
  secretAccessKey: 'xuL0fxQF4XGnu7EWh/Ti89ACExr+5NeDckPXqldy',
  accessKeyId: 'AKIAJE32G65JRVPUGIUA',
  region: 'ap-northeast-2'
});

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
  if( file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetipe === 'image/svg') {
    cb(null, true);
  }
  else  { cb(null, false); }
};

var upload = multer({
  fileFilter: fileFilter,
  limits:{ fileSize: 5000000 },
  storage: multerS3({
    s3: s3,
    bucket: 'speaqiz-images',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: 'META_DATA'});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
});


router.post('/',  upload.single('cover'), async (req, res, next) => {
const fileName = req.file !=null ? req.file.location : null

  let question = new Question ({
    name: req.body.name,
    first: req.body.first,
    second: req.body.second,
    third: req.body.third,
    right: req.body.right,
    coverImageName: req.file.location
  });

  let user = req.user;
    user.name = req.user.name,
    user.lastname = req.user.lastname,
    user.email = req.user.email,
    user.password = req.user.password,
    user.score = req.user.score + 1

  try {
    question = await question.save();
    user = await user.save();
    console.log(user);
    const cond = req.isAuthenticated();
    const success = 'Вы заработали +1 ArtCoin! Он доступен в личном кабинете. Продолжайте в том же духе!';
    const marky = renderToString(
        <StaticRouter>
            <Todoslist />
        </StaticRouter>
      )
    return res.send(
    `<!DOCTYPE html>
        <html>
            <head>
              <title>SSR</title>
                <link rel="stylesheet" type="text/css" href="main.css">
                  <meta name="viewport" content="width=device-width, initial-scale=1">
                    <script src='bundle.js' defer></script>
                      <script>window.__INITIAL_SUCCESS__ = ${serialize(success)}</script>
                        <script>window.__INITIAL_STATE__ = ${serialize(cond)}</script>
                      </head>
                    <body>
                   <div id="app">
                 ${marky}
              </div>
            </body>
        </html>`
     )
  }
  catch (err) {
      console.log(err);
      res.redirect('/');
   }
});

export default router;
