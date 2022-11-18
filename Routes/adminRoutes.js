const express = require("express")
const router = express.Router()
const requestSchema = require("../models/request_model")
const signupSchema = require("../models/signup_model")
const AdminSchema = require("../models/adminlogin_model")
const{isAdmin} = require("../middlewares/auth")
const { request } = require("express")

router.get('/adminlogin',(req,res)=>{
    res.render("adminlogin")
})

router.get('/reqforadmin',isAdmin,(req,res)=>{
    res.render("reqforadmin",{Name:req.session.Name,Email:req.session.Email,RollNo:req.session.RollNo,})
})
router.post('/adminlogin',async(req,res)=>{
   try
    {const Name = req.body.Name;
    const Email = req.body.Email;
    const SecPin = req.body.Pin;
   
   

    if(SecPin == process.env.PIN){
        req.session.isAdmin = true;
        const AdminData = new AdminSchema({
            Name,
            Email,
            SecurityPin:SecPin
        });
        await AdminData.save(err=>{
            if(err){
                console.log(err)
            }
            else{
                console.log("Admin Added")
                requestSchema.find({}, (err, result) => {
                    const  requests = result.map(m => m);
                    // Use the array, pass it to a service, or pass to a callback
                    res.render('admin',{requests:requests,signupSchema})
                  });
                
            }
        })
    }
    else{
        console.log("wrong Pin")
    }
}
    catch(error){
        if(error){
            console.log(error)
        }
    }

})

module.exports = router;


//show data 