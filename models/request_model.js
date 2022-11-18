const mongoose = require('mongoose')
const Schema = mongoose.Schema

const requestSchema = new Schema({
    Email :{
        type:String,
    },
    DateReturn : {
        type : Date,
        required: true
    },
    Reason:{
        type:String,
        required:true
    },
    link :{
       type: String,
    required:true
   }
})

module.exports = mongoose.model("Requests",requestSchema)