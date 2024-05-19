import React, { useState,useReducer } from 'react';
import { Button, Container, Form, ListGroup, ListGroupItem } from 'react-bootstrap';

function Todo() {
  
  // const [todos, setTodos] = useState([]);
  // const [newTodo, setNewTodo] = useState('');
  // const [editingTodoId, setEditingTodoId] = useState(null);
  // const [editingTodoText, setEditingTodoText] = useState('');

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), task: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const markCompleted = (id) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id) => {
    setEditingTodoId(id);
    setEditingTodoText(todos.find((todo) => todo.id === id).task); // Get existing task text
  };

  const saveEdit = (id) => {
    if (editingTodoText.trim()) {
      setTodos(
        todos.map((todo) => (todo.id === id ? { ...todo, task: editingTodoText } : todo))
      );
      setEditingTodoId(null);
      setEditingTodoText('');
    }
  };

  return (
    <Container className='m-5 '>
      <h1>Todo List</h1>
      <Form onSubmit={(e) => e.preventDefault(
        
      )}>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Add a new task"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <Button variant="primary" type="submit" className='m-2 mb-5' onClick={addTodo}>
            Add Task
          </Button>
        </Form.Group>
      </Form>
      <ListGroup>
        {todos.map((todo) => (
          <ListGroupItem key={todo.id} className="d-flex justify-content-between align-items-center">
            <Form.Check
              custom
              inline
              label={todo.completed ? <del>{todo.task}</del> : todo.task}
              checked={todo.completed}
              onChange={() => markCompleted(todo.id)}
            />
            <div className="d-flex p-2">
              {editingTodoId === todo.id ? (
                <div className="d-flex">
                  <Form.Control
                    type="text"
                    value={editingTodoText}
                    onChange={(e) => setEditingTodoText(e.target.value)}
                  />
                  <Button variant="success" size="sm" className='mx-2' onClick={() => saveEdit(todo.id)}>
                    Save
                  </Button>
                </div>
              ) : (
                <Button variant="success" size="sm" className='mx-2 ' onClick={() => editTodo(todo.id)}>
                  Edit
                </Button>
              )}
              <Button variant="danger" size="sm"  className='mx-2' onClick={() => removeTodo(todo.id)}>
                Remove
              </Button>
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
    </Container>
  );
}

export default Todo;
