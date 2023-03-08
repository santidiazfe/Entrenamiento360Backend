const configDB = require('../knexfile');
const knex = require('knex')(configDB.development);



const getAllBookings = () => {
    return knex
    .column('*')
    .select()
    .from('reservas')
}
// const getBookingById = (id) => {
//     return knex('reservas')
//     .where('id', id)
//     .select('*')
// }

const getBookingById = (id) => {
    return knex
      .select('usuario.nombre', 'horarios.dia', 'horarios.hora')
      .from('reservas')
      .innerJoin('usuario', 'reserva.id_usuario', 'usuarios.id_usuario')
      .innerJoin('horarios', 'inscripciones.id_horario', 'horarios.id_horario')
      .where('usuarios.id_usuario', id);
  };
// const createBooking = async (body) => {
//     const { dia_id, usuario_id } = body;

//     // Verificar si ya existe una reserva para el usuario en esa fecha
//     const existingBooking = await knex('reservas')
//       .where({ dia_id, usuario_id })
//       .first();
//     if (existingBooking) {
//       throw new Error('El usuario ya tiene una reserva en esta fecha.');
//     }
  
//     // Si no existe, crear la nueva reserva
//     const newBooking = await knex('reservas').insert(body);
//     return newBooking;
// }
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
 const getBookingByDay = (id) => {
    return knex
    .select('usuarios.nombre', 'horarios.dia', 'horarios.hora')
    .from('reservas')
    .innerJoin('usuario', 'reserva.id_usuario', 'usuarios.id_usuario')
    .innerJoin('horarios', 'inscripciones.id_horario', 'horarios.id_horario')
    .where('usuarios.id_usuario', id);
 }

const getBookingByUser = (id) => {
    return knex('reservas')
    .where('usuario_id', id)
    .select('id','','id_horario')
}
const getBookingByHour = (id) => {
    return knex('reservas')
    .where('hora_id', id)
    .select('id','dia_id','usuario_id', 'hora_id')
}
// knex.select('Usuarios.Nombre', 'Horarios.Dia', 'Horarios.Hora')
//     .from('Inscripciones')
//     .innerJoin('Usuarios', 'Inscripciones.ID_usuario', 'Usuarios.ID_usuario')
//     .innerJoin('Horarios', 'Inscripciones.ID_horario', 'Horarios.ID_horario')

module.exports = {
    deleteBooking,
    updateBooking,
    createBooking,
    getAllBookings,
    getBookingById,
    getBookingByUser,
    getBookingByHour
}