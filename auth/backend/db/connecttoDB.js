const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const MONGODB = process.env.MONGO
console.log(MONGODB)
 const connecttoDB = async()=>{
    try{
        mongoose
        .connect(MONGODB)
        .then(()=>{
            console.log(`app connected to database`)
        })
    }catch (error){
        console.log(error)
    }
}
module.exports  = connecttoDB