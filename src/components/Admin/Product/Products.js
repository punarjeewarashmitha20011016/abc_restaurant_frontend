import React, { useState, useEffect } from "react";
import Menu from '../Menu';
import Axios from "axios";
import { useNavigate } from "react-router-dom";

import { Box, Typography, CircularProgress } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function Products() {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        const userRole = sessionStorage.getItem('userRole');
        if (!userId || userRole !== '1') {
            navigate('/login');
        } else {
            loadProducts();
            loadProductCategories();
        }
    }, [navigate]);

    const loadProducts = async () => {
        setLoading(true);
        try {
            const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/product/allProducts`);
            setProducts(result.data);
        } catch (error) {
            console.error("Error loading products:", error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const loadProductCategories = async () => {
        setLoading(true);
        try {
            const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/productCategory/allProductCategories`);
            setCategories(result.data);
        } catch (error) {
            console.error("Error loading product categories:", error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const getCategoryNames = (categoryIds) => {
        return categoryIds.map(id => {
            const category = categories.find(f => f.categoryId === id);
            return category ? category.categoryName : '';
        }).join(', ');
    };

    const deleteProduct = async (id) => {
        try {
            const response = await Axios.delete(`${process.env.REACT_APP_ENDPOINT}/api/product/${id}`);
            if (response.status === 200) {
                console.log('Product deleted successfully');
                loadProducts();
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
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
                    padding: '17% 40px',
                    marginLeft: '240px'
                }}
            >
                <Box
                    sx={{
                        textAlign: 'center',
                        margin: '20px auto 40px',
                    }}
                >
                    <Button
                        variant="contained"
                        onClick={() => navigate('/admin/addProduct')}
                        sx={{
                            backgroundColor: 'white',
                            color: '#007BFF', // Replace with primaryColor if defined
                            borderRadius: '10px',
                            ':hover': {
                                bgcolor: '#007BFF', // Replace with primaryColor if defined
                                color: 'white',
                            },
                        }}
                    >
                        Add new Product
                    </Button>
                </Box>
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
                        {error.message || "An unexpected error occurred."}
                    </Typography>
                ) : products.length > 0 ? (
                    <>
                        <Box>
                            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                <TableContainer sx={{ maxHeight: 600 }}>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell
                                                    align="center"
                                                    sx={{
                                                        backgroundColor: '#cccccc',
                                                    }}
                                                >
                                                    Name
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    sx={{
                                                        backgroundColor: '#cccccc',
                                                    }}
                                                >
                                                    Description
                                                </TableCell>
                                                {/* <TableCell
                                                    align="center"
                                                    sx={{
                                                        backgroundColor: '#cccccc',
                                                    }}
                                                >
                                                    Image
                                                </TableCell> */}
                                                <TableCell
                                                    align="center"
                                                    sx={{
                                                        backgroundColor: '#cccccc',
                                                    }}
                                                >
                                                    Price
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    sx={{
                                                        backgroundColor: '#cccccc',
                                                    }}
                                                >
                                                    Category
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    sx={{
                                                        backgroundColor: '#cccccc',
                                                    }}
                                                >
                                                    Status
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    sx={{
                                                        backgroundColor: '#cccccc',
                                                    }}
                                                >
                                                    Actions
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {products.map((product) => (
                                                <TableRow key={product.productId}>
                                                    <TableCell align="center">{product.productName}</TableCell>
                                                    <TableCell align="center">{product.productDescription}</TableCell>
                                                    {/* <TableCell align="center">{product.productImage}</TableCell> */}
                                                    <TableCell align="center">Rs.{product.productPrice}.00</TableCell>
                                                    <TableCell align="center">{getCategoryNames(product.productCategory)}</TableCell>
                                                    <TableCell align="center">{product.productStatus}</TableCell>
                                                    <TableCell align="center">
                                                        <IconButton
                                                            onClick={() => navigate('/admin/editProduct', { state: { productId: product.productId } })}
                                                            aria-label="edit"
                                                            sx={{
                                                                color: '#66ff99',
                                                                backgroundColor: '#262626',
                                                                marginRight: '3px',
                                                                ':hover': {
                                                                    color: '#009933',
                                                                }
                                                            }}
                                                        >
                                                            <EditIcon />
                                                        </IconButton>
                                                        <IconButton
                                                            aria-label="delete"
                                                            onClick={() => deleteProduct(product.productId)}
                                                            sx={{
                                                                color: '#ff6666',
                                                                backgroundColor: '#262626',
                                                                marginLeft: '3px',
                                                                ':hover': {
                                                                    color: '#ff0000',
                                                                }
                                                            }}
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        </Box>
                        <Box>
                            <Typography
                                sx={{
                                    textAlign: 'center',
                                    mt: '20px'
                                }}
                            >
                                Total products: {products.length}
                            </Typography>
                        </Box>
                    </>
                ) : (
                    <Typography
                        variant="h5"
                        sx={{
                            textAlign: 'center',
                            justifyContent: 'center',
                            margin: 'auto'
                        }}
                    >
                        No Product Available.
                    </Typography>
                )}
            </Box>
        </Grid2>
    );
}
