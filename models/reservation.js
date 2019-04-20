const mongoose = require('mongoose');
const Joi = require('joi');
const Reservation =mongoose.model('Reservation', new mongoose.Schema({

    booking_date:{
        type: Date,
        required: true
    },
    time:{
        type: String,
        required:true
    },

    duration:{
        type: Number,
        required: true
    },
    no_of_guest:{
        type: Number,
        required: true
    },
    booked_on :{
        type: Date,
        default: Date.now(),
    },
    customer:{
       type: Object,
       required: true
    },
    confirmedStatus:{
        type:Number,
        default:-1
    }
  }));


function validateReservation(reservation) {
    const schema = {
        booking_date:Joi.date().min(Date.now()).required(),
        time:Joi.string().required(),
        duration:Joi.number().required(),
        no_of_guest:Joi.number().required(),
        booked_on :Joi.date(),
        customer:Joi.required(),
        customerStatus:Joi.number(),
    };
  
    return Joi.validate(reservation, schema);
  };

  module.exports.Reservation = Reservation;
  module.exports.validate = validateReservation;
  