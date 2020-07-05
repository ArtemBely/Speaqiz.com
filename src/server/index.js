import mongoose from 'mongoose';
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import validator from 'express-validator';
import session from 'express-session';
import serialize from 'serialize-javascript';
import { StaticRouter, matchPath } from 'react-router-dom';
import Routes from '../components/routes';
import App from '../components/App';
import cors from 'cors';
import passport from 'passport';
import flash from 'connect-flash';
import User from './models/registration';

import apiRouter from './routes/api';
import proRouter from './routes/profile';
import enRouter from './routes/enter';
import appRouter from './routes/appear';
import regRouter from './routes/register';
import cheRouter from './routes/change';
import telRouter from './routes/telegram';

const CONNECTION_URI = process.env.MONGODB_URI;
const port = process.env.PORT || 5000;
const app = express();

require('dotenv/config');

mongoose.connect(
CONNECTION_URI || process.env.CONNECT,
{ useNewUrlParser : true,
  useUnifiedTopology: true,
  useCreateIndex: true     //<-- при использовании slug
},
() => {
console.log('Connection conpleted!');
});

app.use(function(req, res, next) {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
  res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
  res.setHeader("Expires", "0");
  res.setHeader('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use('/public_back/uploads', express.static('public_back/uploads'));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(validator());
app.use(cookieParser());
app.use(session({
  secret: "mysecret",
  resave: false,
  saveUnitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


app.use('/enter', enRouter);
app.use('/profile', proRouter);
app.use('/change', cheRouter);
app.use('/api', apiRouter);
app.use('/appear', appRouter);
app.use('/registration', regRouter);
app.use('/telegram', telRouter);

app.get('/robots.txt', function(req, res) {
  res.sendFile(path.join(__dirname + '/robots.txt'));
});

app.get('/sitemap.xml', function(req, res) {
  res.sendFile(path.join(__dirname + '/sitemap.xml'));
});

app.get('*', (req, res, next) => {
  const activeRoute = Routes.find((route) => matchPath(req.url, route)) || {}
  const promise = activeRoute.fetchInitialData ?
                  activeRoute.fetchInitialData() :
                  Promise.resolve()

promise
    .then(data => {
    const context = { data };
    const indicate = 'mobile';
    const cond = req.isAuthenticated();
    const markup = renderToString(
      <StaticRouter location={req.url} context={context}>
            <App data={data}/>
      </StaticRouter>
 )

  const html =
  `<!DOCTYPE html>
      <html>
          <head>
            <title>Speaqiz - лучший помощник в изучении языка</title>
              <link rel="stylesheet" type="text/css" href="main.css">
              <link rel="shortcut icon" href="/images/astronaut-3.ico" type="image/x-icon">
               <meta name="viewport" content="width=device-width, initial-scale=1">
               <meta name="keywords" content="Английский speaqiz, speaqiz, викторина, учить язык speaqiz, мотивация, знания, саморазвитие, развитие,
               английский язык, лидер, выучить английский язык быстро, бесплатно, участие в викторине, баллы, повысить навыки английского языка,
               задавать свой вопрос" />
               <meta name="description" content="Участвуй в викторине и учи английский бесплатно" />
                <script src='bundle.js' defer></script>
                  <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
                   <script>window.__INITIAL_STATE__ = ${serialize(cond)}</script>
                   <script>window.__INITIAL_INDICATE__ = ${serialize(indicate)}</script>
                   <title>Практикуй английский в викторине!</title>
                    </head>
                  <body>
                 <div id="app">
               ${markup}
            </div>
          </body>
      </html>`;

    return res.send(html);

  }).catch(next)

})
/*
app.use((error, req, res, next) => {
  res.status(error.status)

    res.json({
    status: error.status,
    message: error.message,
    stack: error.stack
  })
})
*/

app.use((req, res, next) => {  //<-- заменить если появится непредвиденная ошибка
   const err = new Error ('Noooo');
     err.status = 404;
     next (err);
});


app.listen(port, () => { console.log('Server started!'); })
