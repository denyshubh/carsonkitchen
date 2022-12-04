const express = require('express');
const category = require('../routes/categories');
const reviews = require('../routes/reviews');
const index = require('../routes/index');
const reservation = require('../routes/reservations');
const error = require('../middleware/error');
const cookieParser = require('cookie-parser');


module.exports = function (app) {
    app.use(cookieParser());
    app.use('/api/category', category);
    app.use('/api/reservation', reservation);
    app.use('/review', reviews);
    app.use('/', index);
    app.use(error);
};
