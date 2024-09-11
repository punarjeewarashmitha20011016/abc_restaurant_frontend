import React, { useState, useEffect } from "react";
import AppBar from "../AppBar";
import BottomNav from "../BottomNav";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, TextField, InputLabel, Select, MenuItem, FormControl, Container } from "@mui/material";
import { DatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

export default function Checkout() {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({});
    const [cartItems, setCartItems] = useState([]);
    const [productDetailsMap, setProductDetailsMap] = useState({});
    const [facilities, setFacilities] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [total, setTotal] = useState(0);
    const [selectedMethod, setSelectedMethod] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [orderDetails, setOrderDetails] = useState({
        customerId: "",
        reservationProducts: [],
        reservationType: "",
        reservationDate: dayjs(),
        reservationTime: dayjs(),
        reservationNote: "",
        reservationLocation: "",
        reservationPlacedTime: "",
        reservationTotal: 0,
        reservationStatus: "",
    });

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        const userRole = sessionStorage.getItem('userRole');
        if (!userId || userRole !== '3') {
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = sessionStorage.getItem('userId');
                const [userRes, cartRes, facilitiesRes, restaurantsRes] = await Promise.all([
                    Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/user/${userId}`),
                    Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/cart/byCustomer/${userId}`),
                    Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/facility/allFacilities`),
                    Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/restaurent/allRestaurents/`),
                ]);

                setUserDetails(userRes.data);
                setCartItems(cartRes.data);
                setFacilities(facilitiesRes.data);
                setRestaurants(restaurantsRes.data);

                // Fetch product details for each cart item
                const productDetails = await Promise.all(
                    cartRes.data.map(item => Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/product/${item.productId}`))
                );

                const productDetailsMap = productDetails.reduce((map, res) => {
                    map[res.data.productId] = res.data;
                    return map;
                }, {});

                setProductDetailsMap(productDetailsMap);

                // Calculate total amount
                const totalAmount = cartRes.data.reduce((sum, item) => {
                    const product = productDetailsMap[item.productId];
                    return sum + (item.productQuantity * (product ? product.productPrice : 0));
                }, 0);

                setTotal(totalAmount);
            } catch (err) {
                console.error("Error loading data:", err);
                setError("Failed to load data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setOrderDetails(prevOrderDetails => ({
            ...prevOrderDetails,
            [name]: value,
        }));
    };

    const handleDateChange = (name, value) => {
        setOrderDetails(prevOrderDetails => ({
            ...prevOrderDetails,
            [name]: value,
        }));
    };

    const handleClick = async (event) => {
        event.preventDefault();
        const userId = sessionStorage.getItem('userId');
        const updatedOrderDetails = {
            customerId: userId,
            reservationProducts: cartItems.flatMap(item =>
                Array(item.productQuantity).fill(item.productId)
            ),
            reservationType: selectedMethod,
            reservationDate: orderDetails.reservationDate.toISOString(),
            reservationTime: orderDetails.reservationTime.toISOString(),
            reservationNote: orderDetails.reservationNote || "",
            reservationLocation: orderDetails.reservationLocation,
            reservationPlacedTime: new Date().toISOString(),
            reservationTotal: total,
            reservationStatus: orderDetails.reservationStatus || ""
        };

        try {
            await Axios.post(`${process.env.REACT_APP_ENDPOINT}/api/reservation/addReservation`, updatedOrderDetails);
            await deleteFromCartCollection();
        } catch (err) {
            console.error("Error placing order:", err);
            setError("Failed to place the order.");
        }
    };

    const deleteFromCartCollection = async () => {
        try {
            const deletionPromises = cartItems.map(cartItem =>
                Axios.delete(`${process.env.REACT_APP_ENDPOINT}/api/cart/${cartItem.id}`)
            );
            await Promise.all(deletionPromises);
            window.alert("Order Placed!");
            navigate('/user/menu');
        } catch (err) {
            console.error("Error deleting items from cart:", err);
            setError("Failed to delete items from cart.");
        }
    };

    const handleMethodChange = (e) => {
        setSelectedMethod(e.target.value);
    };

    const selectStyle = {
        color: 'black',
        '& .Mui-selected': {
            color: 'white',
        },
        "& .MuiOutlinedInput-notchedOutline": {
            borderWidth: "2px",
            borderColor: "black",
            "&.Mui-focused": {
                "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#007BFF",
                    borderWidth: "3px",
                },
            },
        },
        "& .MuiInputLabel-outlined": {
            color: "black",
            fontWeight: "bold",
            borderColor: "#fe9e0d",
        },
    };

    const textboxStyle = {
        input: {
            color: 'black',
        },
        "& .MuiOutlinedInput-notchedOutline": {
            borderWidth: "2px",
            borderColor: "black", // Replace with primaryColor if defined
            "&.Mui-focused": {
                "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#007BFF",
                    borderWidth: "3px",
                },
            },
        },
        "& .MuiInputLabel-outlined": {
            color: "black",
            fontWeight: "bold",
        },
        "& .MuiInputBase-input::placeholder": {
            color: 'rgba(0, 0, 0, 0.7)', // Darker color for placeholder
        },
    };

    const buttonStyle = {
        mt: '30px',
        mb: 2,
        color: 'white',
        background: '#007BFF', // Replace with primaryColor if defined
        ':hover': {
            bgcolor: '#0056b3', // Replace with hoverColor if defined
            color: 'white',
        },
    };

    const datePicker = {
        width: '100%',
        mt: '1.5',
        mb: 1,
        '& .MuiInputBase-input': {
            color: 'black',
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderWidth: "2px",
            borderColor: "black",
        },
        '& .MuiInputLabel-root': {
            color: "black",
            fontWeight: "bold",
        },
        '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: "black",
            borderWidth: "3px",
        },
        '& .MuiSvgIcon-root': {
            color: 'black',
        },
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '120vh',
            backgroundColor: '#ffffff',
        }}>
            <AppBar />
            <Typography
                sx={{ color: '#007BFF', fontSize: 24, fontWeight: 'bold', mb: 2 }}
                align="center"
            >
                Checkout
            </Typography>
            {loading ? (
                <Typography align="center" sx={{ color: '#007BFF' }}>Loading...</Typography>
            ) : (
                <Container>
                    <form onSubmit={handleClick}>
                        {error && (
                            <Typography sx={{ color: 'red', mb: 2 }}>{error}</Typography>
                        )}
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Product</TableCell>
                                        <TableCell>Quantity</TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell>Total</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {cartItems.map(item => {
                                        const product = productDetailsMap[item.productId];
                                        return product ? (
                                            <TableRow key={item.id}>
                                                <TableCell>{product.productName}</TableCell>
                                                <TableCell>{item.productQuantity}</TableCell>
                                                <TableCell>{product.productPrice}</TableCell>
                                                <TableCell>{item.productQuantity * product.productPrice}</TableCell>
                                            </TableRow>
                                        ) : null;
                                    })}
                                    <TableRow>
                                        <TableCell colSpan={3}><strong>Total</strong></TableCell>
                                        <TableCell><strong>{total}</strong></TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <FormControl fullWidth sx={textboxStyle} margin="normal">
                            <InputLabel id="reservation-type-label">Reservation Type</InputLabel>
                            <Select
                                labelId="reservation-type-label"
                                value={selectedMethod}
                                onChange={handleMethodChange}
                                sx={selectStyle}
                            >
                                <MenuItem value="Dine-In">Dine-In</MenuItem>
                                <MenuItem value="Takeaway">Takeaway</MenuItem>
                                <MenuItem value="Delivery">Delivery</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth sx={textboxStyle} margin="normal">
                            <InputLabel>Reservation Location</InputLabel>
                            <Select
                                value={orderDetails.reservationLocation}
                                onChange={handleChange}
                                name="reservationLocation"
                                sx={selectStyle}
                            >
                                {restaurants.map(restaurant => (
                                    <MenuItem key={restaurant.id} value={restaurant.id}>
                                        {restaurant.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            name="reservationNote"
                            label="Reservation Note"
                            multiline
                            rows={4}
                            fullWidth
                            margin="normal"
                            value={orderDetails.reservationNote}
                            onChange={handleChange}
                            sx={textboxStyle}
                        />
                        <TextField
                            name="reservationLocation"
                            label="Reservation Location"
                            fullWidth
                            margin="normal"
                            value={orderDetails.reservationLocation}
                            onChange={handleChange}
                            sx={textboxStyle}
                        />
                        <TextField
                            name="reservationStatus"
                            label="Reservation Status"
                            fullWidth
                            margin="normal"
                            value={orderDetails.reservationStatus}
                            onChange={handleChange}
                            sx={textboxStyle}
                        />
                        <Button type="submit" variant="contained" sx={buttonStyle}>
                            Place Order
                        </Button>
                    </form>
                </Container>
            )}
            <BottomNav />
        </Box>
    );
}
