const express = require('express');
const configDB = require('../knexfile');
const knex = require('knex')(configDB.development);
const bcrypt = require('bcrypt');
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(req.body.password, salt);
    const newUser = {
        cedula: req.body.cedula,
        nombre: req.body.nombre,
        password: password
      }
    console.log(newUser,'1')
    await knex('usuario').insert(newUser);
    res.status(200).json({ success: true, newUser });
  } catch (error) {
    console.error(error);
    res.status(400).send("Error al registrar usuario");
    console.log(newUser,'2')
  }
});

module.exports = router;
