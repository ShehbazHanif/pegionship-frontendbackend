import axios from 'axios';

const BASE_URL = 'http://localhost:4000/api/v1'

export const loginUser = async (credentials) => {
    const response = await axios.post(`${BASE_URL}/auth/login`, credentials);
    return response.data;
};