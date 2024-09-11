import React, { useEffect, useState } from "react";
import Menu from "../Menu";
import Card from "./Card";
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Typography } from "@mui/material";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Products() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
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
                    await loadProductCategory();
                    await loadProduct();
                } catch (err) {
                    setError("Failed to load products or categories.");
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [navigate]);

    const loadProductCategory = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/productCategory/allProductCategories`);
            setCategories(result.data);
        } catch (error) {
            console.error("Error loading categories:", error);
            throw error;
        }
    };

    const loadProduct = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/product/allProducts`);
            setProducts(result.data);
        } catch (error) {
            console.error("Error loading products:", error);
            throw error;
        }
    };

    // Style objects
    const box1Style = {
        padding: '30px 0px 30px 40px',
        marginLeft: '240px',
        height: '92vh',
        marginBottom: '20px',
        backgroundColor: '#ffffff',
        overflowY: 'auto',
    };

    const box2Style = {
        marginBottom: '30px',
    };

    const box3Style = {
        display: 'flex',
        flexDirection: 'row',
        overflowX: 'scroll',
        flex: '0 0 auto',
        gap: '15px',
        padding: '10px 0',
    };

    const categoryTitleStyle = {
        marginBottom: '10px',
        fontWeight: 'bold',
        color: '#007BFF', // Use primary color
    };

    const noProductTextStyle = {
        textAlign: 'center',
        justifyContent: 'center',
        margin: 'auto',
        color: 'gray',
    };

    const errorTextStyle = {
        textAlign: 'center',
        justifyContent: 'center',
        margin: 'auto',
        color: 'red',
    };

    const loadingSpinnerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
    };

    const loadingSpinner = {
        color: '#fe9e0d', // Use orange accent
    };

    return (
        <Box>
            <Menu />
            <Box component="main" sx={box1Style}>
                {loading ? (
                    <Box sx={loadingSpinnerStyle}>
                        <CircularProgress size={70} thickness={4} sx={loadingSpinner} />
                    </Box>
                ) : error ? (
                    <Typography variant="h5" sx={errorTextStyle}>
                        {error}
                    </Typography>
                ) : categories.length > 0 && products.length > 0 ? (
                    categories.map((category) => {
                        const categoryProducts = products.filter(product =>
                            product.productCategory.includes(category.categoryId)
                        );

                        if (categoryProducts.length === 0) {
                            return null;
                        }

                        return (
                            <Box key={category.categoryId} sx={box2Style}>
                                <Typography variant="h5" sx={categoryTitleStyle}>
                                    {category.categoryName}
                                </Typography>
                                <Box sx={box3Style}>
                                    {categoryProducts.map((product) => (
                                        <Card key={product.id} product={product} />
                                    ))}
                                </Box>
                            </Box>
                        );
                    })
                ) : (
                    <Typography variant="h5" sx={noProductTextStyle}>
                        No Product Available.
                    </Typography>
                )}
            </Box>
        </Box>
    );
}
