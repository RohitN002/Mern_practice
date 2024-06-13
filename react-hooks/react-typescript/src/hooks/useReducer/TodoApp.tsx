// src/TodoApp.tsx
import React, { useReducer, useState } from 'react';
import { initialState, reducer, Todo } from './TodoReducer';

const TodoApp: React.FC = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [inputValue, setInputValue] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);

    const handleAddTodo = () => {
        if (inputValue.trim() !== '') {
            dispatch({ type: 'add', payload: inputValue });
            setInputValue('');
        }
    };

    const handleEditTodo = (todo: Todo) => {
        setInputValue(todo.text);
        setIsEditing(true);
        setCurrentTodo(todo);
    };

    const handleUpdateTodo = () => {
        if (inputValue.trim() !== '' && currentTodo) {
            dispatch({ type: 'edit', payload: { id: currentTodo.id, text: inputValue } });
            setInputValue('');
            setIsEditing(false);
            setCurrentTodo(null);
        }
    };

    const filteredTodos = state.todos.filter(todo =>
        todo.text.toLowerCase().includes(state.searchQuery.toLowerCase())
    );

    const sortedTodos = filteredTodos.sort((a, b) => {
        if (state.sortOrder === 'asc') {
            return a.text.localeCompare(b.text);
        } else {
            return b.text.localeCompare(a.text);
        }
    });

    const indexOfLastTodo = state.currentPage * state.todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - state.todosPerPage;
    const currentTodos = sortedTodos.slice(indexOfFirstTodo, indexOfLastTodo);

    const totalPages = Math.ceil(sortedTodos.length / state.todosPerPage);

    return (
        <div>
            <h1>Todo App</h1>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter a new todo"
            />
            {isEditing ? (
                <button onClick={handleUpdateTodo}>Update Todo</button>
            ) : (
                <button onClick={handleAddTodo}>Add Todo</button>
            )}
            <div>
                <input
                    type="text"
                    placeholder="Search todos"
                    value={state.searchQuery}
                    onChange={(e) => dispatch({ type: 'setSearchQuery', payload: e.target.value })}
                />
                <select
                    value={state.sortOrder}
                    onChange={(e) => dispatch({ type: 'setSortOrder', payload: e.target.value as 'asc' | 'desc' })}
                >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>
            <ul>
                
                {currentTodos.map((todo) => (
                    <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                        {todo.text}
                        <button onClick={() => dispatch({ type: 'toggle', payload: todo.id })}>
                            {todo.completed ? 'Undo' : 'Complete'}
                        </button>
                        <button onClick={() => handleEditTodo(todo)}>Edit</button>
                        <button onClick={() => dispatch({ type: 'delete', payload: todo.id })}>Delete</button>
                    </li>
                ))}
            </ul>
            <div>
                <button
                    onClick={() => dispatch({ type: 'setCurrentPage', payload: state.currentPage - 1 })}
                    disabled={state.currentPage === 1}
                >
                    Previous
                </button>
                <span>{state.currentPage} of {totalPages}</span>
                <button
                    onClick={() => dispatch({ type: 'setCurrentPage', payload: state.currentPage + 1 })}
                    disabled={state.currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default TodoApp;
