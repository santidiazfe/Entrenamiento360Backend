const express = require('express');
const configDB = require('../knexfile');
const knex = require('knex')(configDB.development);
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { verifyToken, TOKEN_SECRET } = require('../middlewares/jwt');
const router = express.Router();


router.post('/login', async (req, res) => {
  console.log(req.body, 'req.body');
  try {
    const user = await knex
      .select('*')
      .from('usuario')
      .where('usuario.nombre', req.body.name)
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

router.post('/register', async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(req.body.password, salt);
    const newUser = {
      name: req.body.name,
      password: password
    }
    await knex('usuario').insert(newUser);
    res.status(200).json({ success: true, newUser });
  } catch (error) {
    console.error(error);
    res.status(400).send("Error al registrar usuario");
  }
});

module.exports = router;
