const express = require('express')
const router = new express.Router()
const multer = require('multer')
const sharp = require('sharp')
const Child = require('../models/child')

router.post('/childs', async(req,res)=>{
    const child = new Child(req.body)
    try{
        await child.save()
        res.status(201).send(child)
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/childs', async(req,res)=>{
    try{
        const child = await Child.find({})
        res.send(child)
    }catch(e){
        res.status(500).send(e)
    }
})

const upload = multer({
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload jpg,jpeg or png file only!'))
        }
        cb(undefined,true)
    }
})

router.post('/childs/avatar', upload.single('avatar'), async(req,res)=>{
    const buffer = await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()

    req.child.avatar = buffer
    await req.child.save()
    res.send()
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})

router.get('/childs/avatar',async(req,res)=>{
    try{
        const child = await Child.findById(req.params.id)
        if(!child || !child.avatar){
            throw new Error()
        }
        res.set('Content-Type','image/png')
        res.send(child.avatar)
    }catch(e){
        res.send(404).send()
    }
})

module.exports = router;