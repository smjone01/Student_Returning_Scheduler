const express = require("express")
const mongoose = require("mongoose")
const homeRoutes = require("./Routes/homeRoutes")
const loginroutes = require("./Routes/loginRoutes")
const SignUproutes = require("./Routes/SignupRoute")
const session =  require("express-session")
const connectMongoDBSession = require('connect-mongodb-session')(session);
const ejs = require('ejs')
require("dotenv").config()
const path = require("path")
const PORT = process.env.PORT
const bodyParser = require(
    "body-parser"
);
app =express()

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
    uri : "mongodb://localhost:27017/test",
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
