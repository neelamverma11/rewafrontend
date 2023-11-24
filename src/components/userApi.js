import axios from 'axios';

const baseUrl = 'http://localhost:3000/api'

const userApi = {
    createUser: async (userData) => {
        try {
            const response = await axios.post(`${baseUrl}/create-account`, userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getUserById: async (userId) => {
        try {
            const response = await axios.get(`${baseUrl}/dashboard/${userId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getUsers: async () => {
        try {
            const response = await axios.get(`${baseUrl}/dashboard`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateUser: async (userId, updatedData) => {
        try {
            const response = await axios.put(`${baseUrl}/dashboard/${userId}`, updatedData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    loginUser: async (credentials) => {
        try {
            const response = await axios.post(`${baseUrl}/login`, credentials);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateUserProfile: async (userId, updatedProfileData) => {
        try {
            const response = await axios.put(`${baseUrl}/edit-profile/${userId}`, updatedProfileData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateUserPassword: async (userId, newPasswordData, accessToken) => {
        try {
            if (!newPasswordData || !('oldPassword' in newPasswordData) || !('newPassword' in newPasswordData) || !('confirmPassword' in newPasswordData)) {
                throw new Error('Invalid newPasswordData object or missing required properties');
            }
            const { oldPassword, newPassword, confirmPassword } = newPasswordData;
            const response = await axios.put(`${baseUrl}/change-password/${userId}`, {
                oldPassword,
                newPassword,
                confirmPassword
            }, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },



};

export default userApi;
