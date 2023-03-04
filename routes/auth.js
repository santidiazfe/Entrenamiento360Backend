const express = require('express');
const configDB = require('../knexfile');
const knex = require('knex')(configDB.development);
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const {verifyToken, TOKEN_SECRET} = require('../middlewares/jwt');
const router = express.Router();
// const app = express()


// app.use(bodyParser.urlencoded({extended:true}));
router.post('/login', async (req, res) => {
    //buscamos usuario con mismo mail
    console.log(req.body, 'req.body')
    try {
    const user = 
    await knex
    .select('*')
    .from('usuario')
    .where('user.nombre', req.body.nombre)
    .then((user) => {
        return user;
    })
    console.log(user, 'user')
    if(!user) {
        return res.status(400).json({error: 'Usuario no encontrado', success:false});
    }
    const validPassword = bcrypt.compareSync(  req.body.password, user[0].password );
    console.log(validPassword)
    if(!validPassword) {
        return res.status(400).json({error: 'Contraseña no válida', success:false});
    }
    //Crear el token
    const token = jwt.sign({
        name: user[0].name,
        id: user[0].id
    }, TOKEN_SECRET);
    res.json({error: null, data: 'Login exitoso', token, success:true});
    } catch (error) {
        console.log("Error en login");
      }
});
 //Registro de un usuario
router.post('/register', (req, res) => {
    const password = req.body.password;
    const newUser = {
        name: req.body.nombre,
        password //linea 52 se hace el hash
    }
    usuarios.push(newUser);
    res.json({success: true, newUser, usuarios}) //Devuelve contraseña y usuario en postman
})   
router.post('/', async (req, res) => {
    // hash contraseña
    const salt =  bcrypt.genSaltSync(10);
    const password =  bcrypt.hashSync(req.body.password, salt);
    const newUser = {
        name: req.body.nombre,
        password: password
    } 
    console.log(newUser, 'newUser')
    return await knex('user')
    .insert(newUser)
    .then((res) => {
        res.status(200).json({success: true, newUser, res}); // success:true preguntar richard
    }).catch((err) => {
        res.status(400).json({err: err})
    })
})    
module.exports = router;