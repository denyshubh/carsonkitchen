
const express = require('express');
const { Category } = require('../models/category'); 
const router =  express.Router();
const jwt = require('jsonwebtoken');
const { Menu } = require('../models/menu'); 


router.get('/', async (req, res) => {
  const category = await Category.find();
  if(IsAdmin(req)){
      res.render('category', {category});
  }
  else
       res.render('login');
     
});

router.get('/all', async (req, res) => {
  const categories = await Category.find();
  let x = [];
  
  for(var i =0; i<categories.length; i++)
  { 
    x.push(await Menu.find({categoryId:categories[i]._id}).populate('category'));
  }
  res.send(x);
});


router.get('/:id', async (req, res) => {
  const category = await Category.findById(req.params.id);
  if(IsAdmin(req))
  {    if (!category) return res.status(404).send('The category with thegiven ID was not found.');
      res.render('edit-category', {category});
  }
});


function IsAdmin(req)
{
  const { token } = req.cookies;
  var decoded = jwt.decode(token, {complete: true});
  var admin;
  if(token!=undefined)
       admin = decoded.payload.isAdmin;
  return admin;
}

module.exports = router; 
