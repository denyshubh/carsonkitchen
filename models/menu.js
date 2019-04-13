const mongoose = require('mongoose');
const Joi = require('joi');
const Menu =mongoose.model('Menu', new mongoose.Schema({

    title: {
      type: String,
      maxlength: 200,
      required: true
    },
    menu_desc: {
      type: String,
      required:true,
      minlength: 10,
      maxlength: 2000
    },
    offer_percentage: {
      type: Number
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,  
      ref: 'Category'
    },
    categoryId: String,
    extra_ingrediants: {
      type: [ {
          ingrediant_name: String,
          extra_price: Number
      } ] 
    },
    price: {
      type: Number,
      required:true
    },
    img_url: {
        type: String,
    }
  }));


  function validateMenu(menu) {
    const schema = {

      title: Joi.string().max(200).required(),
      menu_desc:Joi.string().max(2000).min(10).required(),
      img_url:Joi.string(),
      categoryId: Joi.string(),
      category:Joi.required(),
      offer_percentage:Joi.number(),
      extra_ingrediants:Joi.array(),
      price:Joi.number().required()
    };
  
    return Joi.validate(menu, schema);
  };
  

module.exports.Menu = Menu;
module.exports.validate = validateMenu;
