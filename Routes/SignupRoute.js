const express = require("express")
const router = express.Router()
const UserSchema = require("../models/signup_model")
const bcrpytjs = require('bcryptjs')
router.post('/signup', async (req,res)=>{
    
    try{
        const {
            Name,
            RollNo,
            Email,
            PhoneNo,
            Password,
            ConfirmPass
        } = req.body;
        req.session.requested = false;
        if(Password === ConfirmPass){
            const hashedPsw = await bcrpytjs.hash(Password,12);
            const UserData = new UserSchema({
                Name,
                RollNo,
                Email,
                PhoneNo,
                Password: hashedPsw
            })
            const userdatabyemail = await UserSchema.findOne({Email:Email});
            
            await UserData.save(err=>{
                if(err){
                    console.log(err)
                }
                else{
                    res.render("signup",{error: "", success:"Signed Up Successfully , kindly Login Now"})
                }
            });
            if(userdatabyemail){
            if(Email === userdatabyemail.Email){
                res.render("signup",{error:"Account with Similar email already exists ,Please Login",success:""})
            }}
            
        }
            else{
            res.render('signup',{success:"",error:"Password didn't Match with Confirm Password"})
        }
    }catch(error){
        // res.render('signup',{error:"error" , success:""})
        console.log(error)
    }
})



module.exports = router