// Existing imports
import axios from 'axios';

let API_BASE_URL = 'https://cosmo-backend-api-b1c95546381e.herokuapp.com';

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


export const getCurrentUserTasks = async () => {
    try {
        const res = await axios.get(`${API_BASE_URL}/api/tasks/current_tasks`);
        console.log("res", res);
        if (res.data.success) {
            return { success: true, tasks: res.data.tasks };
        } else {
            return { success: false, error: "Failed to fetch tasks" };
        }
    } catch (error) {
        return { success: false, error: error.toString() };
    }
}


export const sendRequest = async (text) => axios.post(`${API_BASE_URL}/api/chat/request`, { prompt: text });

export const createTask = async (taskData) => {
    try {
        // Fetch the current user's details
        const userResponse = await axios.get(`${API_BASE_URL}/api/users/me`);
        const userId = userResponse.data.user_id;

        console.log("userResponse", userResponse)
        console.log("userId", userId);

        // Create a task for the current user
        return await axios.post(`${API_BASE_URL}/api/tasks/create_task/${userId}`, null, {
            params: taskData
        });
    } catch (error) {
        console.error("Error creating task:", error);
        throw error;
    }
};


export const updateUserTask = async (taskId, updatedData) => {
    return axios.put(`${API_BASE_URL}/api/tasks/update_task/${taskId}`, null, {
        params: updatedData
    });
};

export const deleteUserTask = async (taskId) => {
    return axios.delete(`${API_BASE_URL}/api/tasks/delete_task/${taskId}`);
};