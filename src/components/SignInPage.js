import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import userApi from './userApi';
import { CssBaseline, Avatar, Button, TextField, Grid, Box, Typography, Container, Modal } from '@mui/material';

const defaultTheme = createTheme();
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const SignIn = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [openModal, setOpenModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const handleModalClose = () => {
        setOpenModal(false);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await userApi.loginUser(formData);

            if (response.status === 200) {
                localStorage.setItem("userDetail", JSON.stringify(response));
                navigate('/dashboard');
            } else {
                setModalMessage('Wrong Credentials.');
                setOpenModal(true);
            }
        } catch (error) {
            console.error(error);
            setModalMessage('Error occurred during login.');
            setOpenModal(true);
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 14,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>

                    <Box p={3} boxShadow={2} borderRadius={2}>
                        <Typography variant="h5" gutterBottom>
                            Sign in
                        </Typography>
                        <form onSubmit={handleLogin}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoFocus
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                disabled={!formData.email || !formData.password}
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                        </form>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                    <Modal
                        open={openModal}
                        onClose={handleModalClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                {modalMessage}
                            </Typography>
                            <Button onClick={handleModalClose} color="primary">
                                Close
                            </Button>
                        </Box>
                    </Modal>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default SignIn;
