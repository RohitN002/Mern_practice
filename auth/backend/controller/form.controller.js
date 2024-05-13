const signupModel = require('../models/signupModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
const cookieParser = require('cookie-parser')
const express = require('express')
const app = express()
app.use(cookieParser())

const jwttoken = process.env.JWTTOKEN
console.log(jwttoken)
const signup=async(req,res)=>{
  
    try {
        const {name,email,password} = req.body
        const existingUser = await signupModel.findOne({email})
if(existingUser){
   return  res.status(201).json({message:"User already exist"})
}

        bcrypt.hash(password,10)
        .then(async (hash)=>{
            const newUser = signupModel({name,email,password:hash})
            const savedUser = await newUser.save()
            return res.status(200).json({message:"Account created sucessfully"})
        })


    }catch(error){
 return res.status(500).json({message:"Internal server error"})
    }
}

const signin = async (req,res)=>{
    try{
        const {email,password}= req.body 
        const existingUser = await signupModel.findOne({email})
        if (!existingUser){
            return res.status(401).json({message:"Mail id not registerd"})
 }
        if(existingUser){
           
            bcrypt.compare(password,existingUser.password,(err,response)=>{
                if(err){
                    return res.status(401).json({message:"error"})
                }
                if(response){
                const token = jwt.sign({email:existingUser.email},jwttoken,{expiresIn:"1d"})
                res.cookie("token",token)
            return res.status(200).json({message:"Loggin sucessful"})
                }
            })
        }else{
            return res.status(401).json({message:"mail id or password doesnt match"})
        }
    }
  catch (err){
console.log(err)
return res.status(500).json({mesage:"Internal server error "})
  }

}

module.exports={signup,signin}