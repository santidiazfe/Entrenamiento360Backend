const configDB = require('../knexfile');
const knex = require('knex')(configDB.development);



const getAllBookings = () => {
    return knex
    .column('*')
    .select()
    .from('reservas')
}

const getBookingById = (id) => {
    return knex
      .select('reservas.id','usuario.nombre', 'horarios.dia', 'horarios.hora')
      .from('reservas')
      .innerJoin('usuario', 'reservas.usuario_id', 'usuario.cedula')
      .innerJoin('horarios', 'reservas.horario_id', 'horarios.id')
      .where('usuario.cedula', id);
  };

  const getBookingByDay = (day) => {
    return knex
      .select('reservas.id', 'usuario.nombre', 'horarios.dia', 'horarios.hora')
      .from('reservas')
      .innerJoin('usuario', 'reservas.usuario_id', 'usuario.cedula')
      .innerJoin('horarios', 'reservas.horario_id', 'horarios.id')
      .where('horarios.dia', day);
  };

  const getBookingByHour = (hora) => {
    return knex
      .select('reservas.id', 'usuario.nombre', 'horarios.dia', 'horarios.hora')
      .from('reservas')
      .innerJoin('usuario', 'reservas.usuario_id', 'usuario.cedula')
      .innerJoin('horarios', 'reservas.horario_id', 'horarios.id')
      .where('horarios.hora', hora);
  };

  const getBookingByUser = (id) => {
    return knex('reservas')
    .select('reservas.id', 'usuario.nombre', 'horarios.dia', 'horarios.hora')
      .from('reservas')
      .innerJoin('usuario', 'reservas.usuario_id', 'usuario.cedula')
      .innerJoin('horarios', 'reservas.horario_id', 'horarios.id')
      .where('usuario.cedula', id);
}

const createBooking = async (body) => {
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
    getBookingById,
    getBookingByUser,
    getBookingByDay,
    getBookingByHour
}