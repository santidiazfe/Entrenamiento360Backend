const express = require('express');
const configDB = require('../knexfile');
const knex = require('knex')(configDB.development);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { verifyToken, TOKEN_SECRET } = require('../middlewares/jwt');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('register 360 funcionando')
});

router.post('/', async (req, res) => {
  console.log(req.body, 'req.body');
  try {
    const user = await knex
      .select('*')
      .from('usuario')
      .where('usuario.nombre', req.body.nombre)
      .then((user) => {
        console.log(user, 'user');
        return user;
      })
      .catch((error) => {
        console.log("Error en la consulta a la base de datos", error);
        res.status(500).json({ error: "Error en la consulta a la base de datos", success: false });
        return;
      });

    if (!user || user.length === 0) {
      return res.status(400).json({ error: 'Usuario no encontrado', success: false });
    }
    const validPassword = bcrypt.compareSync(req.body.password, user[0].password);
    console.log(validPassword)
    if (!validPassword) {
      return res.status(400).json({ error: 'Contraseña no válida', success: false });
    }
    const token = jwt.sign({
      name: user[0].name,
      id: user[0].id
    }, TOKEN_SECRET);
    res.json({ error: null, data: 'Login exitoso', token, success: true });
  } catch (error) {
    console.log("Error en login");
    res.status(500).json({ error: "Error en el servidor", success: false });
  }
});

module.exports = router;
