const signupModel = require('../models/signupModel')
const bcrypt = require('bcrypt')

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
            bcrypt.compare(existingUser.password,password,(err,response)=>{
                if(err){
                    return res.status(401).json({message:"error"})
                }
                if(response){
                    
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