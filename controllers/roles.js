const configDB = require('../knexfile');
const knex = require('knex')(configDB.development);



const getAllRoles = () => {
    return knex
    .column('id', 'rol')
    .select()
    .from('roles')
}
const getRolById = (id) => {
    return knex('roles')
    .where('id', id)
    .select('id','rol')
}
const createRol = (body) => {
    return knex('roles')
    .insert(body)
}
const updateRol = (id, body) => {
    return knex('roles')
    .where('id', id)
    .update(body)
}
const deleteRol = (id) => {
    return knex('roles')
    .where('id', id)
    .del()
}
module.exports = {
    deleteRol,
    updateRol,
    createRol,
    getAllRoles,
    getRolById
}