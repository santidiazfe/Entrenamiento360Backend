const express = require('express');
const router = express.Router();
const dayQueries = require('../controllers/day')

router.get('/', async (req, res) => {
    const days = await dayQueries.getAllDays();
    res.json(days)
   
})

router.post('/' , async (req, res) => {
    const body = req.body
    const newDay = await dayQueries.createDay(body);
    res.json(newDay)
    
})

router.get('/:id' , async (req, res) => {
    const id = req.params.id
    await dayQueries.getDayById(id)
    .then((day)=>{
       return res.json(day) 
    })
    .catch((er) =>{
        return res.json (er)
    })
    
})

router.put('/:id' , async (req, res) => {
    const id = req.params.id
    const body = req.body
    const updateDay = await dayQueries.updateDay(id, body);
    res.json(updateDay)
   
})

router.delete('/:id' ,async (req, res) => {
    const id = req.params.id
    const deleteDay = await dayQueries.deleteDay(id);
    res.json(deleteDay)
    
})


module.exports = router;