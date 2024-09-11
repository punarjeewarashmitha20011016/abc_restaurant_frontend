import React, { useEffect, useState } from "react";
import Menu from "../Menu";
import { Box, Typography, CircularProgress } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddFacility() {

    let navigate = useNavigate();

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        const userRole = sessionStorage.getItem('userRole');
        if (!userId || userRole !== '1') {
            navigate('/login');
        }
    }, [navigate]);

    const [form, setForm] = useState({
        facilityName: "",
        facilityDescription: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await Axios.post(`${process.env.REACT_APP_ENDPOINT}/api/facility/addFacility`, form);
            navigate("/admin/facilities");
        } catch (error) {
            console.error(error);
            setError("An error occurred while adding the facility. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const textboxStyle = {
        input: {
            color: 'black',
        },
        "& .MuiOutlinedInput-notchedOutline": {
            borderWidth: "2px",
            borderColor: "#007BFF", // Replace with primaryColor if defined
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

    return (
        <Grid2
            sx={{
                minWidth: '800px',
                backgroundColor: '#ffffff',
            }}
        >
            <Menu />
            <Box
                component="main"
                sx={{
                    padding: '15% 40px',
                    marginLeft: '240px',
                }}
            >
                <Box>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: 'white',
                            marginTop:'1%',
                            color: '#007BFF', // Replace with primaryColor if defined
                            borderRadius: '10px',
                            ':hover': {
                                bgcolor: '#007BFF', // Replace with primaryColor if defined
                                color: 'white',
                            },
                        }}
                        startIcon={<ArrowBackIosIcon />}
                        onClick={() => navigate("/admin/facilities")}
                    >
                        Back
                    </Button>
                    <Container
                        component="main"
                        maxWidth="xs"
                        sx={{ mt: 4, }}
                    >
                        <Typography
                            component="h1"
                            variant="h5"
                            sx={{
                                textAlign: 'center',
                                fontWeight: 'bold',
                                textDecoration: 'underline',
                                color: '#007BFF', // Replace with primaryColor if defined
                            }}
                        >
                            Add New Facility
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
                                autoFocus
                                fullWidth
                                id="facilityName"
                                label="Facility Name"
                                name="facilityName"
                                autoComplete="facility-name"
                                sx={textboxStyle}
                                value={form.facilityName}
                                onChange={handleChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="facilityDescription"
                                label="Facility Description"
                                name="facilityDescription"
                                autoComplete="facility-description"
                                sx={textboxStyle}
                                value={form.facilityDescription}
                                onChange={handleChange}
                            />
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
                                        color: '#fe9e0d',
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
                            ) : (
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={buttonStyle}
                                >
                                    Add
                                </Button>
                            )}
                        </Box>
                    </Container>
                </Box>
            </Box>
        </Grid2>
    );
}