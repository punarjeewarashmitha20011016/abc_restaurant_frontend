import React, { useState, useEffect } from "react";
import Menu from "../Menu";
import { Box, FormControl, Typography, CircularProgress } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        productName: "",
        productDescription: "",
        productImage: "",
        productPrice: "",
        productCategory: [],
        productStatus: "",
    });

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        const userRole = sessionStorage.getItem('userRole');
        if (!userId || userRole !== '1') {
            navigate('/login');
        } else {
            loadCategories();
        }
    }, [navigate]);

    const loadCategories = async () => {
        setLoading(true);
        try {
            const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/productCategory/allProductCategories`);
            setCategories(result.data);
        } catch (error) {
            console.error("Error loading categories:", error);
            setError(error.message || "An error occurred while loading categories.");
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

    const handleCategoryChange = (event) => {
        const { value } = event.target;
        setForm((prevForm) => ({
            ...prevForm,
            productCategory: typeof value === 'string' ? value.split(',') : value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
    
        // Create a FormData object
        const formData = new FormData();
    
        // Append the product data (assuming `form` contains all the product fields)
        formData.append('product', new Blob([JSON.stringify(form)], { type: 'application/json' }));
    
        // Append the file if it's present (assuming `file` is stored in your state)
        if (form.file) {
            formData.append('file', form.file);
        }
    
        try {
            const response = await Axios.post(
                `${process.env.REACT_APP_ENDPOINT}/api/product/addProduct`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
    
            navigate("/admin/products");
        } catch (error) {
            console.error(error);
            setError(error.message || "An error occurred while adding the product.");
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

    const selectStyle = {
        color: 'black',
        '& .Mui-selected': {
            color: 'white',
        },
        "& .MuiOutlinedInput-notchedOutline": {
            borderWidth: "2px",
            borderColor: "#007BFF",
            "&.Mui-focused": {
                "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#007BFF",
                    borderWidth: "3px",
                },
            },
        },
        "& .MuiInputLabel-outlined": {
            color: "#ffffff",
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
            sx={{
                minWidth: '800px',  backgroundColor: '#ffffff'
            }}
        >
            <Menu />
            <Box
                component="main"
                sx={{
                    padding: '30px 40px',
                    marginLeft: '240px',
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
                        onClick={() => navigate("/admin/products")}
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
                                color: '#007BFF', // Replace with primaryColor if defined
                            }}
                        >
                            Add Product
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
                                id="productName"
                                label="Product Name"
                                name="productName"
                                autoComplete="product-name"
                                sx={textboxStyle}
                                value={form.productName}
                                onChange={handleChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="productDescription"
                                label="Description"
                                name="productDescription"
                                autoComplete="product-description"
                                sx={textboxStyle}
                                value={form.productDescription}
                                onChange={handleChange}
                            />
                            <Button
                                id="productImage"
                                name="productImage"
                                value={form.productImage}
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                                sx={fileUploadBtn}
                            >
                                Upload Image
                                <VisuallyHiddenInput type="file" accept="image/jpg, image/jpeg, image/png" style={{ display: 'none' }} />
                            </Button>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="productPrice"
                                label="Price"
                                name="productPrice"
                                autoComplete="product-price"
                                sx={textboxStyle}
                                value={form.productPrice}
                                onChange={handleChange}
                            />

                            <FormControl fullWidth margin="normal" required sx={textboxStyle}>
                                <InputLabel id="selectCategory">Categories</InputLabel>
                                <Select
                                    multiple
                                    fullWidth
                                    labelId="selectCategory"
                                    id="productCategory"
                                    label="Categories"
                                    sx={selectStyle}
                                    name="productCategory"
                                    value={form.productCategory}
                                    onChange={handleCategoryChange}
                                    renderValue={(selected) => selected.map(categoryId => {
                                        const category = categories.find(f => f.categoryId === categoryId);
                                        return category ? category.categoryName : '';
                                    }).join(', ')}
                                >
                                    {categories.map((category) => (
                                        <MenuItem key={category.categoryId} value={category.categoryId}>{category.categoryName}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl>
                                <FormLabel id="productStatus" sx={{ color: 'black', mt: 2 }}>Status</FormLabel>
                                <RadioGroup
                                    row
                                    required
                                    aria-labelledby="productStatus"
                                    name="productStatus"
                                    onChange={handleChange}
                                >
                                    <FormControlLabel sx={{ color: 'black'}} value="Available" control={<Radio />} label="Available" />
                                    <FormControlLabel sx={{ color: 'black'}} value="Unavailable" control={<Radio />} label="Unavailable" />

                                </RadioGroup>
                            </FormControl>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={buttonStyle}
                            >
                                Add
                            </Button>
                        </Box>
                    </Container>
                </Box>
                )}
            </Box>
        </Grid2>
    );
}
