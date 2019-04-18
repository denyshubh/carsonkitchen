
const express = require('express');
const { Review, validate, updateReview, removeReview  } = require('../models/review'); 
const router =  express.Router();


router.get('/', async (req, res) => {
  const review = await Review.find();
      res.json(review)    
});




router.get('/:id', async (req, res) => {
  const review = await Review.findById(req.params.id);
 
      if (!review) return res.status(404).send('The review with thegiven ID was not found.');
      res.json(review) 
});
module.exports = router; 
