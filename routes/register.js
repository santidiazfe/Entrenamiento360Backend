const express = require('express');
const configDB = require('../knexfile');
const knex = require('knex')(configDB.development);
const bcrypt = require('bcrypt');
const router = express.Router();


router.get('/', (req, res) => {
    res.send('register 360 funcionando')
});

router.post('/', async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(req.body.password, salt);
    const newUser = {
      cedula: req.body.cedula,
      nombre: req.body.nombre,
      password: password,
      email: req.body.email,
      celular: req.body.celular
    };
    await knex('usuario').insert(newUser);
    res.status(200).json({ success: true, newUser });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: true, message: error.message });
  }
});

module.exports = router;
