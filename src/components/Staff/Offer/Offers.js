import React, { useEffect, useState } from "react";
import Menu from "../Menu";
import Card from "./Card";
import { Box, Grid, Typography } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Offers() {
    const navigate = useNavigate();
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        const userRole = sessionStorage.getItem('userRole');
        if (!userId || userRole !== '2') {
            navigate('/login');
        } else {
            const fetchData = async () => {
                try {
                    await loadOffer();
                } catch (err) {
                    setError("Failed to load offers");
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, []);

    const loadOffer = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/offer/allOffers`);
            setOffers(result.data);
        } catch (error) {
            console.error("Error loading offers:", error);
            throw error;
        }
    };

    const availableOffers = offers.filter(offer => offer.offerStatus === "Available");

    return (
        <Box>
            <Menu />
            <Box component="main" sx={{
                padding: '30px 40px',
                marginLeft: '240px',
                height: '92vh',
                backgroundColor: '#ffffff',
                overflowY: 'auto',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
            }}>
                {loading ? (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '90vh',
                        }}
                    >
                        <CircularProgress
                            size={70}
                            thickness={4}
                            sx={{
                                color: '#fe9e0d', // Orange spinner to match the theme
                            }}
                        />
                    </Box>
                ) : error ? (
                    <Typography
                        variant="h5"
                        sx={{
                            textAlign: 'center',
                            justifyContent: 'center',
                            margin: 'auto',
                            color: 'red',
                        }}
                    >
                        {error}
                    </Typography>
                ) : availableOffers.length > 0 ? (
                    <Box sx={{ marginBottom: '30px' }}>
                        <Typography
                            variant="h5"
                            sx={{
                                marginBottom: 2,
                                fontWeight: 'bold',
                                color: '#007BFF' // Primary blue for section header
                            }}
                        >
                            Offers
                        </Typography>
                        <Grid container rowSpacing={2} columnSpacing={{ xs: 2, sm: 3, md: 4 }}>
                            {availableOffers.map((offer) => (
                                <Grid item xs={12} sm={6} md={4} key={offer.id}>
                                    <Card offer={offer} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                ) : (
                    <Typography
                        variant="h5"
                        sx={{
                            textAlign: 'center',
                            justifyContent: 'center',
                            margin: 'auto',
                            color: '#fe9e0d' // Orange for "No Offers" message
                        }}
                    >
                        No Offers Available.
                    </Typography>
                )}
            </Box>
        </Box>
    );
}
