import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // URL de base de votre API

const loginUser = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/signin`, {
            username: username,
            password: password,
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
export default loginUser

export const importUserData = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token not found');
        }
        const response = await axios.get(`${API_URL}/auth/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('User data received:', response.data);
        return response.data.result;
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
};



const addPlayer = async (formData) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token not found');
        }

        const response = await axios.post(`${API_URL}/player`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('Player added:', response.data);
        return response.data;

    } catch (error) {
        console.error('Error adding player:', error);
        console.log('Error details:', error.response.data);
        console.log('Status code:', error.response.status);
        throw error;
    }
};
const deletePlayer = async (playerId) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token not found');
        }
        await axios.delete(`${API_URL}/player/${playerId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('Player deleted successfully');
    } catch (error) {
        console.error('Error deleting player:', error);
        throw error;
    }
};

const updatePlayer = async (playerId, formData) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token not found');
        }
        const response = await axios.put(`${API_URL}/player/${playerId}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('Player updated successfully');
        return response.data;
    } catch (error) {
        console.error('Error updating player:', error);
        throw error;
    }
};

const fetchPlayerDetails = async (playerId) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token not found');
        }
        const response = await axios.get(`${API_URL}/player/${playerId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching player details:', error);
        throw error;
    }
};   
