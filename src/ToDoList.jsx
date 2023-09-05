import React, { useState } from 'react';
import './ToDoList.css';
import {updateUserTask, deleteUserTask, createTask} from './api';

const userId = 2;

function ToDoList({ tasks, error, refreshTasks }) {
    const [updatedTask, setUpdatedTask] = useState('');
    const [updatedDate, setUpdatedDate] = useState('');
    const [newTask, setNewTask] = useState('');
    const [newDate, setNewDate] = useState('');



    const handleDelete = async (taskId) => {
        try {
            await deleteUserTask(taskId);
            console.log("refreshing tasks from handleDelete");
            await refreshTasks();
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
            const res = await updateUserTask(taskId, payload);
            console.log("refreshing tasks from handleUpdate with response", res);
            await refreshTasks();
        } catch (err) {
            console.error(err);
        }
    };

    const handleCreate = async () => {
        try {
            const payload = {
                description: newTask,
                date: newDate
            };
            console.log("Sending payload", payload);
            await createTask(userId, payload);  // Replace with your actual API call
            console.log("refreshing tasks from handleCreate");
            await refreshTasks();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="todo-list">
            <h2>Your Tasks</h2>
            {error && <div className="error">{error}</div>}
            <div>
                <input className="todo-input" type="text" placeholder="New Task" onChange={(e) => setNewTask(e.target.value)} />
                <input className="todo-input" type="text" placeholder="New Date" onChange={(e) => setNewDate(e.target.value)} />
            </div>
            <button className="todo-button create-button" onClick={handleCreate}>Create</button>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index} className="todo-item">
                        <span className="task">{task.task}</span>
                        <span className="date">{task.date}</span>
                        <button className="todo-button delete-button" onClick={() => handleDelete(task.id)}>Delete</button>
                        <input className="todo-input" type="text" placeholder="New Task" onChange={(e) => setUpdatedTask(e.target.value)} />
                        <input className="todo-input" type="text" placeholder="New Date" onChange={(e) => setUpdatedDate(e.target.value)} />
                        <button className="todo-button update-button" onClick={() => handleUpdate(task.id)}>Update</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ToDoList;