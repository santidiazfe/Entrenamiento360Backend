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
      res.status(200).json({ success: true, newUser });
    } catch (error) {
      if (error.code === '23505') {
          res.status(400).json({ error: 'El usuario ya existe', success: false });
          return;
      } else {
          res.status(500).json({ error: 'Error interno del servidor', success: false });
          return;
      }
      console.error(error);
      res.status(400).json({ error: true, message: error.message });
    }
  });

module.exports = router;
