import React from 'react';
import './ToDoList.css';  // Import the new CSS file

const ToDoList = ({ tasks, error }) => {
    return (
        <div className="todo-list">
            <h2 className="todo-title">ToDo List</h2>
            {error && <p className="todo-error">Error: {error}</p>}
            <ul className="todo-items">
                {tasks.map((task, index) => (
                    <li key={index} className="todo-item">
                        <span className="todo-task">{task.task}</span>:
                        <span className="todo-date">{task.date}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ToDoList;