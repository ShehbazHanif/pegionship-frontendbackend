import axios from 'axios';

const BASE_URL = 'http://localhost:4000/api/v1';

export const createCampaign = async (campaignData) => {
    const response = await axios.post(`${BASE_URL}/campaign/create`, campaignData);
    return response.data;
};

export const updateCampaign = async (id, campaignData) => {
    const response = await axios.patch(`${BASE_URL}/campaign/update/${id}`, campaignData);
    return response.data;
};

export const deleteCampaign = async (id) => {
    const response = await axios.delete(`${BASE_URL}/campaign/delete/${id}`);
    return response.data;
};

export const fetchCampaigns = async () => {
    const response = await axios.get(`${BASE_URL}/campaign/getAllCampaigns`);
    return response.data;
};

export const fetchCampaignById = async (id) => {
    const response = await axios.get(`${BASE_URL}/campaign/getCampaign/${id}`);
    return response.data;
};
