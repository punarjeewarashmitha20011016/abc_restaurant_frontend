import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import BottomNav from "./BottomNav";
import AppBar from "./AppBar";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const primaryColor = '#007BFF'; // Blue
    const headerColor = '#0056b3'; // Darker Blue
    const imageBorderColor = '#004085'; // Even darker Blue

    const navigate = useNavigate();

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        const userRole = sessionStorage.getItem('userRole');
        if (!userId || userRole !== '3') {
            navigate('/login');
        }
    }, [navigate]);

    const imgStyle = {
        mt: '20px',
        borderRadius: '10px',
        height: '75vh',
        objectFit: 'cover',
        width: '100%', // Ensure the image fits its container
    };

    return (
        <Box
            sx={{
                minWidth: '800px',
                bgcolor: primaryColor, // Background color for the entire grid
                minHeight: '100vh', // Ensure the grid covers the full viewport height
                p: 2, // Padding for the grid
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#ffffff', // White background for main content
            }}
        >
            <AppBar sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1201 }} />
            <Box
                sx={{
                    marginTop: '64px', // Adjust based on the AppBar height
                    padding: "3% 7%",
                    flex: 1, // Ensures this Box takes up the remaining space
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h3" gutterBottom sx={{ color: headerColor }}>
                    Welcome
                </Typography>
                <img 
                    src="/assets/landing.png" 
                    alt="restaurant" 
                    style={imgStyle} 
                />
            </Box>
            <BottomNav />
        </Box>
    );
}
