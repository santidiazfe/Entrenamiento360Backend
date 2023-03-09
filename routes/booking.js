const express = require('express');
const router = express.Router();
const bookingQueries = require('../controllers/booking')

router.get('/', async (req, res) => {
  try {
    const bookings = await bookingQueries.getAllBookings();
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener las reservas.' });
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const booking = await bookingQueries.getBookingById(id);
    if (!booking) {
      return res.status(404).json({ error: 'Reserva no encontrada.' });
    }
    res.json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener la reserva.' });
  }
});

router.get('/day/:dia', async (req, res) => {
  const day = req.params.dia;
  try {
    const bookings = await bookingQueries.getBookingByDay(day);
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener las reservas por día.' });
  }
});

router.get('/hora/:hora', async (req, res) => {
  const hora = req.params.hora;
  try {
    const bookings = await bookingQueries.getBookingByHour(hora);
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener las reservas por hora.' });
  }
});


router.get('/usuario/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const bookings = await bookingQueries.getBookingByUser(id);
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener las reservas del usuario.' });
  }
});

router.get('/hour/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const bookings = await bookingQueries.getBookingByHour(id);
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener las reservas por hora.' });
  }
});


router.post('/', async (req, res) => {
    const body = req.body;
    try {
      const newBooking = await bookingQueries.createBooking(body);
      res.json(newBooking);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al crear la reserva.' });
    }
  });

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  try {
    const updatedBooking = await bookingQueries.updateBooking(id, body);
    if (!updatedBooking) {
      return res.status(404).json({ error: 'Reserva no encontrada.' });
    }
    res.json(updatedBooking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar la reserva.' });
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const deletedBooking = await bookingQueries.deleteBooking(id);
    if (!deletedBooking) {
      return res.status(404).json({ error: 'Reserva no encontrada.' });
    }
    res.json(deletedBooking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar la reserva.' });
  }
});

module.exports = router;
