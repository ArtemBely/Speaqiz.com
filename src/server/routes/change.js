import express from 'express';
import React from 'react';
import Profile from '../../components/Profile';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import serialize from 'serialize-javascript';
import passport from 'passport';
import User from '../models/registration';
const router = express.Router();

router.get('/', isLoggedIn, async (req, res, next) => {
  const user = req.user;
  const cond = req.isAuthenticated();
  const lay = renderToString(
    <StaticRouter>
       <Profile />
    </StaticRouter>
  )
  res.send(
    `<!DOCTYPE html>
        <html>
            <head>
              <title>Speaqiz - Профиль</title>
                   <link rel="stylesheet" type="text/css" href="main.css">
                     <meta name="viewport" content="width=device-width, initial-scale=1">
                       <script src='bundle.js' defer></script>
                         <script>window.__INITIAL_STATE__ = ${serialize(cond)}</script>
                        <script>window.__INITIAL_INFO__ = ${serialize(user)}</script>
                      </head>
                    <body>
                   <div id="app">
                 ${lay}
              </div>
            </body>
        </html>`
  )

});

router.post('/', async (req, res, next) => {

var name = req.body.name;
var lastname = req.body.lastname;
var email = req.body.email;
var city = req.body.city;
var telephone = req.body.telephone;

if(name.length > 0 || lastname.length > 0|| email.length > 0 || city.length > 0 || telephone.length > 0) {

  if(email.length > 0) {

    req.checkBody('email', "Графа EMAIL должна быть правильного формата").isEmail();

    var check = req.validationErrors();

    if(check) {
      const user = req.user;
      const cond = req.isAuthenticated();
      const markup = renderToString(
        <StaticRouter location={req.url}>
           <Profile />
        </StaticRouter>
      )
      return res.send(
        `<!DOCTYPE html>
            <html>
                <head>
                  <title>Speaqiz - Профиль</title>
                       <link rel="stylesheet" type="text/css" href="main.css">
                         <meta name="viewport" content="width=device-width, initial-scale=1">
                          <script src='bundle.js' defer></script>
                             <script>window.__INITIAL_STATE__ = ${serialize(cond)}</script>
                             <script>window.__INITIAL_INFO__ = ${serialize(user)}</script>
                            <script>window.__INITIAL_CHECK__ = ${serialize(check)}</script>
                          </head>
                        <body>
                       <div id="app">
                     ${markup}
                  </div>
                </body>
            </html>`
      )
    }
  }

}
else {
    const user = req.user;
    const check = [{'msg' : 'Может быть сначала вы хотите что-то изменить?'}]
    const cond = req.isAuthenticated();
    const markup = renderToString(
      <StaticRouter location={req.url}>
         <Profile />
      </StaticRouter>
    )
    return res.send(
      `<!DOCTYPE html>
          <html>
              <head>
                <title>Speaqiz - Профиль</title>
                    <link rel="stylesheet" type="text/css" href="main.css">
                      <meta name="viewport" content="width=device-width, initial-scale=1">
                        <script src='bundle.js' defer></script>
                           <script>window.__INITIAL_STATE__ = ${serialize(cond)}</script>
                           <script>window.__INITIAL_INFO__ = ${serialize(user)}</script>
                          <script>window.__INITIAL_CHECK__ = ${serialize(check)}</script>
                        </head>
                      <body>
                     <div id="app">
                   ${markup}
                </div>
              </body>
          </html>`
    )
}

let user = req.user;

  if(name.length === 0) { user.name = req.user.name } else { user.name = name };
  if(lastname.length === 0) { user.lastname = req.user.lastname } else { user.lastname = lastname };
  if(email.length === 0) { user.email = req.user.email } else { user.email = email };
  if(city.length === 0) { user.city = req.user.city } else { user.city = city };
  if(telephone.length === 0) { user.telephone = req.user.telephone } else { user.telephone = telephone };

user.password = req.user.password,
user.score = req.user.score

  try {
    user = await user.save();
    console.log(user);
    const success = 'Вы успешно изменили профиль!';
    const cond = req.isAuthenticated();
    const mar = renderToString(
      <StaticRouter>
         <Profile />
      </StaticRouter>
    )
    return res.send(
      `<!DOCTYPE html>
          <html>
              <head>
                <title>Speaqiz - Профиль</title>
                    <link rel="stylesheet" type="text/css" href="main.css">
                      <meta name="viewport" content="width=device-width, initial-scale=1">
                        <script src='bundle.js' defer></script>
                           <script>window.__INITIAL_STATE__ = ${serialize(cond)}</script>
                           <script>window.__INITIAL_INFO__ = ${serialize(user)}</script>
                          <script>window.__INITIAL_SUCCESS__ = ${serialize(success)}</script>
                        </head>
                      <body>
                     <div id="app">
                   ${mar}
                </div>
              </body>
          </html>`
    );
  }
  catch(e) { console.log(e); }
});

router.get('/logout', isLoggedIn, function(req, res, next) {
  req.logout();
  res.redirect('/');
});

function isLoggedIn(req, res, next)  {   // <-- возможно зайти только после входа под своим именем
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect ('/');
}

export default router;
