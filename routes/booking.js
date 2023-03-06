const express = require('express');
const router = express.Router();
const bookingQueries = require('../controllers/booking')

router.get('/', async (req, res) => {
    const bookings = await bookingQueries.getAllBookings();
    res.json(bookings)
   
})

router.post('/' , async (req, res) => {
    const body = req.body
    const newBooking = await bookingQueries.createBooking(body);
    res.json(newBooking)
    
})

router.get('/:id' , async (req, res) => {
    const id = req.params.id
    await bookingQueries.getBookingById(id)
    .then((day)=>{
       return res.json(booking) 
    })
    .catch((er) =>{
        return res.json (er)
    })
    
})

router.put('/:id' , async (req, res) => {
    const id = req.params.id
    const body = req.body
    const updateBooking = await bookingQueries.updateBooking(id, body);
    res.json(updateBooking)
   
})

router.delete('/:id' ,async (req, res) => {
    const id = req.params.id
    const deleteBooking = await bookingQueries.deleteBooking(id);
    res.json(deleteBooking)
    
})


module.exports = router;