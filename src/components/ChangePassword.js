import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Box } from '@mui/material';
import userApi from './userApi';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
    const navigate = useNavigate()
    const currentUser = JSON.parse(localStorage.getItem('userDetail'));
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        const userId = currentUser?.user?.id
        const newPasswordData = {
            oldPassword: oldPassword,
            newPassword: newPassword,
            confirmPassword: confirmNewPassword,
        };
        const accessToken = currentUser.accessToken

        if (newPassword !== confirmNewPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await userApi.updateUserPassword(userId, newPasswordData, accessToken);
            console.log(response)
            if (response && response.status == 200) {
                setSuccessMessage('Password updated successfully!');
                navigate('/dashboard');
            } else {
                setError('Failed to update password');
            }
        } catch (error) {
            console.error(error);
            setError('Error changing password. Please try again.');
        }
    };

    return (
        <Grid container justifyContent="center" mt={15}>
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <Box p={3} boxShadow={2} borderRadius={2}>
                    <Typography variant="h5" gutterBottom>
                        Change Password
                    </Typography>
                    {error && <Typography color="error">{error}</Typography>}
                    {successMessage && (
                        <Typography color="success">{successMessage}</Typography>
                    )}
                    <form onSubmit={handlePasswordChange}>
                        <TextField
                            label="Old Password"
                            type="password"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                        <TextField
                            label="New Password"
                            type="password"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <TextField
                            label="Confirm New Password"
                            type="password"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Change Password
                        </Button>
                    </form>
                </Box>
            </Grid>
        </Grid>
    );
};

export default ChangePassword;
