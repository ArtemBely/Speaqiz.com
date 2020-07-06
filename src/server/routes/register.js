import mongoose from 'mongoose';
import express from 'express';
import React from 'react';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import passport from 'passport';
import User from '../models/registration';
import NewRegistration from '../../components/NewRegistration';
import Enter from '../../components/Enter';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import serialize from 'serialize-javascript';
const LocalStrategy = require('passport-local').Strategy;

const router = express.Router();


passport.serializeUser(function(user, done) {
  done(null, user.id); 
});
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

router.get('/', notLoggedIn, (req, res, next) => {
  const cond = req.isAuthenticated();
  const cond2 = 'q';
  const reg = renderToString(
    <StaticRouter>
      <NewRegistration />
    </StaticRouter>
  )
  res.send(
    `<!DOCTYPE html>
        <html>
            <head>
              <title>Speaqiz - Регистрация</title>
                <link rel="stylesheet" type="text/css" href="main.css">
                 <meta name="viewport" content="width=device-width, initial-scale=1">
                  <script src='bundle.js' defer></script>
                    <script>window.__INITIAL_INFO__= ${serialize(cond)}</script>
                     <script>window.__INITIAL_COND__= ${serialize(cond2)}</script>
                      </head>
                    <body>
                   <div id="app">
                 ${reg}
              </div>
            </body>
        </html>`
   )
});

router.post('/', (req, res, done) => {
  var name = req.body.name;
  var lastname = req.body.lastname;
  var email = req.body.email;
  var password = req.body.password;
  var confirm = req.body.confirm;

  req.checkBody('name', 'Укажите имя').notEmpty();
  req.checkBody('lastname', 'Укажите фамилию').notEmpty();
  req.checkBody('email', 'Email должен быть правильного формата').isEmail();
  req.checkBody('password', 'Минимальная длина пароля 5 символов').isLength({min:5});
  req.checkBody('confirm', 'Пароль не совпадает').equals(req.body.password);

  var errors = req.validationErrors();

  if(errors) {
    console.log(errors);
    const context = { errors };
    const cond2 = 'q';
    const cond = req.isAuthenticated();
    const mar = renderToString(
      <StaticRouter location={req.url} context={context}>
        <NewRegistration data={errors}/>
      </StaticRouter>
    )

    const html =
    `<!DOCTYPE html>
        <html>
            <head>
              <title>Speaqiz - Регистрация</title>
                <link rel="stylesheet" type="text/css" href="main.css">
                  <meta name="viewport" content="width=device-width, initial-scale=1">
                   <script src='bundle.js' defer></script>
                     <script>window.__INITIAL_DATA__ = ${serialize(errors)}</script>
                      <script>window.__INITIAL_INFO__ = ${serialize(cond)}</script>
                       <script>window.__INITIAL_COND__= ${serialize(cond2)}</script>
                      </head>
                    <body>
                   <div id="app">
                 ${mar}
              </div>
            </body>
        </html>`;

      return res.send(html);
}

          User.findOne({email: email}, function (err, user) {
            if (err) {
              return done(err);
            }
            if (user) {
              const errors = [{ 'msg' : 'Email уже используется' }];
              const cond = req.isAuthenticated();
              const cond2 = 'q';
              const useIn = renderToString(
                <StaticRouter>
                    <NewRegistration />
                </StaticRouter>
              )

                  const template =
                    `<!DOCTYPE html>
                          <html>
                              <head>
                                 <title>Speaqiz - Регистрация</title>
                                    <link rel="stylesheet" type="text/css" href="main.css">
                                      <meta name="viewport" content="width=device-width, initial-scale=1">
                                        <script src='bundle.js' defer></script>
                                         <script>window.__INITIAL_DATA__ = ${serialize(errors)}</script>
                                           <script>window.__INITIAL_INFO__ = ${serialize(cond)}</script>
                                            <script>window.__INITIAL_COND__= ${serialize(cond2)}</script>
                                            </head>
                                          <body>
                                         <div id="app">
                                      ${useIn}
                                </div>
                            </body>
                      </html>
                    `
              res.send(template);
              return done(null, false);
            }

          var newUser = new User({
            name: name,
            lastname: lastname,
            email: email,
            password: password,
            score: req.body.score
          });

          User.createUser(newUser, function(err, user) {
            if(err) throw err;
            console.log(user);
          });

          const cond = true;
          const cond2 = 'q';
          const indicate = 'Вы успешно зарегестрировались и теперь можете войти в личный кабинет!';
          const they = renderToString(
            <StaticRouter>
               <NewRegistration />
            </StaticRouter>
          )
          res.send(
            `<!DOCTYPE html>
                  <html>
                      <head>
                         <title>Speaqiz - Регистрация</title>
                            <link rel="stylesheet" type="text/css" href="main.css">
                             <meta name="viewport" content="width=device-width, initial-scale=1">
                               <script src='bundle.js' defer></script>
                                <script>window.__INITIAL_INFO__ = ${serialize(cond)}</script>
                                  <script>window.__INITIAL_STATE__ = ${serialize(indicate)}</script>
                                   <script>window.__INITIAL_COND__= ${serialize(cond2)}</script>
                                    </head>
                                  <body>
                                 <div id="app">
                              ${they}
                        </div>
                    </body>
              </html>
            `
          )
    });
});


passport.use('local.signin', new LocalStrategy ({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},
 function(req, email, password, done) {

  User.findOne({email: email}, function (err, user) {
    if (err) {
      console.log(err);
      return done(err);
    }

      if (!user) {   // --> вызывает get запрос данной url
       req.flash('errors', 'Не найдено пользователей. Возможно вы еще не зарегистрированы в нашем сервисе?');
       return done(null, false);
     }


    User.comparePassword(password, user.password, function(err, isMatch) {
      if (err) throw err;
      if(isMatch) {
        return done(null, user);
      }
      else {
        req.flash('error', 'Неверный пароль');
        return done(null, false)
      }
    })
  });

}));


router.post('/signin',
    passport.authenticate('local.signin', {
    successRedirect: '/profile',
    failureRedirect: '/enter',
    passReqToCallback: true
 })
);

function notLoggedIn(req, res, next) {
  if(!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

export default router;
