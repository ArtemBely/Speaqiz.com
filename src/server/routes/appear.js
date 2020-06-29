import express from 'express';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import serialize from 'serialize-javascript';
import multer from 'multer';
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

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public_back/uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if( file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetipe === 'image/svg') {
    cb(null, true);
  }
  else  { cb(null, false); }
};

const upload = multer({
 storage: storage,
 limits: {
    fileSize:  1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.post('/', upload.single('cover'), async (req, res, next) => {
  const fileName = req.file !=null ? req.file.filename : null
  let question = new Question ({
    name: req.body.name,
    first: req.body.first,
    second: req.body.second,
    third: req.body.third,
    right: req.body.right,
    coverImageName: fileName
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
