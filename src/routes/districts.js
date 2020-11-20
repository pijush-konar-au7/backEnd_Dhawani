const express = require('express')
const router = new express.Router()
const District = require('../models/district')

router.post('/districts', async(req,res)=>{
    const district = new District(req.body)
    try{
        await district.save()
        res.status(201).send(district)
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/districts', async(req,res) => {
    try{
        const district = await District.find({})
        res.send(district)
    }catch(e){
        res.status(500).send(e)
    }
})

module.exports = router;