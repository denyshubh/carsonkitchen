const mongoose = require('mongoose');
const Joi = require('joi');
const Reservation =mongoose.model('Reservation', new mongoose.Schema({

    table : {
        type: String,
        required: true
    },
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

    purpose:{
        type: String,
        default:'Other'
    },
    booked_on :{
        type: Date,
        default: Date.now(),
    },
    customer_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true,
        unique: true 
    }

  
  }));


function validateReservation(reservation) {
    const schema = {
        table: Joi.string().required(),
        booking_date:Joi.date().min(Date.now()).required(),
        time:Joi.string().required(),
        duration:Joi.number().required(),
        no_of_guest:Joi.number().required(),
        purpose:Joi.string().required(),
        booked_on :Joi.date(),
        customer_id:Joi.required()
    };
  
    return Joi.validate(reservation, schema);
  };

  module.exports.Reservation = Reservation;
  module.exports.validate = validateReservation;
  