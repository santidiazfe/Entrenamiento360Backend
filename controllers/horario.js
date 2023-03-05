const configDB = require('../knexfile');
const knex = require('knex')(configDB.development);



const getAllHours = () => {
    return knex
    .column('id', 'hora')
    .select()
    .from('horario')
}
const getHourById = (id) => {
    return knex('horario')
    .where('id', id)
    .select('id','hora')
}
const createHour = (body) => {
    return knex('horario')
    .insert(body)
}
const updateHour = (id, body) => {
    return knex('horario')
    .where('id', id)
    .update(body)
}
const deleteHour = (id) => {
    return knex('horario')
    .where('id', id)
    .del()
}
module.exports = {
    deleteHour,
    updateHour,
    createHour,
    getAllHours,
    getHourById
}