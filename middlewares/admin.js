module.exports = {
    isAdmin : function (req,res,next){
       if(req.session.iAdmin){
           next()
       }
       else{
           res.redirect('/adminlogin')
       }
   }
   
}
