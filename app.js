const winston = require('winston');
const express = require('express');
const path = require('path');
const app = express();

// View Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// require('./starter/logging')();
require('./starter/routes')(app);
require('./starter/db')();
// require('./startup/config')();

const port = process.env.PORT || 3000;
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

module.exports = server;