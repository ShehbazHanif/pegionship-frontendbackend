import axios from 'axios';

const BASE_URL = 'http://localhost:4000/api/v1'

export const addContact = async (credentials) => {
    const response = await axios.post(`${BASE_URL}/contact/create`, credentials);
    return response.data;
};

export const updateContact = async (id, credentials) => {
    const response = await axios.patch(`${BASE_URL}/contact/update/${id}`, credentials);
    return response.data;
};

export const deleteContact = async (id) => {
    const response = await axios.delete(`${BASE_URL}/contact/delete/${id}`);
    return response.data;
};

export const fetchContacts = async (page = 1, limit = 5) => {
    const response = await axios.get(`${BASE_URL}/contact/getALLContacts`, {
        params: { page, limit },
    });
    return response.data;
};