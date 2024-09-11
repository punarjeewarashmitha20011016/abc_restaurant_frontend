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

export default function Offer() {
    const navigate = useNavigate();

    const [offers, setOffers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        const userRole = sessionStorage.getItem('userRole');
        if (!userId || userRole !== '1') {
            navigate('/login');
        } else {
            loadOffers();
            loadCategories();
        }
    }, [navigate]);

    const loadOffers = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/offer/allOffers`);
            setOffers(result.data);
        } catch (error) {
            console.error("Error loading offers:", error);
        } finally {
            setLoading(false);
        }
    };

    const loadCategories = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/productCategory/allProductCategories`);
            setCategories(result.data);
        } catch (error) {
            console.error("Error loading product categories:", error);
        }
    };

    const getCategoryNames = (categoryIds) => {
        return categoryIds.map(id => {
            const category = categories.find(f => f.categoryId === id);
            return category ? category.categoryName : '';
        }).join(', ');
    };

    const deleteOffer = async (id) => {
        try {
            const response = await Axios.delete(`${process.env.REACT_APP_ENDPOINT}/api/offer/${id}`);
            if (response.status === 200) {
                console.log('Offer deleted successfully');
                loadOffers();
            }
        } catch (error) {
            console.error('Error deleting offer:', error);
        }
    };

    const getDate = (dateTime) => {
        return (dateTime.substring(0, 10));
    }

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
                ) : (
                    <Box>
                        <Box
                            sx={{
                                textAlign: 'center',
                                margin: '20px auto 40px',
                            }}
                        >
                            <Button
                                variant="contained"
                                onClick={() => navigate('/admin/addOffer')}
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
                                Add new Offer
                            </Button>
                        </Box>
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
                                                    Offer Id
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    sx={{
                                                        backgroundColor: '#cccccc',
                                                    }}
                                                >
                                                    Offer Name
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    sx={{
                                                        backgroundColor: '#cccccc',
                                                    }}
                                                >
                                                    Description
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    sx={{
                                                        backgroundColor: '#cccccc',
                                                    }}
                                                >
                                                    Image
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    sx={{
                                                        backgroundColor: '#cccccc',
                                                    }}
                                                >
                                                    Offer Price
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    sx={{
                                                        backgroundColor: '#cccccc',
                                                    }}
                                                >
                                                    Offer Discount
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
                                                    From
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    sx={{
                                                        backgroundColor: '#cccccc',
                                                    }}
                                                >
                                                    To
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    sx={{
                                                        backgroundColor: '#cccccc',
                                                    }}
                                                >
                                                    Categories
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
                                            {offers.map((offer) => (
                                                <TableRow key={offer.id}>
                                                    <TableCell align="center" component="th" scope="row">{offer.offerId}</TableCell>
                                                    <TableCell align="center">{offer.offerName}</TableCell>
                                                    <TableCell align="center">{offer.offerDescription}</TableCell>
                                                    <TableCell align="center">
                                                        <Button variant="contained">View</Button>
                                                    </TableCell>
                                                    <TableCell align="center">{offer.offerPrice}</TableCell>
                                                    <TableCell align="center">{offer.offerDiscount}</TableCell>
                                                    <TableCell align="center">{offer.offerStatus}</TableCell>
                                                    <TableCell align="center">{getDate(offer.offerStartDate)}</TableCell>
                                                    <TableCell align="center">{getDate(offer.offerEndDate)}</TableCell>
                                                    <TableCell align="center">{getCategoryNames(offer.offerCategory)}</TableCell>
                                                    <TableCell align="center">
                                                        <IconButton
                                                            onClick={() => navigate('/admin/editOffer', { state: { id: offer.id } })}
                                                            aria-label="edit"
                                                            sx={{
                                                                margin: '5px',
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
                                                            onClick={() => deleteOffer(offer.id)}
                                                            sx={{
                                                                margin: '5px',
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
                                Total Offers: {offers.length}
                            </Typography>
                        </Box>
                    </Box>
                )}
            </Box>
        </Grid2>
    );
}
