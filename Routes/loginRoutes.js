const express = require("express")
const router = express.Router()
const UserSchema = require("../models/signup_model")
router.get('/signup',(req,res)=>{
    res.render("signup",{error:'',success:""})
})
router.post('/login',(req,res)=>{
    const {
        RollNo,
        Email,
        Password
    } = req.body;
    UserSchema.findOne({Email:Email},(err,result)=>{
    if(Email === result.Email && Password === result.Password ){
        res.render("request",{profile:result.Name})
    }else if(Email === result.Email && Password != result.Password){
        console.log(err)
        res.render("login",{error:"Password didn't matched"})
    }}
    )
})
module.exports = router