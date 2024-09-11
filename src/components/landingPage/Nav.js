import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';

const logoStyle = {
    width: '100px',
    height: 'auto',
    cursor: 'pointer',
};

function AppAppBar() {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const scrollToSection = (sectionId) => {
        const sectionElement = document.getElementById(sectionId);
        if (sectionElement) {
            const targetScroll = sectionElement.offsetTop - 128;
            window.scrollTo({ top: targetScroll, behavior: 'smooth' });
            setOpen(false);
        }
    };

    return (
        <div>
            <AppBar
                position="fixed"
                sx={{
                    boxShadow: 0,
                    bgcolor: 'rgba(254, 158, 13, 1)',
                    borderBottom: '1px solid #d3d3d3',
                    backgroundColor:"#007BFF"
                }}
            >
                <Container maxWidth="lg">
                    <Toolbar
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <img
                                src='/assets/logo.png'
                                style={logoStyle}
                                alt="ABC Restaurant Logo"
                                onClick={() => navigate('/')}
                            />
                            <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 3 }}>
                                <MenuItem
                                    onClick={() => scrollToSection('home')}
                                    sx={{ py: 1 }}
                                >
                                    <Typography variant="body2" color="white" fontWeight='bold'>
                                        Home
                                    </Typography>
                                </MenuItem>
                                <MenuItem
                                    onClick={() => scrollToSection('about')}
                                    sx={{ py: 1 }}
                                >
                                    <Typography variant="body2" color="white" fontWeight='bold'>
                                        About Us
                                    </Typography>
                                </MenuItem>
                                <MenuItem
                                    onClick={() => scrollToSection('commitment')}
                                    sx={{ py: 1 }}
                                >
                                    <Typography variant="body2" color="white" fontWeight='bold'>
                                        Commitment
                                    </Typography>
                                </MenuItem>
                                <MenuItem
                                    onClick={() => scrollToSection('products')}
                                    sx={{ py: 1 }}
                                >
                                    <Typography variant="body2" color="white" fontWeight='bold'>
                                        Menu
                                    </Typography>
                                </MenuItem>
                                <MenuItem
                                    onClick={() => scrollToSection('facilities')}
                                    sx={{ py: 1 }}
                                >
                                    <Typography variant="body2" color="white" fontWeight='bold'>
                                        Facilities
                                    </Typography>
                                </MenuItem>
                                <MenuItem
                                    onClick={() => scrollToSection('location')}
                                    sx={{ py: 1 }}
                                >
                                    <Typography variant="body2" color="white" fontWeight='bold'>
                                        Locations
                                    </Typography>
                                </MenuItem>
                                <MenuItem
                                    onClick={() => scrollToSection('contact')}
                                    sx={{ py: 1 }}
                                >
                                    <Typography variant="body2" color="white" fontWeight='bold'>
                                        Contact
                                    </Typography>
                                </MenuItem>
                            </Box>
                        </Box>
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <Button
                                color="primary"
                                variant="text"
                                size="small"
                                onClick={() => navigate('/login')}
                                sx={{ color: 'white' }}
                            >
                                LOG IN
                            </Button>
                            <Button
                                color="primary"
                                variant="contained"
                                size="small"
                                onClick={() => navigate('/register')}
                                sx={{
                                    color: '#fe9e0d',
                                    background: 'white',
                                    '&:hover': {
                                        background: '#e6e6e6',
                                    }
                                }}
                            >
                                REGISTER
                            </Button>
                        </Box>
                        <Box sx={{ display: { sm: 'block', md: 'none' } }}>
                            <Button
                                variant="text"
                                color="primary"
                                aria-label="menu"
                                onClick={toggleDrawer(true)}
                            >
                                <MenuIcon sx={{ color: 'white' }} />
                            </Button>
                            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                                <Box
                                    sx={{
                                        width: 250,
                                        p: 2,
                                        backgroundColor: 'rgba(254, 158, 13, 1)',
                                    }}
                                >
                                    <MenuItem onClick={() => scrollToSection('home')}>
                                        <Typography color='white' fontWeight='bold'>
                                            Home
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={() => scrollToSection('about')}>
                                        <Typography color='white' fontWeight='bold'>
                                            About Us
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={() => scrollToSection('commitment')}>
                                        <Typography color='white' fontWeight='bold'>
                                            Commitment
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={() => scrollToSection('products')}>
                                        <Typography color='white' fontWeight='bold'>
                                            Menu
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={() => scrollToSection('facilities')}>
                                        <Typography color='white' fontWeight='bold'>
                                            Facilities
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={() => scrollToSection('location')}>
                                        <Typography color='white' fontWeight='bold'>
                                            Locations
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={() => scrollToSection('contact')}>
                                        <Typography color='white' fontWeight='bold'>
                                            Contact
                                        </Typography>
                                    </MenuItem>
                                    <Divider sx={{ my: 2 }} />
                                    <MenuItem>
                                        <Button
                                            variant="contained"
                                            fullWidth
                                            onClick={() => navigate('/register')}
                                            sx={{
                                                color: '#fe9e0d',
                                                background: 'white',
                                                '&:hover': {
                                                    background: '#e6e6e6',
                                                }
                                            }}
                                        >
                                            REGISTER
                                        </Button>
                                    </MenuItem>
                                    <MenuItem>
                                        <Button
                                            variant="outlined"
                                            fullWidth
                                            onClick={() => navigate('/login')}
                                            sx={{
                                                color: 'white',
                                                border: '2px solid white',
                                                '&:hover': {
                                                    borderColor: '#e6e6e6',
                                                }
                                            }}
                                        >
                                            LOG IN
                                        </Button>
                                    </MenuItem>
                                </Box>
                            </Drawer>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
}

export default AppAppBar;
