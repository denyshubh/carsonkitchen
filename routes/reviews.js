
const express = require('express');
const { Review, validate, updateReview, removeReview  } = require('../models/review'); 
const router =  express.Router();
const jwt = require('jsonwebtoken');


router.get('/', async (req, res) => {
  const review = await Review.find();
  if(IsAdmin(req)){
      res.json(review);
  }
  else
       res.render('login');
     
});

router.get('/:id', async (req, res) => {
  const review = await Review.findById(req.params.id);
  if(IsAdmin(req))
  {    if (!review) return res.status(404).send('The review with thegiven ID was not found.');
      res.send(review);
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
