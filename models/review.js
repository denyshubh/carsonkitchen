const mongoose = require('mongoose');
const Joi = require('joi');

const Review =  mongoose.model('Review', new mongoose.Schema({

    head: {
      type: String,
      maxlength: 200,
      required: true
    },
    
    message: {
        type: String,
        minlength:10,
        maxlength:2000,
        required: true
    },

    img: {
        type: String
    }

  }));

  
  function validateReview(review) {
    const schema = {
        
      head: Joi.string().max(200).required(),
      message:  Joi.string().max(2000).min(10).required(),
      img:   Joi.string()
    };
  
    return Joi.validate(review, schema);
  }
  
module.exports.Review = Review;
module.exports.validate = validateReview;