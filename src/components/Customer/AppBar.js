import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function BackToTop(props) {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleClose();
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('userRole');
        navigate('/login');
    };

    const MenuSectionStyle = {
        margin: '0px 8px',
        borderRadius: '10px',
        transition: '0.3s ease',
        ':hover': {
            color: '#FEBF00', // Bright yellow on hover
            bgcolor: 'white',
            border: '1px solid rgba(254, 173, 52, 0.4)', // Yellowish border
            boxShadow: 'inset 0 0 15px rgba(254, 173, 52, 0.7)', // Stronger shadow effect
        },
        ':focus': {
            color: '#FEBF00', // Bright yellow on focus
            bgcolor: 'white',
            border: '1px solid rgba(254, 173, 52, 0.4)', // Yellowish border
            boxShadow: 'inset 0 0 15px rgba(254, 173, 52, 0.7)', // Stronger shadow effect
        }
    };

    const MenuLogOutSectionStyle = {
        margin: '0px 8px',
        borderRadius: '10px',
        transition: '0.3s ease',
        ':hover': {
            bgcolor: '#ff4d4d', // Red hover background
            color: 'white',
        },
        ':focus': {
            bgcolor: '#ff4d4d', // Red focus background
            color: 'white',
        }
    };

    return (
        <React.Fragment>
            <AppBar
                sx={{
                    bgcolor: '#007BFF', // Blue background for the AppBar
                    userSelect: 'none',
                    boxShadow: '0px 4px 8px rgba(0,0,0,0.1)' // Subtle shadow
                }}
            >
                <Toolbar>
                    <img
                        src='/assets/logo.png'
                        alt='ABC Restaurant logo'
                        style={{
                            width: '95px',
                            cursor: 'pointer',
                        }}
                        onClick={() => navigate('/user/dashboard')} // Enable logo click to navigate
                    />
                    <Typography variant="h6" component="div" px={'20px'}>
                        ABC Restaurant
                    </Typography>
                    <Box
                        sx={{
                            marginLeft: 'auto',
                            display: 'flex',
                        }}
                    >
                        <Tooltip title="Account settings">
                            <IconButton
                                onClick={handleClick}
                                size="small"
                                sx={{ ml: 2 }}
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                            >
                                <PersonIcon fontSize="large" sx={{ color: 'white' }} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&::before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <MenuItem
                                onClick={() => {
                                    handleClose();
                                    navigate('/user/cart');
                                }}
                                sx={MenuSectionStyle}
                            >
                                <ListItemIcon>
                                    <ShoppingCartIcon fontSize="small" />
                                </ListItemIcon>
                                Cart
                            </MenuItem>
                            <Divider />
                            <MenuItem
                                onClick={() => {
                                    handleClose();
                                    navigate('/user/profile');
                                }}
                                sx={MenuSectionStyle}
                            >
                                <ListItemIcon>
                                    <PersonIcon fontSize="small" />
                                </ListItemIcon>
                                Profile
                            </MenuItem>
                            <MenuItem
                                onClick={handleLogout}
                                sx={MenuLogOutSectionStyle}
                            >
                                <ListItemIcon>
                                    <LogoutIcon fontSize="small" />
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
            <Toolbar id="back-to-top-anchor" />
        </React.Fragment>
    );
}
