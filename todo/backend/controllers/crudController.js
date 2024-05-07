import { response } from "express";
import { Todo } from "../models/todoSchema.js";



export const CreateData = async(req,res)=>{
    try{
if (
    !title,
    !content

){
    return res.status(401).send({message:"FIll all required fields"})
}
const newdata ={
    title:req.body.title,
    content:req.body.content
} 
const data = await Todo.create(newdata)
return res.status(201).send(data)
    }
    catch(error){
        console.log(error.message)
        res.status(500).send({message:error.message})
    }
}
export const ViewData = async(req,res)=>{
    try{
const data = await Todo.find({})
return res.status(200).send({
    count:Todo.length,
    data:data
})
    }
    catch(error){
        console.log(error)
        response.status(200).send()
    }
}


export const UpdateData = async(req,res)=>{
    try{
if (
    !req.body.title||
    !req.body.content
) {
    return res.status(201).send({message:"FIll all the required details "})
}
const {id}= req.params
const result = await Todo.findByIdAndUpdate(id,req.body)
if(!request){
    return res.status(400).send({message:"Data not found"})
}
return res.status(200).send({message:"List added sucessfully"})
    }
    catch(error){
        console.log(error)
        response.status(200).send()
    }
}

export const DeleteData = async(req,res)=>{
    try{
const {id} = req.params

const result = Todo.findByIdAndDelete(id)
if(!result){
    return res.status(400).send({message:"Data not found"})
}
return res.status(200).send({
    message:"Data deleted sucessfully"
})
    }
    catch(error){
        console.log(error)
        response.status(500).send({
            message:error.message
        })
    }
}

