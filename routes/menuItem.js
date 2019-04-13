const upload    = require('./upload');
const express = require('express');
const { Menu, validate } = require('../models/menu'); 
const router =  express.Router();


router.post('/', async (req,res) => {

  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);


    let menu = new Menu({
        title:req.body.title,
        menu_desc:req.body.menu_desc,
        offer_percentage:req.body.offer_percentage,
        category:req.body.category,
        extra_ingrediants:req.body.extra_ingrediants,
        price:req.body.price,
        img_url:req.body.img_url
      });
      menu = await menu.save();

      res.send(menu);

});

router.get('/', async (req, res) => {
  const menu = await Menu.find().sort('title');
  res.send(menu);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const menu = await Menu.findByIdAndUpdate(req.params.id,
    { 
      title:req.body.title,
      menu_desc:req.body.menu_desc,
      offer_percentage:req.body.offer_percentage,
      category:req.body.category,
      extra_ingrediants:req.body.extra_ingrediants,
      price:req.body.price,
      img_url:req.body.img_url
    }, { new: true });

  if (!menu) return res.status(404).send('The menu with the given ID was not found.');
  
  res.send(menu);
});

router.delete('/:id', async (req, res) => {
  const menu = await Menu.findByIdAndRemove(req.params.id);

  if (!menu) return res.status(404).send('The menu with the given ID was not found.');

  res.send(menu);
});

router.get('/:id', async (req, res) => {
  const menu = await Menu.findById(req.params.id);

  if (!menu) return res.status(404).send('The menu with the given ID was not found.');

  res.send(menu);
});

module.exports = router; 
