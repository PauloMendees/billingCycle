import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SpeedIcon from '@mui/icons-material/Speed';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../../constants/autenticacao';
import SecurityIcon from '@mui/icons-material/Security';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
      
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

export default function Drawner(props) {
    const navigate = useNavigate();
    const theme = useTheme();
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(true);

    const handleLogout = () => {
        sessionStorage.removeItem('jwt')
        localStorage.removeItem('jwt')
        dispatch({ type: LOGOUT })
        document.location.reload(true);
      }

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    {open ? (
                        <></>
                    ) : (
                        <Typography variant="h6" noWrap component="h1" color="white">
                            BillingCycle APP
                        </Typography>
                    )}
                    <Box sx={{flexGrow: 1}}>
                        <></>
                    </Box>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => {
                            handleLogout()
                        }}
                        edge="start"
                    >
                        <LogoutIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        backgroundColor: '#f5f5f5'
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader
                    sx={{
                        backgroundColor: '#306754'
                    }}
                >
                    {open ? (
                        <Typography variant="h6" noWrap component="h1" color="white">
                            BillingCycle APP
                        </Typography>
                    ) : (
                        <></>
                    )}
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <ListItem button onClick={() => {
                        navigate('/dashboard')
                    }}>
                        <ListItemIcon>
                            < SpeedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                    <ListItem button onClick={() => {
                        navigate('/ciclos')
                    }}>
                        <ListItemIcon>
                            < AppRegistrationIcon />
                        </ListItemIcon>
                        <ListItemText primary="Ciclos" />
                    </ListItem>
                    <ListItem button onClick={() => {
                        navigate('/admin')
                    }}>
                        <ListItemIcon>
                            < SecurityIcon />
                        </ListItemIcon>
                        <ListItemText primary="Admin" />
                    </ListItem>
                </List>
            </Drawer>
            <Main open={open}>
                {props.children}
            </Main>
        </Box>
    );
}