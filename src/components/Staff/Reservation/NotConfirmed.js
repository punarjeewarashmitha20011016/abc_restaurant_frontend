import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Box, Button, CircularProgress, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotConfirmed() {
    const navigate = useNavigate();
    const [reservations, setReservations] = useState([]);
    const [facilities, setFacilities] = useState({});
    const [restaurants, setRestaurants] = useState({});
    const [customerDetails, setCustomerDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadNotConfirmedReservations();
    }, []);

    const loadNotConfirmedReservations = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/reservation/allReservations`);
            const notConfirmedReservations = result.data.filter(reservation => reservation.reservationStatus === "");
            setReservations(notConfirmedReservations);

            const customerPromises = notConfirmedReservations.map(reservation => loadCustomerDetails(reservation.customerId));
            const facilityPromises = notConfirmedReservations.map(reservation => loadFacilityNames(reservation.reservationType));
            const restaurantPromises = notConfirmedReservations.map(reservation => loadRestaurantNames(reservation.reservationLocation));

            await Promise.all([...customerPromises, ...facilityPromises, ...restaurantPromises]);
        } catch (error) {
            console.error("Error loading reservations:", error);
            setError("Failed to load not confirmed reservations.");
        } finally {
            setLoading(false);
        }
    };

    const loadCustomerDetails = async (customerId) => {
        if (!customerDetails[customerId]) {
            try {
                const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/user/${customerId}`);
                setCustomerDetails(prevState => ({
                    ...prevState,
                    [customerId]: result.data
                }));
            } catch (error) {
                console.error("Error loading customer data:", error);
            }
        }
    };

    const loadFacilityNames = async (facilityId) => {
        if (!facilities[facilityId]) {
            try {
                const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/facility/${facilityId}`);
                setFacilities(prevState => ({
                    ...prevState,
                    [facilityId]: result.data
                }));
            } catch (error) {
                console.error("Error loading facility data:", error);
            }
        }
    };

    const loadRestaurantNames = async (restaurantId) => {
        if (!restaurants[restaurantId]) {
            try {
                const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/restaurent/${restaurantId}`);
                setRestaurants(prevState => ({
                    ...prevState,
                    [restaurantId]: result.data
                }));
            } catch (error) {
                console.error("Error loading restaurant data:", error);
            }
        }
    };

    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }}
            >
                <CircularProgress
                    size={70}
                    thickness={4}
                    sx={{
                        color: '#fe9e0d',
                    }}
                />
            </Box>
        );
    }

    if (error) {
        return (
            <Typography variant="h6" sx={{ textAlign: 'center', color: 'red' }}>
                {error}
            </Typography>
        );
    }

    const date = (reservationDate) => {
        if (!reservationDate) return 'N/A';
        return reservationDate.split('T')[0];
    };
    
    const time = (reservationTime) => {
        if (!reservationTime) return 'N/A';
        const timePart = reservationTime.split('T')[1];
        return timePart ? timePart.split('Z')[0].slice(0, 5) : 'N/A';
    };

    const buttonStyle = {
        backgroundColor: '#cb7a01',
        color: '#ffffff',
        borderRadius: '5px',
        border: '2px solid #fe9e0d',
        alignContent: 'center',
        ':hover': {
            bgcolor: ' #fe9e0d',
        },
    };

    return (
        <Box>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 600 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {['Reserv Id', 'Customer Name', 'Type', 'Date', 'Time', 'Restaurant', ''].map((header) => (
                                    <TableCell
                                        key={header}
                                        align="center"
                                        sx={{ backgroundColor: '#cccccc' }}
                                    >
                                        {header}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {reservations.map((reservation) => (
                                <TableRow key={reservation.reservationId}>
                                    <TableCell align="center" component="th" scope="row">
                                        {reservation.reservationId}
                                    </TableCell>
                                    <TableCell align="center">
                                    {`${customerDetails[reservation.customerId]?.firstName} ${customerDetails[reservation.customerId]?.lastName}` || "Loading..."}
                                    </TableCell>
                                    <TableCell align="center">
                                        {facilities[reservation.reservationType]?.facilityName || "Loading..."}
                                    </TableCell>
                                    <TableCell align="center">
                                        {date(reservation.reservationDate)}
                                    </TableCell>
                                    <TableCell align="center">
                                        {time(reservation.reservationTime)}
                                    </TableCell>
                                    <TableCell align="center">
                                        {restaurants[reservation.reservationLocation]?.locationName || "Loading..."}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button
                                            variant="contained"
                                            sx={buttonStyle}
                                            onClick={() => navigate('/staff/reservation/details', {state : {reservationId: reservation.reservationId}})}
                                        >
                                            View
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
}
