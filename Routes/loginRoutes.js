const express = require("express")
const router = express.Router()

router.get('/signup',(req,res)=>{
    res.render("signup",{error:'',success:""})
})

module.exports = router