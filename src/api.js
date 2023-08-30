import axios from 'axios';


let API_BASE_URL = 'http://localhost:8000';
// let API_BASE_URL = 'cosmo-backend-api-b1c95546381e.herokuapp.com';
export const sendRequest = async (text) => axios.post(`${API_BASE_URL}/api/chat/request`, { prompt: text });