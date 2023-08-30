import axios from 'axios';


let API_BASE_URL = 'http://localhost:8000';
// let API_BASE_URL = 'cosmo-backend-api-b1c95546381e.herokuapp.com';

// Existing imports and code
// Existing imports and code
export const getUserTasks = async (userId) => {
    try {
        const res = await axios.get(`${API_BASE_URL}/api/tasks/get_tasks/${userId}`);
        if (res.data.success) {
            return { success: true, tasks: res.data.tasks };
        } else {
            return { success: false, error: "Failed to fetch tasks" };
        }
    } catch (error) {
        return { success: false, error: error.toString() };
    }
};


export const sendRequest = async (text) => axios.post(`${API_BASE_URL}/api/chat/request`, { prompt: text });