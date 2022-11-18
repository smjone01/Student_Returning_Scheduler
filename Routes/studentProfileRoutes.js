const {isAuth} = require("../middlewares/auth")
const express = require("express")
const router = express.Router()
const session =  require("express-session")

router.get('/studentProfile',isAuth,(req,res)=>{
    
    res.render("studentProfile" ,  {
        name: req.session.Name,
        rollno: req.session.RollNo,
        email: req.session.Email,
        phoneNo: req.session.PhoneNo
    });
})


module.exports = router