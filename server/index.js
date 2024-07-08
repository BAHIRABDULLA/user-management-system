const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config()

const userRoute = require('./routes/userRoute.js')
const authRoute = require('./routes/authRoute.js')

const app = express()
app.use(cors({
    origin:'http://localhost:5173',
    methods:'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials:true
}))

mongoose.connect(process.env.MONGOURL).then(()=>{
    console.log('mongodb connected',process.env.MONGOURL);
}).catch(err=>{
    console.error('Mongodb connection error ',err);
})
app.use('/server',userRoute)
app.use('/server',authRoute)
app.listen(3004,()=>console.log(`Server listening port http://localhost:3004`))