const bcrypt = require("bcryptjs/dist/bcrypt")
const express = require("express")
const router = express.Router()
const UserSchema = require("../models/signup_model")
const bcrpyt = require('bcryptjs')
const session =  require("express-session")
const {isAuth} = require("../middlewares/auth")
// const {isAdmin} = require("../middlewares/admin")
const AdminDetails = require("../models/adminlogin_model")
// const connectMongoDBSession = require('connect-mongodb-session')(session);
// const store = new connectMongoDBSession({
//     uri : "mongodb://localhost:27017/test",
//     collection: "sessoions"
// });
// router.use(session({
//     secret: 'key that will sign the cookie',
//     resave: false,
//     saveUninitialized: false,
//     store:store,
// }));



router.get('/signup',(req,res)=>{
    res.render("signup",{error:'',success:""})
})

// const isAuth = (req,res,next)=>{
//     if(req.session.isAuth){
//         next()
//     }
//     else{
//         res.redirect('/login')
//     }
// }


// router.get('/request',isAuth,(req,res)=>{
//     res.render("request") 
// })
// router.post('/login',(req,res)=>{
//     const {
//         RollNo,
//         Email,
//         Password
//     } = req.body;
     
//      UserSchema.findOne({Email:Email},async(err,result)=>{
//         if(result!==null){var isMatch =  await bcrpyt.compare(Password,result.Password)}
//         if(result==null){
//             res.render("login",{error:"Email not registered , Kindly SignUp"})
//         }
//         else if(Email === result.Email && isMatch){
//             req.session.isAuth =true;
//         return res.redirect('/request')
//     }   else if(Email === result.Email && !isMatch){
//         console.log(err)
//         res.render("login",{error:"Password didn't matched"})
//     }
// }
//     )

// })

router.post('/login',(req,res)=>{
    const {
        RollNo,
        Email,
        Password
    } = req.body;
     
     UserSchema.findOne({Email:Email},async(err,result)=>{
        
        if(result!==null){var isMatch =  await bcrpyt.compare(Password,result.Password);
            if(Email === result.Email && isMatch){
                req.session.isAuth =true;
                req.session.Name = result.Name;
                req.session.Email = result.Email;
                req.session.RollNo = result.RollNo;
                req.session.PhoneNo = result.PhoneNo;

            res.redirect('/')
        }   else if(Email === result.Email && !isMatch){
            console.log(err)
            res.render("login",{success:"",error:"Invalid Password"})
        }
        
        }
        else if(result==null){
            res.render("login",{success:"",error:"Account does not exist"})
        }
        
}
    )

})



router.post('/logout',(req,res)=>{
    req.session.destroy((err)=>{
        if(err) throw err;
        res.redirect('/')
    })
})
router.get('/logout',(req,res)=>{
    req.session.destroy((err)=>{
        if(err) throw err;
        res.redirect('/')
    })
})

router.get('/',(req,res)=>{
    if(req.session.isAuth){
        res.render("home",{profile:req.session.Name,login:"Details", logout:"Logout",isAuth : "one",reqstatus:null})
    }
    
    else if(req.session.isAdmin){
        res.render("home",{profile:req.session.AdminEmail,login:"",logout:"Logout",isAuth:"none",reqstatus:"admin"})
    }
    else{
        res.render("home",{profile:"Your Profile",login:"Login", logout:"About",isAuth: "two",reqstatus:null
    })
    }
})

module.exports = router;
