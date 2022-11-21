const {isAuth} = require("../middlewares/auth")
const express = require("express")
const router = express.Router()
const session =  require("express-session")
const requestSchema = require("../models/request_model")


router.get('/request',isAuth,(req,res)=>{
    res.render("request") 

})
router.get('/requestAlreadyMade',(req,res)=>{
    res.render("requestAlreadyMade")
})

// router.get('/requestStatus',isAuth,(req,res)=>{
//     res.render("requestStatus", {
//         name: req.session.Name,
//         rollno: req.session.RollNo,
//         email: req.session.Email,
        
//     }) 
// })

router.post('/request',async(req,res)=>{
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
        res.render("home",{profile:req.session.Name,login:"Details", logout:"Logout",isAuth : "one",reqstatus:"reqmade"})
    }
   })}
    catch(error){
        console.log(error)
    }
}) 

module.exports = router