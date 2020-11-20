const mongoose = require('mongoose');

const districtSchema = new mongoose.Schema({
    state:{
        type:String,
        required:true,
        trim:true
    },
    district:{
        type:String,
        required:true,
        trim:true
    }
})


const District = mongoose.model('district', districtSchema)


module.exports = District