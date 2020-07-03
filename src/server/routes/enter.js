import express from 'express';
import React from 'react';
import Enter from '../../components/Enter';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import serialize from 'serialize-javascript';
import passport from 'passport';
const router = express.Router();

router.get('/', notLoggedIn, (req, res, next) => {
  var messages = req.flash('error');
  var messages2 = req.flash('errors');

  var cond = req.isAuthenticated();
  const lay = renderToString(
    <StaticRouter>
       <Enter />
    </StaticRouter>
  )
  res.send(
    `<!DOCTYPE html>
        <html>
            <head>
              <title>Вход</title>
                <link rel="stylesheet" type="text/css" href="main.css">
                 <meta name="viewport" content="width=device-width, initial-scale=1">
                  <script src='bundle.js' defer></script>
                    <script>window.__INITIAL_DATA__ = ${serialize(messages)}</script>
                      <script>window.__INITIAL_INFO__ = ${serialize(messages2)}</script>
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

function notLoggedIn(req, res, next) {
  if(!req.isAuthenticated()) {
    return next()
  }
  res.redirect('/');
}


export default router;
