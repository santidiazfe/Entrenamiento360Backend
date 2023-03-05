const configDB = require('../knexfile');
const knex = require('knex')(configDB.development);



const getAllDays = () => {
    return knex
    .column('id', 'dia')
    .select()
    .from('dia')
}
const getDayById = (id) => {
    return knex('dia')
    .where('id', id)
    .select('id','dia')
}
const createDay = (body) => {
    return knex('dia')
    .insert(body)
}
const updateDay = (id, body) => {
    return knex('dia')
    .where('id', id)
    .update(body)
}
const deleteDay = (id) => {
    return knex('dia')
    .where('id', id)
    .del()
}
module.exports = {
    deleteDay,
    updateDay,
    createDay,
    getAllDays,
    getDayById
}