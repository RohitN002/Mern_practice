const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())


mongoose
.connect(MONGODB)
.then(()=>{
    console.log(`app connected to database`)
})
.catch((err)=>{
    console.log(err)
})