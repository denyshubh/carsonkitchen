
const express = require('express');
const { Menu} = require('../models/menu'); 
const Category = require('../models/category');
const router =  express.Router();
const jwt = require('jsonwebtoken');



router.get('/', async (req, res) => {

  const menu = await Menu.find().populate('category').sort('title');
 
   if(IsAdmin(req)){
      //   res.send(menu);
      res.render('menu', {menu});
  }
  else
       res.render('login');
     
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
