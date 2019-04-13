const express = require('express');
const menuItem = require('../routes/menuItem');
const category = require('../routes/categories');
const users = require('../routes/users');
const auth = require('../routes/auth');
const index = require('../routes/index');
const reservation = require('../routes/reservations');
const error = require('../middleware/error');
const cookieParser = require('cookie-parser');


module.exports = function(app) {
  app.use(cookieParser());
  app.use('/menu', menuItem);
  app.use('/category',category);
  app.use('/api/auth',auth);
  app.use('/api/users',users);
  app.use('/',index);
  app.use('/reservation',reservation);
  app.use(error);
};