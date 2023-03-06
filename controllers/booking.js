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
const createBooking = (body) => {
    return knex('reservas')
    .insert(body)
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


module.exports = {
    deleteBooking,
    updateBooking,
    createBooking,
    getAllBookings,
    getBookingById
}