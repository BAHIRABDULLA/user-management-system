const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const userRoute = require('./routes/userRoute.js')
const authRoute = require('./routes/authRoute.js')
mongoose.connect(process.env.MONGOURL).then(()=>{

    console.log('mongodb connected',process.env.MONGOURL);
}).catch(err=>{
    console.error('Mongodb connection error ',err);
})
const app = express()
app.use('/',userRoute)
app.use('/',authRoute)
app.listen(3004,()=>console.log(`Server listening port http://localhost:3004`))