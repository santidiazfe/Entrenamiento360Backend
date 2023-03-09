const express = require('express');
const router = express.Router();
const horarioQueries = require('../controllers/horarios')

router.get('/', async (req, res) => {
    const hours = await horarioQueries.getAllHours();
    res.json(hours)
   
})

router.post('/' , async (req, res) => {
    const body = req.body
    const newHour = await horarioQueries.createHour(body);
    res.json(newHour)
    
})

router.get('/:id' , async (req, res) => {
    const id = req.params.id
    await horarioQueries.getHourById(id)
    .then((hour)=>{
       return res.json(hour) 
    })
    .catch((er) =>{
        return res.json (er)
    })
    
})

router.put('/:id' , async (req, res) => {
    const id = req.params.id
    const body = req.body
    const updateHour = await horarioQueries.updateHour(id, body);
    res.json(updateHour)
   
})

router.delete('/:id' ,async (req, res) => {
    const id = req.params.id
    const deleteHour = await horarioQueries.deleteHour(id);
    res.json(deleteHour)
    
})


module.exports = router;