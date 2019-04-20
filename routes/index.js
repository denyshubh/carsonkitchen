
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

router.get('/group', (req,res) => {
    res.render('groupDinning');
});
router.get('/about', (req,res) => {
    res.send('Error 404, Psge Not Found ');
});
router.get('/gift', (req,res) => {
    res.send('Error 404, Psge Not Found ');
});
router.get('/location', (req,res) => {
    res.send('Error 404, Psge Not Found ');
});


module.exports = router;
