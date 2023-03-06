const configDB = require('../knexfile');
const knex = require('knex')(configDB.development);



const getAllBookings = () => {
    return knex
    .column('*')
    .select()
    .from('reservas')
}
const getBookingById = (id) => {
    return knex('reservas')
    .where('id', id)
    .select('*')
}

const createBooking = async (body) => {
    const { dia_id, usuario_id } = body;

    // Verificar si ya existe una reserva para el usuario en esa fecha
    const existingBooking = await knex('reservas')
      .where({ dia_id, usuario_id })
      .first();
    if (existingBooking) {
      throw new Error('El usuario ya tiene una reserva en esta fecha.');
    }
  
    // Si no existe, crear la nueva reserva
    const newBooking = await knex('reservas').insert(body);
    return newBooking;
}
const updateBooking = (id, body) => {
    return knex('reservas')
    .where('id', id)
    .update(body)
}
const deleteBooking = (id) => {
    return knex('reservas')
    .where('id', id)
    .del()
}
const getBookingByDay = (id) => {
    return knex('reservas')
    .where('dia_id', id)
    .select('id','hora_id','usuario_id')
}

const getBookingByUser = (id) => {
    return knex('reservas')
    .where('usuario_id', id)
    .select('id','hora_id','dia_id')
}
const getBookingByHour = (id) => {
    return knex('reservas')
    .where('hora_id', id)
    .select('id','dia_id','usuario_id', 'hora_id')
}
module.exports = {
    deleteBooking,
    updateBooking,
    createBooking,
    getAllBookings,
    getBookingById,
    getBookingByDay,
    getBookingByUser,
    getBookingByHour
}