const configDB = require('../knexfile');
const knex = require('knex')(configDB.development);



const getAllDays = () => {
    return knex
    .column('id', 'dia')
    .select()
    .from('dia')
}

const getDayOfWeek = async (date) => {
  const dayOfWeek = await knex('dias')
    .select('dia')
    .where('id', knex.raw('DATEPART(dw, CAST(? AS DATE))', [date]))
    .first();
  return dayOfWeek.dia;
};

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
    getDayById,
    getDayOfWeek
}