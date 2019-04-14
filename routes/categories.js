const express = require('express');
const {Category} = require('../models/category');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {Menu} = require('../models/menu');


router.get('/', async (req, res) => {
    const category = await Category.find();
    if (IsAdmin(req)) {
        res.render('category', {category});
    }
    else
        res.render('login');
});

router.get('/all', async (req, res) => {
    const categories = await Category.find();
    let x = [];

    Promise.all(categories.map(function (cat) {
        let b = cat.toObject({ virtuals: true });
        return Menu.find({category: cat._id}, function (err, value) {
            b.menu = value;
            x.push(b);
        });
    })).then(function () {
        res.send(x);
    });
});

/*
router.get('/all', async (req, res) => {
    const categories = await Category.find();
    let x = [];

    Promise.all(categories.map(function (cat) {
        let b = cat.toObject({ virtuals: true });
        console.log(b);
        return Menu.find({category: cat._id}, function (err, value) {
            console.log("b");
            console.log("err:"+err);
            console.log("val:"+value);
            console.log("setting it as menu");
            b.menu = value;
            console.log("b : "+b);
            console.log("Pushing it");
            x.push(b);
        });
    })).then(function () {
        console.log("length of x = "+x.length);
        res.send(x);
    });
});
*/

router.get('/:id', async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (IsAdmin(req)) {
        if (!category) return res.status(404).send('The category with thegiven ID was not found.');
        res.render('edit-category', {category});
    }
});


function IsAdmin(req) {
    const {token} = req.cookies;
    var decoded = jwt.decode(token, {complete: true});
    var admin;
    if (token != undefined)
        admin = decoded.payload.isAdmin;
    return admin;
}

module.exports = router; 
