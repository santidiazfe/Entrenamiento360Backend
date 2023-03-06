const configDB = require('../knexfile');
const knex = require('knex')(configDB.development);



const getAllUsers = () => {
    return knex
    .column('cedula', 'nombre')
    .select()
    .from('usuario')
}
const getUsersById = (id) => {
    return knex('usuario')
    .where('cedula', id)
    .select('nombre','cedula')
}
const createUser = (body) => {
    return knex('usuario')
    .insert(body)
}
const updateUser = (id, body) => {
    return knex('usuario')
    .where('cedula', id)
    .update(body)
}
const deleteUser = (id) => {
    return knex('usuario')
    .where('cedula', id)
    .del()
}
module.exports = {
    deleteUser,
    updateUser,
    createUser,
    getAllUsers,
    getUsersById
}