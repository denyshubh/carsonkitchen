const upload    = require('./upload');
const express = require('express');
const { Category, validate } = require('../models/category'); 
const router =  express.Router();

router.post('/', async (req,res) => {

  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);


    let category = new Category({ 
        title:req.body.title,
        desc:req.body.desc,
        img:req.body.img
      });

     category = await category.save();

      res.send(category);

});

router.get('/', async (req, res) => {
  const category = await Category.find().sort('title');
  res.send(category);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findByIdAndUpdate(req.params.id,
    { 
      title:req.body.title,
      desc:req.body.desc,
      img:req.body.img
    }, { new: true });

  if (!category) return res.status(404).send('The category with the given ID was not found.');
  
  res.send(category);
});

router.delete('/:id', async (req, res) => {
  const category = await Category.findByIdndRemove(req.params.id);

  if (!category) return res.status(404).send('The category with thegiven ID was not found.');

  res.send(category);
});

router.get('/:id', async (req, res) => {
  const category = await Category.findById(req.params.id);
  Category.find("")
  if (!category) return res.status(404).send('The category with thegiven ID was not found.');

  res.send(category);
});

module.exports = router;



