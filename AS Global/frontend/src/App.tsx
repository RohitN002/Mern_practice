
import ToDoList from './CRUD/Todo'
import ToDo from './CRUD/Todo'
import TodoApp from './Reducer/Todo'

const App = () => {
  return (
    <div>
        <ToDo/>
        <ToDoList/>
        <TodoApp/>
    </div>
  )
}

export default App