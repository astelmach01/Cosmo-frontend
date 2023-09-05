// Existing imports
import axios from 'axios';
let API_BASE_URL = 'https://cosmo-backend-api-b1c95546381e.herokuapp.com';

axios.interceptors.request.use((config) => {
    config.url = `${config.url}?_=${new Date().getTime()}`;
    return config;
});

export const getUserTasks = async (userId) => {
    try {
        const res = await axios.get(`${API_BASE_URL}/api/tasks/get_user_tasks/${userId}`);
        console.log("res", res);
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

export const createTask = async (userId, taskData) => {
    return axios.post(`${API_BASE_URL}/api/tasks/create_task/${userId}`, null, {
        params: taskData
    });
};

export const updateUserTask = async (taskId, updatedData) => {
    return axios.put(`${API_BASE_URL}/api/tasks/update_task/${taskId}`, null, {
        params: updatedData
    });
};

export const deleteUserTask = async (taskId) => {
    return axios.delete(`${API_BASE_URL}/api/tasks/delete_task/${taskId}`);
};