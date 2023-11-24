import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography, Box, Avatar } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import userApi from './userApi';

const EditProfile = () => {
    const { id } = useParams()
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        // profilePicture: null,
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleInputChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await userApi.updateUserProfile(id, userData);
            if (response && response.status == 200) {
                setSuccessMessage('Profile updated successfully!');
                navigate('/dashboard');
            } else {
                setError('Failed to update profile');
            }
        } catch (error) {
            console.error(error);
            setError('Error updating profile. Please try again.');
        }
    };

    // previous data
    const fetchUserProfile = async () => {
        try {
            const response = await userApi.getUserById(id,);
            if (response && response.status == 200) {
                setUserData(response.user)
            }
        } catch (error) {
            console.error(error);
            setError('Error fetching user profile data');
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    // const handleProfilePictureChange = (e) => {
    //     // Handle profile picture change here (similar to the previous example)
    //     const file = e.target.files[0];
    //     // Your code for handling the profile picture change
    // };

    return (
        <Grid container justifyContent="center" mt={10}>
            <Grid item xs={12} sm={6} md={4}>
                <Box p={3} boxShadow={2} borderRadius={2}>
                    <Typography variant="h5" gutterBottom>
                        Edit Profile
                    </Typography>
                    {error && <Typography color="error">{error}</Typography>}
                    {successMessage && (
                        <Typography color="success">{successMessage}</Typography>
                    )}
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="First Name"
                            name="firstName"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            value={userData.firstName}
                            onChange={handleInputChange}
                        />
                        <TextField
                            label="Last Name"
                            name="lastName"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            value={userData.lastName}
                            onChange={handleInputChange}
                        />
                        <TextField
                            label="Email Address"
                            name="email"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            value={userData.email}
                            onChange={handleInputChange}
                        />
                        <TextField
                            label="Phone"
                            name="phone"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            value={userData.phone}
                            onChange={handleInputChange}
                        />
                        <TextField
                            type="file"
                            accept="image/*"
                            // onChange='{handleProfilePictureChange}'
                            style={{ margin: '20px 0' }}
                        />
                        {userData.profilePicture && (
                            <Avatar
                                alt="Profile Picture"
                                src='{userData.profilePicture}'
                                sx={{ width: 100, height: 100 }}
                            />
                        )}
                        <Button type="submit" variant="contained" color="primary" onClick={handleSubmit} fullWidth>
                            Update Profile
                        </Button>
                    </form>
                </Box>
            </Grid>
        </Grid>
    );
};

export default EditProfile;
