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

  
  // Update Review
  function updateReview(query, update, options, callback){
    Review.findOneAndUpdate(query, update, options, callback);
  };
  
  // Remove Review
  module.exports.removeReview = function(query, callback){
    Review.remove(query, callback);
  };

  // Get Categories
module.exports.getCategories = function(callback, limit){
  Review.find(callback).limit(limit);
};

// Get Single Review By Id
module.exports.getReviewById = function(id, callback){
  Review.findById(id, callback);
};
  

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
module.exports.updateReview = updateReview;