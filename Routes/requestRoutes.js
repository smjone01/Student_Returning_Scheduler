const {isAuth} = require("../middlewares/auth")
const express = require("express")
const router = express.Router()
const session =  require("express-session")
const requestSchema = require("../models/request_model")
router.get('/request',isAuth,(req,res)=>{
    res.render("request") 
})
router.post('/request',isAuth,async(req,res)=>{
    try
        {
            const Email = req.session.Email;
            const DateReturn = req.body.DateReturn;
            const Reason = req.body.Reason;
            const link = req.body.link;
            const UserReqData = new requestSchema({
                    Email,
                    DateReturn,
                    Reason,
                    link
            })


   await UserReqData.save(err=>{
    if(err){
        console.log(err)
    }
    else{
        console.log("Done")
        res.redirect("/");
    }
   })}
    catch(error){
        console.log(error)
    }
}) 

module.exports = router