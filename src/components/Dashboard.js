import React, { useState, useEffect } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from './ListItems';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { TableHead, TableRow, Paper, TableBody, Table, Container, Grid, Badge, IconButton, Divider, Typography, List, Toolbar, Box, CssBaseline, Stack, Avatar, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import userApi from './userApi';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})
    (({ theme, open }) =>
    ({
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
const defaultTheme = createTheme();

const Dashboard = () => {
    const navigate = useNavigate()
    const currentUser = JSON.parse(localStorage.getItem('userDetail'));
    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const [user, setUser] = useState({ user: {} });

    const fetchUser = async () => {
        try {
            const response = await userApi.getUserById(currentUser?.user?.id);
            setUser(response || { user: {} });
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    }

    useEffect(() => {
        if (currentUser?.user?.id) {
            fetchUser();
        }
    }, []);

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
        }
    }, [currentUser, user.user.id, fetchUser, navigate]);

    // useEffect(() => {
    //     if (!currentUser) {
    //         navigate('/login');
    //     } else if (!user.user.id) {
    //         fetchUser();
    //     }
    // }, [currentUser, user.user.id, fetchUser, navigate]);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    if (!currentUser) {
        return null;
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open} color="inherit">
                    <Toolbar
                        sx={{
                            pr: '24px',
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            Rewa Infotech Dashboard
                        </Typography>
                        <IconButton color="inherit" >
                            <Badge badgeContent={1} color="secondary" sx={{ mr: 2 }} >
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton color="inherit" onClick={handleLogout}  >
                            <Typography style={{ cursor: 'pointer' }}>Logout</Typography>
                        </IconButton>
                        <Link to='/change-password'>
                            <IconButton color="inherit"   >
                                <Typography style={{ cursor: 'pointer' }}>Change Password</Typography>
                            </IconButton>
                        </Link>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        {mainListItems}
                        <Divider sx={{ my: 1 }} />
                        {secondaryListItems}
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell>Profile</StyledTableCell>
                                                <StyledTableCell align="right">First Name</StyledTableCell>
                                                <StyledTableCell align="right">Last Name</StyledTableCell>
                                                <StyledTableCell align="right">Email</StyledTableCell>
                                                <StyledTableCell align="right">Phone</StyledTableCell>
                                                <StyledTableCell align="right"></StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <StyledTableRow >
                                                <StyledTableCell component="th" scope="row" padding="none">
                                                    <Stack direction="row" alignItems="center" spacing={2}>
                                                        <Avatar
                                                            // alt={currMedia.name}
                                                            // src={currMedia.media_link}
                                                            sx={{ ml: 2 }}
                                                            style={{ width: '65px', height: '65px', borderRadius: '50%', margin: '5px' }}
                                                        />
                                                    </Stack>
                                                </StyledTableCell>
                                                <StyledTableCell align="right">
                                                    {user?.user?.firstName || 'Loading...'}
                                                </StyledTableCell>
                                                <StyledTableCell align="right">
                                                    {user?.user?.lastName || 'Loading...'}
                                                </StyledTableCell>
                                                <StyledTableCell align="right">
                                                    {user?.user?.email || 'Loading...'}
                                                </StyledTableCell>
                                                <StyledTableCell align="right">
                                                    {user?.user?.phone || 'Loading...'}
                                                </StyledTableCell>

                                                <StyledTableCell>
                                                    <Link to={`/edit-profile/${user?.user?.id}`}>
                                                        <Button variant="contained" >
                                                            Edit
                                                        </Button>
                                                    </Link>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        </TableBody>
                                    </Table>
                                </Paper>
                            </Grid>
                        </Grid>
                        {/* <Copyright sx={{ pt: 4 }} /> */}
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default Dashboard;