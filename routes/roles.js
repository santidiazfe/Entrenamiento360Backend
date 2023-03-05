const express = require('express');
const router = express.Router();
const rolQueries = require('../controllers/roles')

router.get('/', async (req, res) => {
    const roles = await rolQueries.getAllRoles();
    res.json(roles)
   
})

router.post('/' , async (req, res) => {
    const body = req.body
    const newRol = await rolQueries.createRol(body);
    res.json(newRol)
    
})

router.get('/:id' , async (req, res) => {
    const id = req.params.id
    await rolQueries.getRolById(id)
    .then((day)=>{
       return res.json(rol) 
    })
    .catch((er) =>{
        return res.json (er)
    })
    
})

router.put('/:id' , async (req, res) => {
    const id = req.params.id
    const body = req.body
    const updateRol = await rolQueries.updateRol(id, body);
    res.json(updateRol)
   
})

router.delete('/:id' ,async (req, res) => {
    const id = req.params.id
    const deleteRol = await rolQueries.deleteRol(id);
    res.json(deleteRol)
    
})


module.exports = router;