const express = require('express');
const configDB = require('../knexfile');
const knex = require('knex')(configDB.development);
const bcrypt = require('bcrypt');
const router = express.Router();



router.post('/', async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(req.body.password, salt);
    const newUser = {
      cedula: req.body.cedula,
      password: password,
      email: req.body.email,
      rol_id: req.body.rol_id
    };
    await knex('usuario').insert(newUser);
    res.status(200).json({ message: 'Usuario creado exitosamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ocurrió un error en el servidor.' });
  }
});

module.exports = router;
