const express = require('express');
const { Reservation, validate, removeReservation } = require('../models/reservation'); 
const router =  express.Router();

router.post('/', async (req,res) => {

    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    let reservation = new Reservation({ 

        table: req.body.table,
        booking_date:req.body.booking_date,
        time:req.body.time,
        duration:req.body.duration,
        no_of_guest:req.body.no_of_guest,
        purpose:req.body.purpose,
        booked_on :req.body.booked_on ,
        customer_id:req.body.customer_id
      
    });

    reservation = await reservation.save();
    res.send(reservation);
  
});

router.get('/:id', async (req,res) => {

    const reservation = await Reservation
                            .findById(req.params.id);

});

router.get('/', async (req,res) => {
    const reservation = await Reservation
                                .find()
                                .sort('booking_date')
                                .populate('customer_id');


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