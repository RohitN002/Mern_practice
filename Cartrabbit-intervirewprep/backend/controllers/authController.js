import { Auth } from "../models/authModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
const JWTOKEN = process.env.JWT

const app = express()
app.use(cookieParser())
export const signup =(req,res)=>{
    try{
const {name,email,password} = req.body
const hassedPwd = bcrypt.hash(password,10)
const createUser = Auth.create({name,email,password:hassedPwd})
return res.status(200).json({messge:"user created sucessfully "})
    }catch(err){
        return resizeBy.status(500).json({message:"Internal server error"})
    }
}

export const signin =(req,res)=>{
    try{
const {email,password}= req.body
const existingUser = Auth.findOne(email)
if(!existingUser){
    return res.status(401).json({message:"NO user found in this email id"})
}
const comparedPWD = bcrypt.compare(password,existingUser.password)
if(comparedPWD){
    const jwtken = jwt.sign({email:existingUser.email},JWTOKEN,{expiresIn:"1d"})
    res.cookie("jwt",jwtken)
    return res.status(200).json({messge:"Login sucessful"})
}else{

    return res.status(401).json({message:"username or password doesn't match "})
}
    }catch(err){
        return res.status(500).json({message:"Internal server error"})
    }
}
