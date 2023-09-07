import {useEffect, useState} from "react";
import {getUserTasks, sendRequest} from "./api";
import MessageDisplay from "./message/MessageDisplay";
import ToDoList from "./ToDoList";
import MessageInput from "./message/MessageInput";
import './App.css';


const userId = 2;

function App() {
    const [response, setResponse] = useState({ data: '', error: '' });
    const [isTasksLoading, setIsTasksLoading] = useState(false);  // Loading state for tasks
    const [isMessageLoading, setIsMessageLoading] = useState(false);  // Loading state for messages
    const [tasks, setTasks] = useState([]);
    const [taskError, setTaskError] = useState('');
    const [hasFetchedTasks, setHasFetchedTasks] = useState(false);

    const fetchTasks = async () => {
        setIsTasksLoading(true);  // Start loading tasks
        console.log("Fetching tasks");
        const res = await getUserTasks(userId);
        if (res.success) {
            setTasks(res.tasks);
        } else {
            setTaskError(res.error);
        }
        setIsTasksLoading(false);  // End loading tasks
    };

    const sendMessage = async (text) => {
        setIsMessageLoading(true);  // Start loading message
        try {
            const res = await sendRequest(text);
            setResponse({ data: res.data, error: '' });
        } catch (error) {
            setResponse({ data: '', error: error.toString() });
        } finally {
            setIsMessageLoading(false);  // End loading message
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetchTasks();
        };

        fetchData();
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <h1>Cosmo 🛸</h1>
            </header>
            <div className="blank-element"></div>
            <main className="App-main">
                <ToDoList tasks={tasks} error={taskError} refreshTasks={fetchTasks} isLoading={isTasksLoading} />
                <div className="message-display">
                    <MessageDisplay response={response} isLoading={isMessageLoading} />
                </div>
                <MessageInput sendMessage={sendMessage} refreshTasks={fetchTasks} />
            </main>
        </div>
    );
}

export default App;