import { useState } from "react";
import axios from 'axios';
import { getCurrentUserTasks, sendRequest } from "./api";
import MessageDisplay from "./message/MessageDisplay";
import ToDoList from "./ToDoList";
import MessageInput from "./message/MessageInput";
import './App.css';

const API_BASE_URL = 'https://cosmo-backend-api-b1c95546381e.herokuapp.com';

function App() {
    const [response, setResponse] = useState({ data: '', error: '' });
    const [isTasksLoading, setIsTasksLoading] = useState(false);
    const [isMessageLoading, setIsMessageLoading] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [taskError, setTaskError] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [signupUsername, setSignupUsername] = useState('');
    const [signupPassword, setSignupPassword] = useState('');


    const handleLogin = async () => {
        try {
            const formData = new URLSearchParams();
            formData.append('username', username);
            formData.append('password', password);

            const response = await axios.post(`${API_BASE_URL}/api/auth/token`, formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            const accessToken = response.data.access_token;
            // Store the access token securely, e.g., in a state, cookie, or local storage
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

            console.log("Login successful");

            await fetchTasks();
        } catch (error) {
            console.log(error);
            console.error("Error during login:", error);
        }
    };


    const handleSignup = async () => {
        try {
            const params = {
                username: signupUsername,
                password: signupPassword
        }
            const response = await axios.post(`${API_BASE_URL}/api/users/create_user`, null, {
                params: params
            });
        if (response.data.success) {
            // Handle successful sign-up, e.g., redirect to login or show a success message
            console.log("Signup successful");
        } else {
            // Handle sign-up error, e.g., show an error message
            console.error(response.data.reason);
        }
    } catch (error) {
        console.log(error)
    }
    };


    const fetchTasks = async () => {
        setIsTasksLoading(true);
        console.log("Fetching tasks");
        const res = await getCurrentUserTasks();
        if (res.success) {
            setTasks(res.tasks);
        } else {
            setTaskError(res.error);
        }
        setIsTasksLoading(false);
    };

    const sendMessage = async (text) => {
        setIsMessageLoading(true);
        try {
            const res = await sendRequest(text);
            setResponse({ data: res.data, error: '' });
        } catch (error) {
            setResponse({ data: '', error: error.toString() });
        } finally {
            setIsMessageLoading(false);
        }
    };

    // useEffect(() => {
    //     const fetchData = async () => {
    //         await fetchTasks();
    //     };
    //
    //     fetchData();
    // }, []);

return (
    <div className="App">
        <header className="App-header">
            <h1>Cosmo 🛸</h1>
        </header>
        <div className="blank-element"></div>
        <main className="App-main">
            <div className="forms-container">
                {/* Login Form */}
                <div className="form-section">
                    <input type="text" className="login-input" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
                    <input type="password" className="login-input" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
                    <button className="login-button" onClick={handleLogin}>Login</button>
                </div>

                {/* Sign-up Form */}
                <div className="form-section">
                    <input type="text" className="login-input" value={signupUsername} onChange={e => setSignupUsername(e.target.value)} placeholder="Signup Username" />
                    <input type="password" className="login-input" value={signupPassword} onChange={e => setSignupPassword(e.target.value)} placeholder="Signup Password" />
                    <button className="login-button" onClick={handleSignup}>Sign Up</button>
                </div>
            </div>

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