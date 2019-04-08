const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const index = require('./routes/index');

// init app
const app = express();

// View Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));
app.use('/',index);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));