const express = require('express');
const {Category} = require('../models/category');
const router = express.Router();
const {Menu} = require('../models/menu');

const menuItem = async(cat) =>  await Menu.find({category: cat._id})

const temp = async (cat) => { let b = cat.toObject({virtuals: true }); return await menuItem(cat) }

router.get('/all', async (req, res) => {
    const categories = await Category.find();
    const x = [];
    
    await Promise.all(categories.map(async (cat) => {
      const y = await Menu.find({category: cat._id})
      const  b = cat.toObject({ virtuals: true })
      b.menu = y 
      x.push(b)
    }));

    console.log(x)
    res.send(x)

});


module.exports = router; 
