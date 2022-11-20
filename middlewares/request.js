module.exports = {
    requested : function (req,res,next){
    if(req.session.requested == false){
        next()
    }
    else{
        res.redirect("/requestAlreadyMade")
    }
}}