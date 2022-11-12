const express = require("express")
const router = express.Router()

router.get('/login',(req,res)=>{
    res.render("login",{success:"",error:""})
})

router.get('/',(req,res)=>{
    res.render('home',{profile:"Your Porfile"})
})

module.exports = router