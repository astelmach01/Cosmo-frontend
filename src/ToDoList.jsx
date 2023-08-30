import React from 'react';
import './ToDoList.css';  // Import the CSS

function ToDoList({ tasks, error }) {
    return (
        <div className="todo-list">
            <h2>Your Tasks</h2>
            {error && <div className="error">{error}</div>}
            <ul>
                {tasks.map((task, index) => (
                    <li key={index} className="todo-item">
                        <span className="task">{task.task}</span>
                        <span className="date">{task.date}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ToDoList;