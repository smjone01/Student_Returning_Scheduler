const express = require("express")
const mongoose = require("mongoose")
const homeRoutes = require("./Routes/homeRoutes")
const loginroutes = require("./Routes/loginRoutes")

require("dotenv").config()
const path = require("path")
const PORT = process.env.PORT
app =express()

app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req,res)=>{
    res.render("home")
})
app.use('/',homeRoutes)
app.use('/',loginroutes)

app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});
