import React, { useState } from 'react';
import './ToDoList.css';
import { updateUserTask, deleteUserTask } from './api';

function ToDoList({ tasks, error, refreshTasks }) {
    const [updatedTask, setUpdatedTask] = useState('');
    const [updatedDate, setUpdatedDate] = useState('');

    const handleDelete = async (taskId) => {
        try {
            await deleteUserTask(taskId);
            refreshTasks();
        } catch (err) {
            console.error(err);
        }
    };

    const handleUpdate = async (taskId) => {
        try {
            const payload = {
                task_id: taskId,
                description: updatedTask
            }
            if (updatedDate) {
                payload.date = updatedDate;
            }
            console.log("Sending payload", payload);
            await updateUserTask(taskId, payload);
            refreshTasks();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="todo-list">
            <h2>Your Tasks</h2>
            {error && <div className="error">{error}</div>}
            <ul>
                {tasks.map((task, index) => (
                    <li key={index} className="todo-item">
                        <span className="task">{task.task}</span>
                        <span className="date">{task.date}</span>
                        <button onClick={() => handleDelete(task.id)}>Delete</button>
                        <input type="text" placeholder="New Task" onChange={(e) => setUpdatedTask(e.target.value)} />
                        <input type="text" placeholder="New Date" onChange={(e) => setUpdatedDate(e.target.value)} />
                        <button onClick={() => handleUpdate(task.id)}>Update</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ToDoList;