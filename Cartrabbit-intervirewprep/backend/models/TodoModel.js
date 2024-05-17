import mongoose from 'mongoose'

const toDoModel = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    }
})

const todoModel = mongoose.model("Todo",toDoModel)
export default todoModel