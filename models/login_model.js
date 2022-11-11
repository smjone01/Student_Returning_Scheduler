const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LoginSchema = new Schema({
    RollNo:{
        type:String,
        required:true
    },
    Email:{
        type:email,
        required:true
    },
    Password:{
        type:password,
        required:true
    }
})

module.exports = mongoose.model('Login',LoginSchema)