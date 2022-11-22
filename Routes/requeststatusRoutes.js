const express = require("express")
const router = express.Router()

const requestSchema = require("../models/request_model")

router.get('/requestStatus',(req,res) => {
    // const Email = req.session.Email;
    // console.log(Email)
     requestSchema.find({Email:req.session.Email},(err,result)=>{
       if(!err)
        {if(result){
            const  requestsbystudent = result.map(m => m);
            // const Email = req.session.Email;
            // const DateReturn = result.DateReturn;
            // const Reason = result.Reason;
            // const link = result.link;
            res.render("requestStatus",{request:"request",requestsbystudent:requestsbystudent})

            // const Email = result.Email;
            // const DateReturn = result.DateReturn;
            // const Reason = result.Reason;
            // const link = result.link;
           
        }
        else{
            res.render("requestStatus",{request:"Norequest",Email:"",DateReturn:"",Reason:"",link:""})
        }}
        else{
            console.log(err);
        }
    })
})

module.exports = router 