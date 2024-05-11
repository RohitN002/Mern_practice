const signupModel = require('../models/signupModel')


const signup=async(req,res)=>{
    const {name,email,password} = req.body
    try {
const existingUser = await signupModel.findOne({email})
if(existingUser){
   return  res.status(201).json({message:"User already exist"})
}
const newUser = signupModel({name,email,password})
const savedUser = await newUser.save()
return res.status(200).json({message:"Account created sucessfully"})
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
        if(existingUser.password===password){
            return res.status(200).json({message:"Loggin sucessful"})
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