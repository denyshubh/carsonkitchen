const express = require('express');
const menuItem = require('../routes/menuItem');
const category = require('../routes/categories');
const users = require('../routes/users');
const auth = require('../routes/auth');
const bodyParser = require('body-parser');
const error = require('../middleware/error');

module.exports = function(app) {
  app.use(express.json());
  app.use(bodyParser.urlencoded({
    extended: false
  }));

  app.use('/api/menu', menuItem);
  app.use('/api/category',category);
  app.use('/api/auth',auth);
  app.use('/api/users',users);
  app.use(error);
};