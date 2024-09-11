import React, { useEffect, useState } from "react";
import Menu from "../Menu";
import { Box, Typography, CircularProgress } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { styled } from '@mui/material/styles';
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddProductCategory() {

    let navigate = useNavigate();

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        const userRole = sessionStorage.getItem('userRole');
        if (!userId || userRole !== '1') {
            navigate('/login');
        }
    }, [navigate]);

    const [form, setForm] = useState({
        categoryName: "",
        categoryDescription: "",
        categoryImage: "",
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
        try {
            const response = await Axios.post(`${process.env.REACT_APP_ENDPOINT}/api/productCategory/addProductCategory`, form);
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
        <Grid2
            container
            justifyContent="center"
            alignItems="center"
            sx={{
                minHeight: '100vh', // Ensures full viewport height
                backgroundColor: '#ffffff',
            }}
        >
            <Menu />
            <Box
                component="main"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '30px',
                    width: '100%',
                }}
            >
                <Container
                    component="main"
                    maxWidth="sm"
                    sx={{
                        backgroundColor: '#f5f5f5',
                        padding: '20px',
                        marginRight:'220px',
                        borderRadius: '10px',
                        boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)',
                    }}
                >
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: 'white',
                            color: '#fe9e0d',
                            borderRadius: '10px',
                            mb: 2,
                            ':hover': {
                                bgcolor: '#fe9e0d',
                                color: 'white',
                            },
                        }}
                        startIcon={<ArrowBackIosIcon />}
                        onClick={() => navigate("/admin/productCategory")}
                    >
                        Back
                    </Button>
                    <Typography
                        component="h1"
                        variant="h5"
                        sx={{
                            textAlign: 'center',
                            fontWeight: 'bold',
                            textDecoration: 'underline',
                            mb: 3,
                        }}
                    >
                        Add New Product Category
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
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
                            variant="contained"
                            startIcon={<CloudUploadIcon />}
                            sx={fileUploadBtn}
                        >
                            Upload Image
                            <VisuallyHiddenInput type="file" accept="image/jpg, image/jpeg, image/png" />
                        </Button>
                        {loading ? (
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '100px',
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
                                    color: 'red',
                                    mt: 2,
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
        </Grid2>
    );
}
