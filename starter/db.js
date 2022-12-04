const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function() {
  const db = "mongodb://localhost/carssarsKitchen"
  mongoose.connect(db, {useNewUrlParser: true})
    .then(() => winston.info(`Connected to ${db}...`));
}
