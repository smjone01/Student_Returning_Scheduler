const express = require("express")
const mongoose = require("mongoose")
const homeRoutes = require("./Routes/homeRoutes")
const loginroutes = require("./Routes/loginRoutes")
const SignUproutes = require("./Routes/SignupRoute")
const requestRoutes = require("./Routes/requestRoutes")
const adminroutes = require("./Routes/adminRoutes")
const studentProfileRoutes = require("./Routes/studentProfileRoutes")
requeststatusRoutes = require("./Routes/requeststatusRoutes")
const session =  require("express-session")
const bcrpyt = require('bcryptjs')
const UserSchema = require("./models/signup_model")
const connectMongoDBSession = require('connect-mongodb-session')(session);
const ejs = require('ejs')
require("dotenv").config()
app =express()
const path = require("path")


const bodyParser = require(
    "body-parser"
);


app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded(
        {
            extended:true,
        }
    )
);


const store = new connectMongoDBSession({
    uri : process.env.MONGO_URI,
    collection: "sessoions"
});
app.use(session({
    secret: 'key that will sign the cookie',
    resave: false,
    saveUninitialized: false,
    store:store,
}));

app.use('/',homeRoutes)
app.use('/',loginroutes)
app.use('/',SignUproutes)
app.use('/',requestRoutes)
app.use('/',adminroutes)
app.use('/',studentProfileRoutes)
app.use('/',requeststatusRoutes)

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    // listening to the port
app.listen(process.env.PORT, () => {
    console.log("Connection done with database and connected on port" , process.env.PORT)
})
})


