const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SignupSchema = new Schema({
    Name:{
        type:String,
        required:true
    },
    RollNo:{
        type:String,
        required:true
    },
    Email:{
        type:email,
        required:true
    },
    PhoneNo:{
        type:Number,
        required:true
    },
    Password:{
        type:password,
        required:true
    },
    ConfirmPass:{
        type:password,
        required:true
    }

})

module.exports = mongoose.model("Signup",SignupSchema)