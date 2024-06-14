// src/ToDoList.tsx

import React, { useState } from 'react';

interface Task {
    id: number;
    task: string;
    completed: boolean;
    read: boolean; // New property for marking task as read
}

const ToDoList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState<string>('');
    const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
    const [editedTaskText, setEditedTaskText] = useState<string>('');
    const [filterCompleted, setFilterCompleted] = useState<boolean>(false); // Added state for filtering completed tasks

    const addTask = () => {
        if (newTask.trim()) {
            setTasks([...tasks, { id: Date.now(), task: newTask, completed: false, read: false }]);
            setNewTask('');
        }
    };

    const startEditing = (id: number, taskText: string) => {
        setEditingTaskId(id);
        setEditedTaskText(taskText);
    };

    const saveEditedTask = (id: number) => {
        if (editedTaskText.trim()) {
            setTasks(
                tasks.map((task) =>
                    task.id === id ? { ...task, task: editedTaskText } : task
                )
            );
        }
        setEditingTaskId(null);
    };

    const deleteTask = (id: number) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    const toggleCompletion = (id: number) => {
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const toggleRead = (id: number) => {
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, read: !task.read } : task
            )
        );
    };

    const toggleCompletedFilter = () => {
        setFilterCompleted(!filterCompleted);
    };

    return (
        <div>
            <h1>To-Do List</h1>
            <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add new task"
            />
            <button onClick={addTask}>Add</button>
            <label>
                <input
                    type="checkbox"
                    checked={filterCompleted}
                    onChange={toggleCompletedFilter}
                />
                Show completed tasks
            </label>
            <ul>
                {tasks.map((task) => (
                    // Added conditional rendering to show completed tasks based on filterCompleted state
                    (!filterCompleted || task.completed) && (
                        <li key={task.id}>
                            {editingTaskId === task.id ? (
                                <>
                                    <input
                                        type="text"
                                        value={editedTaskText}
                                        onChange={(e) => setEditedTaskText(e.target.value)}
                                        onBlur={() => saveEditedTask(task.id)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                saveEditedTask(task.id);
                                            }
                                        }}
                                        autoFocus
                                    />
                                    <button onClick={() => saveEditedTask(task.id)}>Save</button>
                                </>
                            ) : (
                                <>
                                    <span
                                        style={{
                                            textDecoration: task.completed ? 'line-through' : 'none',
                                            fontWeight: task.read ? 'normal' : 'bold'
                                        }}
                                        onClick={() => toggleCompletion(task.id)}
                                    >
                                        {task.task}
                                    </span>
                                    <button onClick={() => startEditing(task.id, task.task)}>Edit</button>
                                </>
                            )}
                            <button onClick={() => toggleRead(task.id)}>
                                {task.read ? 'Unread' : 'Mark as Read'}
                            </button>
                            <button onClick={() => deleteTask(task.id)}>Delete</button>
                        </li>
                    )
                ))}
            </ul>
        </div>
    );
};

export default ToDoList;
