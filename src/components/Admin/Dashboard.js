import { Box, Typography, Grid } from "@mui/material";
import React, { useEffect } from "react";
import Menu from "./Menu";
import { useNavigate } from "react-router-dom";

const primaryColor = '#ffffff'; // Blue
const headerColor = '#0056b3'; // Darker Blue
const imageBorderColor = '#004085'; // Even darker Blue

export default function Dashboard() {
    let navigate = useNavigate();

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        const userRole = sessionStorage.getItem('userRole');
        if (!userId || userRole !== '1') {
            navigate('/login');
        }
    }, [navigate]);

    const imgStyle = {
        mt: '20px',
        borderRadius: '10px',
        height: '75vh',
        objectFit: 'cover'
    };

    return (
        <Grid
            container
            sx={{
                minWidth: '800px',
                bgcolor: primaryColor, // Background color for the entire grid
                minHeight: '100vh', // Ensure the grid covers the full viewport height
                p: 2, // Padding for the grid
            }}
        >
            <Menu />
            <Box
                component="main"
                sx={{
                    padding: '50px 40px',
                    marginLeft: '240px',
                    bgcolor: 'white', // Background color for the main content area
                    minHeight: 'calc(100vh - 64px)', // Adjust height considering the header height
                }}
            >
                <Box>
                    <img
                        src="/assets/landing.png"
                        alt="restaurant"
                        style={imgStyle}
                    />
                </Box>
            </Box>
        </Grid>
    );
}

