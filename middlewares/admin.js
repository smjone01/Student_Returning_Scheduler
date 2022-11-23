module.exports = {
    isAdmin : function (req,res,next){
       if(req.session.isAdmin){
           next()
       }
       else{
           res.redirect('/adminlogin')
       }
   }
   
}
