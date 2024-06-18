import React, { useReducer, useState } from 'react'

interface ToDo {
    id : number,
    text:string,
    completed:boolean
}
interface State {
todos:ToDo[],
searchQuery:string,
sortorder:'asc'|'desc',
currentPage:number,
todosPerPage:number

}
type Action =
    | {type:'add'; payload: string }
    | {type:'toggle'; payload: number }
    |{type:'delete'; payload: number }
    | {type: "edit";  payload:{id:number; text:string} }
    | {type: 'setSearchQuery'; payload:string}
    | {type:'setSortOrder' ; payload:'asc'|'desc'}
    | {type:'setCurrentpage' ; payload:number}

const initialState:State ={
todos:[],
searchQuery:'',
sortorder:'asc',
currentPage:1,
todosPerPage:5
}

const reducer = (state:State,action:Action):State =>{
    switch (action.type){
        case 'add':
            return {
                ...state,
                todos:[...state.todos,{ id : Date.now(), text: action.payload , completed:false}]
            };

           case 'toggle':
            return {
                ...state,
            todos:state.todos.map(todo=>todo.id===action.payload? { 
                ...todo , completed:!todo.completed 
            }:todo)
            }

            case 'delete':
                return {
                    ...state ,
                    todos:state.todos.filter(todo=>todo.id!==action.payload)
                }

                case 'edit':
                    return {
                        ...state,
                        todos:state.todos.map (todo=>todo.id==action.payload.id ? {...todo, text:action.payload.text}:todo)
                    }

                    case 'setSearchQuery':
                        return {
                            ...state,
                            searchQuery:action.payload,
                            currentPage:1
                        }

                        case 'setSortOrder':
                            return {
                                ...state , 
                                sortorder:action.payload
                            }

                            case 'setCurrentpage':
                                return {
                                    ...state,
                                    currentPage:action.payload
                                }
                                default:
                                    throw new Error('Unknown Action type')
                    }
        }
    

const Todo : React.FC = () => {
    const [state,dispatch ]= useReducer (reducer,initialState)
    const [inputText, setInputText]= useState<string>('')
    const [isEditing,setIsEditing]= useState<boolean>(false)
    const [currentTodo,setCurrentTodo]=useState<ToDo|null>(null)

    const handleAddTodo =()=>{
        if (inputText.trim()!==''){
            dispatch({type:'add',payload:inputText})
            setInputText('')
        }
        const handleUpdateTodo = () => {
            if (inputText.trim() !== '' && currentTodo) {
                dispatch({ type: 'edit', payload: { id: currentTodo.id, text: inputText } });
                setInputText('');
                setIsEditing(false);
                setCurrentTodo(null);
            }
        };
const handleEditTodo = (todo:ToDo)=>{
setInputText(todo.text)
setIsEditing(true)
setCurrentTodo(todo)
}

const filteredTodos = state.todos.filter(todo =>
    todo.text.toLowerCase().includes(state.searchQuery.toLowerCase())
);

   

    const sortedTodos = filteredTodos.sort((a,b)=>{
        if(state.sortorder=='asc'){
            return a.text.localeCompare(b.text)
        }else{
            return b.text.localeCompare(a.text)
        }
    })

const indexOfLastTodo = state.currentPage* state.todosPerPage;
const indexOfFirstTodo = indexOfLastTodo - state.todosPerPage;
const currentTodos = sortedTodos.slice(indexOfFirstTodo,indexOfLastTodo);
const totalPages = Math.ceil(sortedTodos.length/state.todosPerPage);

  return (
    <div> <h3> TOdo </h3>
<input type="text"
value={inputText} 
onChange={(e)=>setInputText(e.target.value)}
placeholder='Enter todo'/>
{
    isEditing? (
        <button onClick={handleUpdateTodo}>updateTodo  </button>
    ):(
        <button onClick={handleAddTodo}>Add todo</button>
    )
}
<div>
    <input type="text"
    placeholder='search todos ' 
    value={state.searchQuery}
    onChange={(e)=>dispatch({
        type:'setSearchQuery', payload:e.target.value
    })}/>
    <select
    value={state.sortorder}
 onChange={(e)=>dispatch({type:'setSortOrder',
    payload:e.target.value as 'asc' |'desc'
 })}
    >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
    </select>
</div>
<ul>
{
    currentTodos.map((todo)=>(
        <li key={todo.id} style={{textDecoration: todo.completed ? 'line-through' : 'none'}}>
            {todo.text}
            <button onClick={()=>handleEditTodo(todo)}>Edit</button>
            <button onClick={()=>dispatch({type:'delete',payload:todo.id})}>Delete</button>
        </li>
    ))
}
</ul>
<div>
    <button onClick={()=>dispatch({type:'setCurrentpage',payload:state.currentPage-1})} >previous</button>
    <span>{state.currentPage}of {totalPages}</span>
    <button 
    onClick={()=>dispatch({type:'setCurrentpage',payload:state.currentPage+1})}>
    next
    </button>
</div>
    </div>
  )
}

export default Todo