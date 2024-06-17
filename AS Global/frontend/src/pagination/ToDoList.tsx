import React, { useState, useMemo } from 'react';

interface Task {
    id: number;
    task: string;
    completed: boolean;
    read: boolean;
}

const ToDoList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState<string>('');
    const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
    const [editedTaskText, setEditedTaskText] = useState<string>('');
    const [sortField, setSortField] = useState<string>('task');
    const [sortOrder, setSortOrder] = useState<string>('asc');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const tasksPerPage = 5;

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
        setEditedTaskText('');
    };

    const cancelEditing = () => {
        setEditingTaskId(null);
        setEditedTaskText('');
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

    const sortedTasks = useMemo(() => {
        return [...tasks].sort((a, b) => {
            if (sortField === 'task') {
                if (sortOrder === 'asc') {
                    return a.task.localeCompare(b.task);
                } else {
                    return b.task.localeCompare(a.task);
                }
            } else if (sortField === 'completed') {
                if (sortOrder === 'asc') {
                    return (a.completed === b.completed) ? 0 : a.completed ? 1 : -1;
                } else {
                    return (a.completed === b.completed) ? 0 : a.completed ? -1 : 1;
                }
            }
            return 0;
        });
    }, [tasks, sortField, sortOrder]);

    const currentTasks = sortedTasks.slice((currentPage - 1) * tasksPerPage, currentPage * tasksPerPage);

    const totalPages = Math.ceil(sortedTasks.length / tasksPerPage);

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
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
            <div>
                <select value={sortField} onChange={(e) => setSortField(e.target.value)}>
                    <option value="task">Task</option>
                    <option value="completed">Completed</option>
                </select>
                <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
                    Sort {sortOrder === 'asc' ? 'Descending' : 'Ascending'}
                </button>
            </div>
            <ul>
                {currentTasks.map((task) => (
                    <li key={task.id}>
                        {editingTaskId === task.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editedTaskText}
                                    onChange={(e) => setEditedTaskText(e.target.value)}
                                    autoFocus
                                />
                                <button onClick={() => saveEditedTask(task.id)}>Save</button>
                                <button onClick={cancelEditing}>Cancel</button>
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
                ))}
            </ul>
            <div>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button key={index + 1} onClick={() => paginate(index + 1)} disabled={currentPage === index + 1}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ToDoList;
