import mongoose from "mongoose";

const todo= new mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        }  ,
        content:{
            type:String,
            required:true
        }  ,
  
    },
    {
        timestamps:true
    }
)

export const Todo = mongoose.model("todo",todo)
