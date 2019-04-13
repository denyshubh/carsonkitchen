const winston = require('winston');
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

//parse incoming request
app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));


// View Setup
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.locals.basedir = app.get('views');



// require('./starter/logging')();
require('./starter/routes')(app);
require('./starter/db')();
// require('./startup/config')();

const port = process.env.PORT || 3000;
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

module.exports = server;