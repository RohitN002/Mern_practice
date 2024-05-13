const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const connecttoDB = require('./db/connecttoDB')
const authRoutes = require('./routes/authRoutes.js')
const cors = require('cors')
const app = express()



app.use(cors({
    origin:["http://localhost:5173"],
    method:["GET","POST"],
    credentials:true
}));
app.use(express.json())
app.use('/api/auth',authRoutes)
const port = process.env.PORT


app.listen(port,()=>{
    connecttoDB()
    console.log(`App running in PORT ${port}`)
})

