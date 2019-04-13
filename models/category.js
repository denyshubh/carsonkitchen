const mongoose = require('mongoose');
const Joi = require('joi');

const Category =  mongoose.model('Category', new mongoose.Schema({

    title: {
      type: String,
      maxlength: 200,
      required: true
    },
    
    desc: {
        type: String,
        minlength:10,
        maxlength:2000,
        required: true
    },

    img: {
        type: String,
       
    }

  }));

  // Get Categories
module.exports.getCategories = function(callback, limit){
  Category.find(callback).limit(limit);
};

// Get Single Category By Id
module.exports.getCategoryById = function(id, callback){
  Category.findById(id, callback);
};
  

  function validateCategory(category) {
    const schema = {
        
      title: Joi.string().max(200).required(),
      desc:  Joi.string().max(2000).min(10).required(),
      img:   Joi.string()
    };
  
    return Joi.validate(category, schema);
  }
  
module.exports.Category = Category;
module.exports.validate = validateCategory;