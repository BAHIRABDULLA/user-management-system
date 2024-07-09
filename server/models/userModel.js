
const { timeStamp } = require('console')
const mongoose = require('mongoose')
const { type } = require('os')
// const { type } = require('os')

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number
    },
    password:{
        type:String,
        required:true
    },
    profilePicture:{
      type:String,
      default:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'  
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})
module.exports = mongoose.model('User',userSchema)
