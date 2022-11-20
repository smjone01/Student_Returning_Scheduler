module.exports = {
     isAuth : function (req,res,next){
        if(req.session.isAuth){
            next()
        }
        else{
            res.redirect('/login')
        }
    }
    ,
    isAdmin: function (req,res,next){
        if(req.session.isAdmin){
            next()
        }
        else{
            res.redirect('/adminlogin')
        }
    }
    
}
