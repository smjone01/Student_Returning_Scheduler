const express = require("express")
const router = express.Router()
const requestSchema = require("../models/request_model")
const signupSchema = require("../models/signup_model")
const AdminSchema = require("../models/adminlogin_model")
const { request } = require("express")



router.get('/adminlogin',(req,res)=>{
    res.render("adminlogin")
})
router.get('/adminrequests',(req,res)=>{
    requestSchema.find({}, (err, result) => {
        const  requests = result.map(m => m);
    
    res.render('admin',{requests:requests,status:""}) 
});
})


router.post('/adminlogin',async(req,res)=>{
   try
    {const Name = req.body.Name;
    const Email = req.body.Email;
    const SecPin = req.body.Pin;
   
    
   

    if(SecPin == process.env.PIN){
        req.session.isAdmin = true;
        req.session.AdminEmail = req.body.Email;
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
                
                    // Use the array, pass it to a service, or pass to a callback
                    // res.render('admin',{requests:requests,status:""})
                    res.render('home',{profile:req.session.AdminEmail,login:"", logout:"Logout",isAuth : "none",reqstatus:"admin"})
                  ;
                
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

