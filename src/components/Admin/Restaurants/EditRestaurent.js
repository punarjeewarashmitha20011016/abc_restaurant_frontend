import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import Menu from "../Menu";
import { Box, FormControl, Typography, CircularProgress, Button, TextField, Container, Select, MenuItem, InputLabel } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const primaryColor = '#007BFF'; // Primary color (Blue)
const hoverColor = '#0056b3'; // Darker shade of primary color (Darker Blue)
const logoutColor = '#dc3545'; // Logout color (Red)

export default function AddUser() {
    const navigate = useNavigate();
    const location = useLocation();
    const { locationId } = location.state;

    const [form, setForm] = useState({
        locationName: "",
        locationAddress: "",
        locationCity: "",
        locationDistrict: "",
        locationPhone: "",
        locationFacilities: [], // Initialize as an array
    });
    const [Facilities, setFacilities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        const userRole = sessionStorage.getItem('userRole');
        if (!userId || userRole !== '1') {
            navigate('/login');
        } else {
            loadRestaurent();
            loadFacilities();
        }
    }, []);

    const loadRestaurent = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/restaurent/${locationId}`);
            setForm(result.data);
        } catch (error) {
            console.error("Error loading user data:", error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const loadFacilities = async () => {
        setLoading(true);
        try {
            const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/facility/allFacilities`);
            setFacilities(result.data);
        } catch (error) {
            console.error("Error loading facilities data:", error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleFacilitiesChange = (event) => {
        const { value } = event.target;
        setForm((prevForm) => ({
            ...prevForm,
            locationFacilities: value, // Ensure this is an array
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await Axios.put(`${process.env.REACT_APP_ENDPOINT}/api/restaurent/${locationId}`, form);
            navigate("/admin/restaurants");
        } catch (error) {
            console.error(error);
        }
    };

    const selectStyle = {
        color: 'black',
        '& .Mui-selected': {
            color: 'black',
        },
        "& .MuiOutlinedInput-notchedOutline": {
            borderWidth: "2px",
            borderColor: primaryColor,
            "&.Mui-focused": {
                "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: primaryColor,
                    borderWidth: "3px",
                },
            },
        },
        "& .MuiInputLabel-outlined": {
            color: "black",
            fontWeight: "bold",
        },
    };

    const textboxStyle = {
        input: {
            color: 'black',
        },
        "& .MuiOutlinedInput-notchedOutline": {
            borderWidth: "2px",
            borderColor: primaryColor,
            "&.Mui-focused": {
                "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: primaryColor,
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
        background: primaryColor,
        ':hover': {
            bgcolor: hoverColor,
            color: 'white',
        },
    };

    const logoutButtonStyle = {
        mt: '30px',
        mb: 2,
        color: 'white',
        background: logoutColor,
        ':hover': {
            bgcolor: '#c82333', // Darker shade of logout color
            color: 'white',
        },
    };

    return (
        <Grid2
            sx={{
                minWidth: '800px',
            }}
        >
            <Menu />
            <Box
                component="main"
                sx={{
                    padding: '30px 40px',
                    marginLeft: '240px',
                    backgroundColor: '#f5f5f5', // Light background color
                }}
            >
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
                                color: primaryColor,
                            }}
                        />
                    </Box>
                ) : (
                    <Box
                        sx={{
                            backgroundColor: '#ffffff', // White background color
                            padding: '20px',
                            borderRadius: '8px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: 'white',
                                color: primaryColor,
                                borderRadius: '10px',
                                ':hover': {
                                    bgcolor: primaryColor,
                                    color: 'white',
                                },
                            }}
                            startIcon={<ArrowBackIosIcon />}
                            onClick={() => navigate("/admin/restaurants")}
                        >
                            Back
                        </Button>
                        <Container
                            component="main"
                            maxWidth="xs"
                        >
                            <Typography
                                component="h1"
                                variant="h5"
                                sx={{
                                    textAlign: 'center',
                                    mt: '30px',
                                    mb: '10px',
                                    fontWeight: 'bold',
                                    textDecoration: 'underline',
                                    color: primaryColor,
                                }}
                            >
                                Edit Restaurant
                            </Typography>
                            <Box
                                component="form"
                                onSubmit={handleSubmit}
                                noValidate
                                sx={{
                                    mt: 1,
                                }}
                            >
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    autoFocus
                                    id="locationName"
                                    label="Location Name"
                                    name="locationName"
                                    autoComplete="location-name"
                                    sx={textboxStyle}
                                    value={form.locationName}
                                    onChange={handleChange}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="locationAddress"
                                    label="Address"
                                    name="locationAddress"
                                    autoComplete="location-address"
                                    sx={textboxStyle}
                                    value={form.locationAddress}
                                    onChange={handleChange}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="locationCity"
                                    label="City"
                                    name="locationCity"
                                    autoComplete="location-city"
                                    sx={textboxStyle}
                                    value={form.locationCity}
                                    onChange={handleChange}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="locationDistrict"
                                    label="District"
                                    name="locationDistrict"
                                    autoComplete="location-district"
                                    sx={textboxStyle}
                                    value={form.locationDistrict}
                                    onChange={handleChange}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="locationPhone"
                                    label="Phone"
                                    name="locationPhone"
                                    autoComplete="location-phone"
                                    sx={textboxStyle}
                                    value={form.locationPhone}
                                    onChange={handleChange}
                                />
                                <FormControl fullWidth margin="normal" required sx={textboxStyle}>
                                    <InputLabel id="selectFacilities">Facilities</InputLabel>
                                    <Select
                                        multiple
                                        required
                                        fullWidth
                                        labelId="selectFacilities"
                                        id="facility"
                                        label="Facilities"
                                        sx={selectStyle}
                                        name="locationFacilities"
                                        value={form.locationFacilities} // Ensure this is an array
                                        onChange={handleFacilitiesChange}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((value) => (
                                                    <Typography key={value}>{value}</Typography>
                                                ))}
                                            </Box>
                                        )}
                                    >
                                        {Facilities.map((facility) => (
                                            <MenuItem key={facility} value={facility}>
                                                {facility}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={buttonStyle}
                                >
                                    Update
                                </Button>
                            </Box>
                        </Container>
                    </Box>
                )}
            </Box>
        </Grid2>
    );
}





