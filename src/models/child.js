const mongoose = require('mongoose');

const childSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },

    sex:{
        type:String,
        required:true,
        trim:true
    },

    birthday: { 
        type: Date 
    },
    
    fatherName:{
        type:String,
        required:true,
        trim:true

    },

    motherName:{
        type:String,
        required:true,
        trim:true

    },

    state:{
        type:String,
        required:true,
        trim:true

    },
    
    district:{
        type:String,
        required:true,
        trim:true

    },

    avatar:{
        type:Buffer
    }
       
})


const Child = mongoose.model('child', childSchema)


module.exports = Child