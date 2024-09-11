import * as React from 'react';
import Footer from '../Footer/Footer';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person2';
import LogoutIcon from '@mui/icons-material/Logout';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

export default function Menu() {
    // Define new color theme
    const primaryColor = '#007BFF'; // Blue
    const hoverColor = '#0056b3'; // Darker Blue
    const logoutColor = '#dc3545'; // Red

    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('userRole');
        navigate('/login');
    };

    const sectionStyle = {
        border: `2px solid ${primaryColor}`,
        borderRadius: '10px',
        ':hover': {
            border: `2px solid white`,
            boxShadow: `inset 0 0 5px white`,
            bgcolor: hoverColor,
            color: 'white'
        }
    };

    const MenuSectionStyle = {
        margin: '0px 8px',
        borderRadius: '10px',
        ':hover': {
            color: primaryColor,
            bgcolor: 'white',
            border: `1px solid ${primaryColor}44`,
            boxShadow: `inset 0 0 15px ${primaryColor}`
        }
    };
    
    const logOutSectionStyle = {
        border: '2px solid #fe9901',
        borderRadius: '10px',
        ':hover': {
            bgcolor: '#ff666660',
            border: '2px solid rgba(255, 77, 77, .6)',
            boxShadow: 'inset 0 0 15px #ff4d4d'
        }
    };

    return (
        <Box sx={{ display: 'flex', userSelect: 'none' }}>
            <AppBar
                position="fixed"
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: primaryColor }}
            >
                <Toolbar>
                    <Box
                        onClick={() => navigate('/staff/dashboard')}
                        sx={{ width: '95px', ':hover': { cursor: 'pointer' } }}
                    >
                        <img
                            src='/assets/logo.png'
                            alt='ABC Restaurent logo'
                        />
                    </Box>
                    <Typography variant="h5" fontWeight={'bold'} noWrap component="div" sx={{ px: '30px' }}>
                        Staff - ABC Restaurent Management System
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                bgcolor='#fe9e0d'
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    bgcolor: primaryColor,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box
                    sx={{
                        overflow: 'auto',
                        bgcolor: primaryColor,
                        color: 'white',
                        fontWeight: 'bold',
                        height: '100vh',
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                    <Box>
                        <List>
                            <ListItem key={'products'}
                                onClick={() => navigate('/staff/products')}
                                sx={sectionStyle}
                            >
                                <ListItemButton>
                                    <ListItemIcon>
                                        <FastfoodIcon
                                            style={{ color: 'white' }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary="Products" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem key={'offers'}
                                onClick={() => navigate('/staff/offers')}
                                sx={sectionStyle}
                            >
                                <ListItemButton>
                                    <ListItemIcon>
                                        <LocalOfferIcon
                                            style={{ color: 'white' }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary={"Offers"} />
                                </ListItemButton>
                            </ListItem>
                            <ListItem key={'facilities'}
                                onClick={() => navigate('/staff/facilities')}
                                sx={sectionStyle}
                            >
                                <ListItemButton>
                                    <ListItemIcon>
                                        <RestaurantIcon
                                            style={{ color: 'white' }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary={"Facilities"} />
                                </ListItemButton>
                            </ListItem>
                            <ListItem key={'reservations'}
                                onClick={() => navigate('/staff/reservations')}
                                sx={sectionStyle}
                            >
                                <ListItemButton>
                                    <ListItemIcon>
                                        <ConfirmationNumberIcon
                                            style={{ color: 'white' }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary={"Reservations"} />
                                </ListItemButton>
                            </ListItem>
                            <ListItem key={'queries'}
                                onClick={() => navigate('/staff/queries')}
                                sx={sectionStyle}
                            >
                                <ListItemButton>
                                    <ListItemIcon>
                                        <ChatBubbleIcon
                                            style={{ color: 'white' }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary={"Queries"} />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Box>
                    <Box sx={{ mt: 'auto' }}>
                        <Divider sx={{ width: '100%', justifyContent: 'space-around' }} />
                        <List>
                            <ListItem key={'profile'}
                                onClick={() => navigate('/staff/profile')}
                                sx={sectionStyle}
                            >
                                <ListItemButton>
                                    <ListItemIcon>
                                        <PersonIcon style={{ color: 'white' }} />
                                    </ListItemIcon>
                                    <ListItemText primary={"Profile"} />
                                </ListItemButton>
                            </ListItem>
                            <ListItem onClick={handleLogout} key={"logout"} sx={logOutSectionStyle}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <LogoutIcon style={{ color: 'white' }} />
                                    </ListItemIcon>
                                    <ListItemText primary={"Log out"} style={{ color: 'white' }} />
                                </ListItemButton>
                            </ListItem>
                        </List>
                        <Divider sx={{ width: '100%', justifyContent: 'space-around' }} />
                        <Footer sx={{ mt: '-30px' }} />
                    </Box>
                </Box>
            </Drawer>
            <Toolbar />
        </Box>
    );
}
