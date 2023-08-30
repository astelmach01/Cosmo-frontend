import React, { useState, useEffect } from 'react';
import './App.css';
import MessageDisplay from './message/MessageDisplay';
import MessageInput from './message/MessageInput';
import ToDoList from './ToDoList';  // Import the ToDoList component
import { sendRequest, getUserTasks } from './api';

const userId = "Andrew Stelmach"

function App() {
    const [response, setResponse] = useState({ data: '', error: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);
    const [taskError, setTaskError] = useState('');
    const [hasFetchedTasks, setHasFetchedTasks] = useState(false);


    const fetchTasks = async () => {
        const res = await getUserTasks(userId);
        if (res.success) {
            setTasks(res.tasks);
            localStorage.setItem('tasks', JSON.stringify(res.tasks));
        } else {
            setTaskError(res.error);
        }
    };

    const sendMessage = async (text) => {
        setIsLoading(true);
        try {
            const res = await sendRequest(text);
            setResponse({ data: res.data, error: '' });
        } catch (error) {
            setResponse({ data: '', error: error.toString() });
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        if (!hasFetchedTasks) {
            fetchTasks().then(r => console.log(r));
            setHasFetchedTasks(true);
        }
    }, [hasFetchedTasks]);

    return (
        <div className="App">
            <header className="App-header">
                <h1>Cosmo 🛸</h1>
            </header>
            <div className="blank-element"></div>
            <main className="App-main">
                <ToDoList tasks={tasks} error={taskError} />
                <div className="message-display">
                    <MessageDisplay response={response} isLoading={isLoading} />
                </div>
                <MessageInput sendMessage={sendMessage} refreshTasks={fetchTasks} />
            </main>
        </div>
    );
}

export default App;