const express = require('express');
const { Reservation, validate, removeReservation } = require('../models/reservation'); 
const router =  express.Router();

router.post('/', async (req,res) => {

    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    let reservation = new Reservation({
        booking_date:req.body.booking_date,
        time:req.body.time,
        duration:req.body.duration,
        no_of_guest:req.body.no_of_guest,
        booked_on : Date.now(),
        customer:req.body.customer
      
    });

    reservation = await reservation.save();
    res.send(reservation);
  
});

router.get('/d', async (req,res)=>{
    

    console.log(req.query);

    const reservation = await Reservation
        .find({booking_date : req.query.date})
        .sort('time');

    res.json(reservation);
});


router.get('/all', async (req,res) => {
    const reservation = await Reservation
                                .find()
                                .sort('booking_date');


    res.render('bookinglist',{reservation});
});


router.all('/delete/:id', async (req, res) => {
    const query = {_id: req.params.id}
    
      removeReservation(query, (err, reservation)=> {
        if(err) {
          return res.status(404).send('The reservation with the given ID was not found.');
        }
        res.redirect('/reservation');
      });
  
  });
  

module.exports = router; 