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


mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    // listening to the port
app.listen(process.env.PORT, () => {
    console.log("Connection done with database and connected on port" , process.env.PORT)
})

})
.catch((error)=>{
    console.log(error)
})
