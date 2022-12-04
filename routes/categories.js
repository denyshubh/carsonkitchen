const express = require('express');
const {Category} = require('../models/category');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {Menu} = require('../models/menu');


const menuItem = async(cat) =>  await Menu.find({category: cat._id})

const temp = async (cat) => { let b = cat.toObject({virtuals: true }); return await menuItem(cat) }


router.get('/all', async (req, res) => {
    const categories = await Category.find();
    const x = [];

    categories.map(function (cat) {
        let b = cat.toObject({ virtuals: true });
        let y = temp(cat)
        b.menu = y
        x.push(b)
        return y;
    })

    console.log(x)
    res.send(x)

});

module.exports = router; 
