
const express = require('express');
const router =  express.Router();
const jwt = require('jsonwebtoken');
const Category = require('../models/category');


router.get('/', (req,res) => {
    res.render('index');
});

router.get('/menu', (req,res) => {
    res.render('menu');
});

router.get('/reservation', (req,res) => {
    res.render('reservation');
});

router.get('/login', (req,res) => {
    res.render('login');
});

router.get('/logout', (req,res) => {
    if(IsAdmin(req)){
        res.clearCookie("token");
    }
    res.render('login');
});

router.get('/add/menu', (req,res) => {
 Category.getCategories((err, categories) => {
    if(IsAdmin(req)){
        res.render('add-menu', {category: categories});
    }
    else
        res.render('login'); 
});
});

router.get('/add/category', (req,res) => {
    
    if(IsAdmin(req)){
        res.render('add-category');
    }
    else
        res.render('login'); 
});

router.get('/add/review', (req,res) => {
    
    if(IsAdmin(req)){
        res.render('add-review');
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
