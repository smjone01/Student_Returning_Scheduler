const express = require("express")
const router = express.Router()
const UserSchema = require("../models/signup_model")

router.post('/signup', async (req,res)=>{
    console.log(req.body);
    try{
        const {
            Name,
            RollNo,
            Email,
            PhoneNo,
            Password,
            ConfirmPass
        } = req.body;
        console.log(req.body)
        if(Password === ConfirmPass){
            const UserData = new UserSchema({
                Name,
                RollNo,
                Email,
                PhoneNo,
                Password
            })
            await UserData.save(err=>{
                if(err){
                    console.log(err)
                }
                else{
                    res.render("signup",{error: "", success:"Done"})
                }
            })
            const userdatabyemail = await UserSchema.findOne({Email:Email});
            if(Email === userdatabyemail.Email){
                res.render("signup",{error:"Account with eimilar email already exists ,Please Login"})
            }else{
                console.log('Err')
            }

        }
            else{
            res.render('signup',{success:"",error:"Password didn't Match with Confirm Password"})
        }
    }catch(error){
        res.render('signup',{error:"error"})
    }
})

module.exports = router