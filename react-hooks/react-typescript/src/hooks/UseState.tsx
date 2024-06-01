import { useState } from "react"

interface countVal{
count:number,
incCount:number,
decCount:number
}

interface Todo {
    id: number;
    text: string;
    isCompleted: boolean;
    isEditing: boolean;
  }
  
const UseState = () => {
    const [count,setCount]=useState<countVal>({
count:0,
incCount:1,
decCount:1
})
const [todos, setTodos] = useState<Todo[]>([]);
  const [todoText, setTodoText] = useState<string>('');


const handleIncrement =()=>{
    setCount((prevState)=>({
...prevState,
count:prevState.count+prevState.incCount
    }))
}

const handleDecrement =()=>{
    setCount((prevState)=>({
...prevState,
count:prevState.count-prevState.decCount
    }))
}



const addTodo = () => {
    if (todoText.trim() === '') return;

    const newTodo: Todo = {
      id: Date.now(),
      text: todoText,
      isCompleted: false,
      isEditing: false,
    };

    setTodos([...todos, newTodo]);
    setTodoText('');
  };

  const toggleComplete = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    ));
  };

  const editTodo = (id: number, text: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text, isEditing: false } : todo
    ));
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startEditing = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, isEditing: true } : todo
    ));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, id: number) => {
    if (e.key === 'Enter') {
      const text = (e.target as HTMLInputElement).value;
      editTodo(id, text);
    }
  };
  return (
    <div>

        <h1>useState</h1>
        <div>
            <h1>Counter</h1>
<div>{count.count}</div>
<button onClick={handleIncrement}>Increment</button>
<button onClick={handleDecrement}>Decrement</button>
        </div>
        {/* TODO */}
        <div className="App">
      <h1>Todo App</h1>
      <input
        type="text"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        placeholder="Add a new todo"
      />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.isEditing ? (
              <>
                <input
                  type="text"
                  defaultValue={todo.text}
                  onBlur={(e) => editTodo(todo.id, e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, todo.id)}
                />
                <button onClick={() => toggleComplete(todo.id)}>
                  {todo.isCompleted ? 'Undo' : 'Complete'}
                </button>
              </>
            ) : (
              <>
                <span
                  style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }}
                  onDoubleClick={() => startEditing(todo.id)}
                >
                  {todo.text}
                </span>
                <button onClick={() => toggleComplete(todo.id)}>
                  {todo.isCompleted ? 'Undo' : 'Complete'}
                </button>
                <button onClick={() => startEditing(todo.id)}>Edit</button>
                <button onClick={() => removeTodo(todo.id)}>Remove</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
    </div>
  )
}


export default UseState