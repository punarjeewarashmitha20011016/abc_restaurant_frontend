import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';

export default function FixedBottomNavigation() {
    const [value, setValue] = React.useState('1');
    const navigate = useNavigate();

    const handleChange = (event, newValue) => {
        setValue(newValue);
        switch (newValue) {
            case '1':
                navigate('/user/menu');
                break;
            case '2':
                navigate('/user/offers');
                break;
            case '3':
                navigate('/user/chat');
                break;
            default:
                navigate('/user/dashboard');
                break;
        }
    };

    return (
        <Box sx={{ pb: 7 }}>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation
                    value={value}
                    onChange={handleChange}
                    showLabels
                    sx={{
                        bgcolor: '#007BFF', // Blue background for the bottom navigation
                        padding: '10px 0',
                        borderTop: '1px solid rgba(0,0,0,0.1)', // Subtle top border
                        boxShadow: '0px -2px 5px rgba(0,0,0,0.1)', // Subtle shadow for the bottom navigation
                    }}
                >
                    <BottomNavigationAction
                        label="Menu"
                        value='1'
                        icon={<MenuIcon fontSize="large" />}
                        sx={{
                            color: 'white', // White color for the icon and label by default
                            '& .MuiBottomNavigationAction-icon': {
                                color: 'white', // White color for the icon by default
                            },
                            '&:hover': {
                                bgcolor: '#0056b3', // Darker Blue on hover
                                color: 'white', // White color for the label on hover
                                '& .MuiBottomNavigationAction-icon': {
                                    color: 'white', // White color of the icon on hover
                                },
                                borderRadius: '4px',
                            }
                        }}
                    />

                    <BottomNavigationAction
                        label="Offers and Promotions"
                        value='2'
                        icon={<LocalOfferIcon fontSize="large" />}
                        sx={{
                            color: 'white', // White color for the icon and label by default
                            '& .MuiBottomNavigationAction-icon': {
                                color: 'white', // White color for the icon by default
                            },
                            '&:hover': {
                                bgcolor: '#0056b3', // Darker Blue on hover
                                color: 'white', // White color for the label on hover
                                '& .MuiBottomNavigationAction-icon': {
                                    color: 'white', // White color of the icon on hover
                                },
                                borderRadius: '4px',
                            }
                        }}
                    />
                    
                    <BottomNavigationAction
                        label="Queries"
                        value='3'
                        icon={<SendIcon fontSize="large" />}
                        sx={{
                            color: 'white', // White color for the icon and label by default
                            '& .MuiBottomNavigationAction-icon': {
                                color: 'white', // White color for the icon by default
                            },
                            '&:hover': {
                                bgcolor: '#0056b3', // Darker Blue on hover
                                color: 'white', // White color for the label on hover
                                '& .MuiBottomNavigationAction-icon': {
                                    color: 'white', // White color of the icon on hover
                                },
                                borderRadius: '4px',
                            }
                        }}
                    />
                </BottomNavigation>
            </Paper>
        </Box>
    );
}
