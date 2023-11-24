import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import userApi from './userApi';
import { CssBaseline, Avatar, Button, TextField, Grid, Box, Typography, Container, Modal } from '@mui/material';

const defaultTheme = createTheme();
const style = {
    formContainer: {
        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.5)',
        padding: '20px',
        borderRadius: '10px',
        backgroundColor: '#fff',
    },
    modalBox: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    },
    textField: {
        marginBottom: '15px',
    },
};

const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await userApi.createUser(formData);
            if (response.status === 200) {
                localStorage.setItem("userDetail", JSON.stringify(response));
                navigate('/dashboard');
            }
        } catch (error) {
            setModalMessage('Failed to register. User Already exists');
            setOpenModal(true);
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Box sx={style.formContainer}>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                value={formData.firstName}
                                onChange={handleChange}
                                variant="outlined"
                                sx={style.textField}
                            />
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                variant="outlined"
                                sx={style.textField}
                            />
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                variant="outlined"
                                sx={style.textField}
                            />
                            <TextField
                                required
                                fullWidth
                                id="phone"
                                label="Phone Number"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                variant="outlined"
                                sx={style.textField}
                            />
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                variant="outlined"
                                sx={style.textField}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                onClick={handleSubmit}
                                disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.password}
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>
                        </form>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to="/login" variant="body2">
                                    {"Already have an account? Sign In"}
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
                        <Box sx={style.modalBox}>
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
        </ThemeProvider >
    );
};

export default SignUp;



// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import userApi from './userApi';
// import { CssBaseline, Avatar, Button, TextField, Grid, Box, Typography, Container, Modal } from '@mui/material';

// const defaultTheme = createTheme();
// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
// };

// const SignUp = () => {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         firstName: '',
//         lastName: '',
//         email: '',
//         phone: '',
//         password: ''
//     });
//     const [openModal, setOpenModal] = useState(false);
//     const [modalMessage, setModalMessage] = useState('');

//     const handleModalClose = () => {
//         setOpenModal(false);
//     };

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             const response = await userApi.createUser(formData);
//             if (response.status === 200) {
//                 localStorage.setItem("userDetail", JSON.stringify(response));
//                 navigate('/dashboard');
//             }
//         } catch (error) {
//             setModalMessage('Failed to register. User Already exists');
//             setOpenModal(true);
//         }
//     };

//     return (
//         <ThemeProvider theme={defaultTheme}>
//             <Container component="main" maxWidth="xs">
//                 <CssBaseline />
//                 <Box
//                     sx={{
//                         marginTop: 8,
//                         display: 'flex',
//                         flexDirection: 'column',
//                         alignItems: 'center',
//                     }}
//                 >
//                     <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//                         <LockOutlinedIcon />
//                     </Avatar>
//                     <Typography component="h1" variant="h5">
//                         Sign up
//                     </Typography>
//                     <Box component="form" noValidate sx={{ mt: 3 }}>
//                         <TextField
//                             name="firstName"
//                             required
//                             fullWidth
//                             id="firstName"
//                             label="First Name"
//                             autoFocus
//                             value={formData.firstName}
//                             onChange={handleChange}
//                         />
//                         <TextField
//                             required
//                             fullWidth
//                             id="lastName"
//                             label="Last Name"
//                             name="lastName"
//                             value={formData.lastName}
//                             onChange={handleChange}
//                         />
//                         <TextField
//                             required
//                             fullWidth
//                             id="email"
//                             label="Email Address"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                         />
//                         <TextField
//                             required
//                             fullWidth
//                             id="phone"
//                             label="Phone Number"
//                             name="phone"
//                             value={formData.phone}
//                             onChange={handleChange}
//                         />
//                         <TextField
//                             required
//                             fullWidth
//                             name="password"
//                             label="Password"
//                             type="password"
//                             id="password"
//                             value={formData.password}
//                             onChange={handleChange}
//                         />
//                         <Button
//                             type="submit"
//                             fullWidth
//                             variant="contained"
//                             onClick={handleSubmit}
//                             disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.password}
//                             sx={{ mt: 3, mb: 2 }}
//                         >
//                             Sign Up
//                         </Button>
//                         <Grid container justifyContent="flex-end">
//                             <Grid item>
//                                 <Link to="/login" variant="body2">
//                                     {"Already have an account? Sign In"}
//                                 </Link>
//                             </Grid>
//                         </Grid>
//                     </Box>
//                     <Modal
//                         open={openModal}
//                         onClose={handleModalClose}
//                         aria-labelledby="modal-modal-title"
//                         aria-describedby="modal-modal-description"
//                     >
//                         <Box sx={style}>
//                             <Typography id="modal-modal-title" variant="h6" component="h2">
//                                 {modalMessage}
//                             </Typography>
//                             <Button onClick={handleModalClose} color="primary">
//                                 Close
//                             </Button>
//                         </Box>
//                     </Modal>
//                 </Box>
//             </Container>
//         </ThemeProvider>
//     );
// };

// export default SignUp;
