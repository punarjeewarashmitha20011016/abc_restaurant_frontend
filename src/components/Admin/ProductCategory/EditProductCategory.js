import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import Menu from "../Menu";
import { Box, Typography, CircularProgress, TextField, Button, Container } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { styled } from '@mui/material/styles';
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EditProductCategory() {

    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state;

    const [form, setForm] = useState({
        categoryName: "",
        categoryDescription: "",
        categoryImage: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        const userRole = sessionStorage.getItem('userRole');
        if (!userId || userRole !== '1') {
            navigate('/login');
        } else {
            loadCategory();
        }
    }, [navigate]);

    const loadCategory = async () => {
        setLoading(true);
        try {
            const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/productCategory/${id}`);
            setForm(result.data);
        } catch (error) {
            console.error("Error loading category data:", error);
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await Axios.put(`${process.env.REACT_APP_ENDPOINT}/api/productCategory/${id}`, form);
            navigate("/admin/productCategory");
        } catch (error) {
            console.error(error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

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

    const fileUploadBtn = {
        width: '100%',
        height: '50px',
        mt: 1.5,
        mb: 1,
        color: 'white',
        background: '#007BFF', // Replace with primaryColor if defined
        border: '2px solid #fe9e0d',
        ':hover': {
            bgcolor: '#0056b3', // Replace with hoverColor if defined
            color: 'white',
        },
    };

    return (
        <Grid2 container justifyContent="center" alignItems="center" sx={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
            <Menu />
            <Grid2 item xs={12} sm={8} md={6} lg={4}>
                <Box component="main" sx={{ padding: '30px', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', backgroundColor: '#ffffff' }}>
                            <CircularProgress size={70} thickness={4} sx={{ color: '#fe9e0d' }} />
                        </Box>
                    ) : (
                        <Box>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: 'white',
                                    color: '#007BFF', // Replace with primaryColor if defined
                                    borderRadius: '10px',
                                    ':hover': {
                                        bgcolor: '#007BFF', // Replace with primaryColor if defined
                                        color: 'white',
                                    },
                                }}
                                startIcon={<ArrowBackIosIcon />}
                                onClick={() => navigate("/admin/productCategory")}
                            >
                                Back
                            </Button>
                            <Container component="main" maxWidth="xs">
                                <Typography
                                    component="h1"
                                    variant="h5"
                                    sx={{
                                        textAlign: 'center',
                                        mt: '30px',
                                        mb: '10px',
                                        fontWeight: 'bold',
                                        textDecoration: 'underline',
                                        color: '#007BFF', // Replace with primaryColor if defined
                                    }}
                                >
                                    Edit Product Category
                                </Typography>
                                <Box
                                    component="form"
                                    onSubmit={handleSubmit}
                                    noValidate
                                    sx={{ mt: 1 }}
                                >
                                    <TextField
                                        margin="normal"
                                        required
                                        autoFocus
                                        fullWidth
                                        id="categoryName"
                                        label="Category Name"
                                        name="categoryName"
                                        autoComplete="category-name"
                                        sx={textboxStyle}
                                        value={form.categoryName}
                                        onChange={handleChange}
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="categoryDescription"
                                        label="Category Description"
                                        name="categoryDescription"
                                        autoComplete="category-description"
                                        sx={textboxStyle}
                                        value={form.categoryDescription}
                                        onChange={handleChange}
                                    />
                                    <Button
                                        component="label"
                                        role={undefined}
                                        variant="contained"
                                        tabIndex={-1}
                                        startIcon={<CloudUploadIcon />}
                                        sx={fileUploadBtn}
                                    >
                                        Upload Image
                                        <VisuallyHiddenInput type="file" accept="image/jpg, image/jpeg, image/png" />
                                    </Button>
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
        </Grid2>
    );
}
