import React, { useState } from 'react'
interface todos {
    text:string,
    id:number,
    isCompleted:boolean,
    isEdited:boolean,

}
const Todo:React.FC = () => {
    const [data,setData]=useState<string>('')
const [todos,setTodos]=useState<todos[]>([])
    const [loading,setLoading]=useState<boolean>(false)

    const handleAddTodo =()=>{
         if(data.trim()==='') return;
         
         const NewTodo:todos = {
            text:data,
            id:Date.now(),
            isCompleted:false,
            isEdited:false
         }
         setTodos([...todos,NewTodo])
    }
  return (
    <div>
    
        <h3>TO DO </h3>

        <input type="text" 
        placeholder='Enter todo details'
        value={data}
        onChange={(e)=>setData(e.target.value)}/>
        <button onClick={handleAddTodo}>Add todo</button>
        {todos.map(todo=>(
            <ul key={todo.id}>

                <li> </li>
            </ul>
        ))}
    </div>
  )
}

export default Todo