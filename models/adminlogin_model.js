const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AdminloginSchema = new Schema({
    Name : {
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        }
    },
    SecurityPin:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("Admin",AdminloginSchema)