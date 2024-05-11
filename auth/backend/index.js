const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const connecttoDB = require('./db/connecttoDB')
const router = require('./routes/form.routes.js')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
app.use('/app',router)
const port = process.env.PORT

app.listen(port,()=>{
    connecttoDB()
    console.log(`App running in PORT ${port}`)
})
