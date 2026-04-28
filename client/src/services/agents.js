import axios from 'axios';

const BASE_URL = 'http://localhost:4000/api/v1'

export const createAgent = async (agentData) => {
    const response = await axios.post(`${BASE_URL}/agent/create`, agentData);
    return response.data;
};

export const updateAgent = async (id, agentData) => {
    const response = await axios.patch(`${BASE_URL}/agent/update/${id}`, agentData);
    return response.data;
};

export const deleteAgent = async (id) => {
    const response = await axios.delete(`${BASE_URL}/agent/delete/${id}`);
    return response.data;
};

export const fetchAgents = async (page = 1, limit = 10) => {
    const response = await axios.get(`${BASE_URL}/agent/getAllAgents`, {
        params: { page, limit },
    });
    return response.data;
};

export const fetchAgentById = async (id) => {
    const response = await axios.get(`${BASE_URL}/agent/getAgent/${id}`);
    return response.data;
};
