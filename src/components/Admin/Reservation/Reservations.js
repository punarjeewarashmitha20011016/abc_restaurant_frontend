import React, { useEffect } from "react";
import Menu from '../Menu';
import { useNavigate } from "react-router-dom";

import { Box } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Tabs from "./Tabs"

export default function Reservations() {
    const navigate = useNavigate();
    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        const userRole = sessionStorage.getItem('userRole');
        if (!userId || userRole !== '1') {
            navigate('/login');
        }
    }, []);

    return (
        <Grid2
            sx={{
                minWidth: '800px',
                backgroundColor: '#ffffff'
            }}
        >
            <Menu />
            <Box
                component="main"
                sx={{
                    padding: '20% 20px',
                    marginLeft: '240px'
                }}
            >
                <Tabs />
            </Box>
        </Grid2>
    );
}
