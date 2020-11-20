const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:4
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
})

userSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject
}

userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id.toString()},process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async(username,password)=>{
    const user = await User.findOne({username})

    if(!user){
        throw new Error('Unable to login')
    }
    const isMatch = await bcryptjs.compare(password, user.password)

    if(!isMatch){
        throw new Error('Unable to login')
    }
    return user
}

userSchema.pre('save', async function(next){
    const user = this

    if(user.isDirectModified('password')){
        user.password = await bcryptjs.hash(user.password,8)
    }
    next()
})

const User = mongoose.model('User',userSchema)


module.exports=User