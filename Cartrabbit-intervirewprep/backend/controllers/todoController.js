import todoModel from "../models/TodoModel";
//create
export const create =async(req,res)=>{
   try{
const newToDo ={
    title:req.body.title,
    content:req.body.content
}

 const saveToDo = await todoModel.create(newToDo)
return res.status(200).send(saveToDo)
   }catch(err){
return res.status(500).send(err)
   }
}

//view 
const viewToDo = async(req,res)=>{
    try{

    }catch(err){
        return res.status(500).send({message:err.message})
    }
}

//update
export const updateToDo =async (req,res)=>{
    try{
const {id} = req.params
        const updatedData={
            title:req.body.title,
            content:req.body.content
        }
        const updateToDo = await todoModel.findByIdAndUpdate({id, updatedData})
        return res.status(200).send(updateToDo)
        }catch(err){
            return res.status(500).send({message:err.message})
        }
    }

    //delete
   export const deleteTodo = async(req,res)=>{
try{
const {id} = req.params 

const deleteToDo = todoModel.findByIdAndDelete(id)
return res.status(200).send({message:"todo deleted sucessfully"})
}catch(err){
    return res.status(500).send({message:err.message})
}
    }
