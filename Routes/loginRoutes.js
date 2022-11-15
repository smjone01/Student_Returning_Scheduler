const bcrypt = require("bcryptjs/dist/bcrypt")
const express = require("express")
const router = express.Router()
const UserSchema = require("../models/signup_model")
const bcrpyt = require('bcryptjs')

router.get('/signup',(req,res)=>{
    res.render("signup",{error:'',success:""})
})
router.post('/login',(req,res)=>{
    const {
        RollNo,
        Email,
        Password
    } = req.body;
    
     UserSchema.findOne({Email:Email},async(err,result)=>{
        if(result!==null){var isMatch =  await bcrpyt.compare(Password,result.Password)}
        if(result==null){
            res.render("login",{error:"Email not registered , Kindly SignUp"})
        }
        else if(Email === result.Email && isMatch){
        res.render("request",{profile:result.Name})
    }   else if(Email === result.Email && !isMatch){
        console.log(err)
        res.render("login",{error:"Password didn't matched"})
    }
}
    ) 
})
module.exports = router