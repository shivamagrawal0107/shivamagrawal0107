'use strict';
// get the packages we need
const express = require('express'), //use to define framework
app = express(), //taking express object for whole project
cors = require('cors'),
Constant = require('./config/constant'),
Routes = require('./routes');

// ====================================
// Route need to allow cross origin
// ====================================
app.use(cors({ origin: '*', credentials: true }));

// use body parser so we can get info from POST and/or URL parameters
app.use(express.urlencoded({ parameterLimit: 100000, limit: '500mb', extended: true }));

//enabling bodyparser to accept json also =======================
app.use(express.json({
  limit: '500mb',
  type: 'application/json',
  extended: true,
  verify: (req, res, buf) => {
    req.rawBody = buf
  }
}));

//set default language ==========================================
app.use(function (req, res, next) {
  const language = req.params.language || req.headers['language'];
  if (language) {
    if (Constant.AVAIL_LANG[req.headers.language]) {
      app.set('lang', language);
    } else {
      app.set('lang', 'en');
    }
  } else {
    // global.lng='en';
    app.set('lang', 'en');
  }
  next();
});

// Route for home page ===========================================
app.get('/', (req, res) => {
  res.send('<center><h2><b>Hi, This is Guides Service.<br><i> How can i help you ;)</i></b></h2></center>');
});

// API routes ====================================================
app.use('/api/v1', Routes);

module.exports = app;