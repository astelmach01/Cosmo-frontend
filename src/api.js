import axios from 'axios';

const API_BASE_URL = 'https://cosmo-backend-api-b1c95546381e.herokuapp.com';

export const sendRequest = async (text) => axios.post(`${API_BASE_URL}/api/chat/request`, { prompt: text });
