import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
const MONGODB = process.env.MONGO
export const connectToDB = ()=>{
    try{
mongoose
.connect(MONGODB)
.then(()=>{
    console.log("App connected to DB")
})
    }catch(err){
        console.log(err)
    }
}