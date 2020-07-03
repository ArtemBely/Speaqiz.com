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

    const cond = req.isAuthenticated();
    const user = req.user;

        const lay = renderToString(
          <StaticRouter>
             <Profile />
          </StaticRouter>
        )
      return await res.send(
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
