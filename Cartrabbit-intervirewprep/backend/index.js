import express from 'express'
import dotenv from 'dotenv'
dotenv.config
import cors from 'cors'
import { connectToDB } from './db/connectTodb.js'
import authRoute from './routes/authRoutes.js'
const port = process.env.PORT 

const app= express()
app.use(cors({
    origin:['http:localhost:5700'],
    methods:["GET","POST"]

}))
app.use('/auth',authRoute)
app.use('/todo',todoRoute)
app.listen(port,()=>{
    connectToDB()
console.log(`app  running on port ${port }`)
})