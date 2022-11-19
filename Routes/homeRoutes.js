const express = require("express")
const router = express.Router()
const {isAuth} = require("../middlewares/auth")


router.get('/login',(req,res)=>{
    res.render("login",{success:"",error:""})
})


module.exports = router