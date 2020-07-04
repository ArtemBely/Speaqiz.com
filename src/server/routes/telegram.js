import React from 'react';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Registration from '../../components/Registration';
import serialize from 'serialize-javascript';

const router = express.Router();
const token = '1219527429:AAGFSZIT1fnmwe7-vUWXWoji1854kpiZh2k';
const chatId = '-466315316';
const http = require('request');

process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'; // <-- главная настройка для корректного чтения бота

router.post('/', async (req, res, next) => {
  let reqBody = req.body;
  let fields = [
    '<b>Name</b>: ' + reqBody.name,
    '<b>Email</b>: ' + reqBody.email,
    '<b>Message</b>: ' + reqBody.message
  ]
    let msg = ''
     fields.forEach(field => {
     msg += field + '\n'
   });

   msg = encodeURI(msg);
    console.log(msg);

 http.post(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&parse_mode=html&text=${msg}`,
    async function (error, response, body) {
      console.log('error:', error);
      console.log('statusCode:', response && response.statusCode);
      console.log('body:', body);
      if(response.statusCode===200 || response.statusCode===303){
        const suc = 'Ваше пожелание успешно отправлено!';
        const indicate = 'mobile';
        const mark = renderToString(
          <StaticRouter>
             <Registration />
          </StaticRouter>
        )
          return await res.send(
            `<!DOCTYPE html>
                <html>
                    <head>
                      <title>Speaqiz - лучший помощник в изучении языка</title>
                        <link rel="stylesheet" type="text/css" href="main.css">
                          <meta name="viewport" content="width=device-width, initial-scale=1">
                           <script src='bundle.js' defer></script>
                             <script>window.__INITIAL_SUC__ = ${serialize(suc)}</script>
                              <script>window.__INITIAL_INDICATE__ = ${serialize(indicate)}</script>
                              </head>
                            <body>
                           <div id="app">
                         ${mark}
                      </div>
                    </body>
              </html>`
            );
        }
        if(response.statusCode!==200 || response.statusCode!==303){
          const suc = 'Произошла ошибка, пожалуйста, попробуйте отправить еще раз';
          const mistake = true;
          const indicate = 'mobile';
          const mark = renderToString(
            <StaticRouter>
               <Registration />
            </StaticRouter>
          )
            return await res.send(
              `<!DOCTYPE html>
                  <html>
                      <head>
                        <title>Speaqiz - лучший помощник в изучении языка</title>
                          <link rel="stylesheet" type="text/css" href="main.css">
                            <meta name="viewport" content="width=device-width, initial-scale=1">
                             <script src='bundle.js' defer></script>
                              <script>window.__INITIAL_SUC__ = ${serialize(suc)}</script>
                               <script>window.__INITIAL_MIS__ = ${serialize(mistake)}</script>
                                <script>window.__INITIAL_INDICATE__ = ${serialize(indicate)}</script>
                                </head>
                              <body>
                             <div id="app">
                           ${mark}
                        </div>
                      </body>
                </html>`
            );
         }

      }
    );
});

export default router;
