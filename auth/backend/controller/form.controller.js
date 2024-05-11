const signup = require('../models/signupModel.js')

exports.signupController=async(req,res)=>{
const {username,email,password,confirmPassword} = req.params
const userExist = signup.find(email)
if (userExist){
    return res.status(401).json({message:"user already exist"})
}else {
    if (password == confirmPassword){
        const mongo = signup.create(username,email,password)
        return res.status(200).json({message:"User created sucessfully"})
    }else{
        return res.status(401).json({message:"password and confirm password doesn't match"})
    }
}

}