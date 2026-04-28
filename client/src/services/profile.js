import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api/v1";

export const getProfile = async () => {
    try {
        const token = localStorage.getItem("token");
        console.log("Fetching profile with token:", token);
        const response = await axios.get(`${API_BASE_URL}/auth/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const updateProfile = async (data) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.put(`${API_BASE_URL}/auth/profile`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};
