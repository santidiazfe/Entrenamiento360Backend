const express = require('express');
const router = express.Router();
const userQueries = require('../controllers/user')

router.get('/', async (req, res) => {
    const user = await userQueries.getAllUsers();
    res.json(user)
   
})

router.post('/' , async (req, res) => {
    const body = req.body
    const newUser = await userQueries.createUser(body);
    res.json(newUser)
    
})

router.get('/:id' , async (req, res) => {
    const id = req.params.id
    await userQueries.getUsersById(id)
    .then((user)=>{
       return res.json(user) 
    })
    .catch((er) =>{
        return res.json (er)
    })
    
})

router.put('/:id' , async (req, res) => {
    const id = req.params.id
    const body = req.body
    const updateUser = await userQueries.updateUser(id, body);
    res.json(updateUser)
   
})

router.delete('/:id' ,async (req, res) => {
    const id = req.params.id
    const deleteUser = await userQueries.deleteUser(id);
    res.json(deleteUser)
    
})


module.exports = router;