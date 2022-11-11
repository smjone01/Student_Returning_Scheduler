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
        type:String,
        required:true,
        unique:true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        }
    },
    PhoneNo:{
        type:Number,
        required:true
    },
    Password:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("Signup",SignupSchema)