// Inside your React component (e.g., TaskManager.js)

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '' });

  useEffect(() => {
    // Fetch tasks from the backend API
    axios.get('http://localhost:3000/api/tasks')
      .then((response) => setTasks(response.data))
      .catch((error) => console.error('Error fetching tasks:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const createTask = () => {
    axios.post('http://localhost:3000/api/tasks', formData)
      .then((response) => {
        setTasks([...tasks, response.data]);
        setFormData({ title: '', description: '' }); // Clear form
      })
      .catch((error) => console.error('Error creating task:', error));
  };

  const editTask = (taskId) => {
    // Implement logic to edit a task (similar to createTask)
    // You'll need to fetch the task details and show them in a modal or form
    axios.post(`http://localhost:3000/api/tasks/${taskId}`)
    .then((response) => {
      setTasks([...tasks, response.data]);
      setFormData({ title: '', description: '' }); // Clear form
    })
    .catch((error) => console.error('Error creating task:', error));
};
  

  const deleteTask = (taskId) => {
    axios.delete(`http://localhost:3000/api/tasks/${taskId}`)
      .then(() => {
        setTasks(tasks.filter((task) => task._id !== taskId));
      })
      .catch((error) => console.error('Error deleting task:', error));
  };

  return (
    <div>
      {/* Display tasks */}
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title} - {task.description}
            <button onClick={() => editTask(task._id)}>Edit</button>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Create task form */}
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        placeholder="Task title"
      />
      <input
        type="text"
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        placeholder="Task description"
      />
      <button onClick={createTask}>Create</button>
    </div>
  );

}

export default TaskManager;
