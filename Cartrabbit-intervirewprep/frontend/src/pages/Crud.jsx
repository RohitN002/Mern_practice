import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom';
const Crud = () => {
    const [input,setInput]=useState('')
    const [loading,setLoading]= useState(false)
    const [datas,setDatas] = useState([])
    const {id} = useParams()

    //create
    const handleSubmit = async (e)=>{
e.preventDefault()
try{
const value = await axios.post(``,input)

}catch(err){
toast.error(err)
}finally{
setLoading(false)
}
    }
    //read 
    const getData = async (e)=>{
        e.preventDefault()
        try{
            setLoading(true)
            const Data = await axios.get(``)
            .then((res)=>{
                setDatas(res)
            })
        }
        catch(err){
            toast.error(err)
        }
        finally{
            setLoading(false)
        }
        
    }
//update
    const handleEditTodo =async (e)=>{
        e.preventDefault()
        try{
            const data ={

            }
const editData = await axios.put(``,data)
        }catch(err){
toast.error(err)
        }
    }
//delete
    const hanldeDeleteTodo = async()=>{
try{
const deletedata = await axios.post(``)
.then((response)=>{
    console.log(response)
}
)
}catch(err){
    toast.error(err)
}
    }
  return (
    <>
    <div onSubmit={handleSubmit}>
    <input type="text" 
    value={input}
    onChange={setInput} />
    <button type='submit'>Add </button>
    {datas.map((data,index)=>{
 <div key={data._id}>
       <p>{index+1}</p>
       <p>{data.title}</p>
        <p>{data.content}</p>
 <button onClick={handleEditTodo}>Edit</button>
 <button onClick={hanldeDeleteTodo}>Delete</button>
</div>

    })}
   </div>

    </>
  )
}

export default Crud