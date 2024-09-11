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

export default function ProductCategory() {
    const navigate = useNavigate();

    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        const userRole = sessionStorage.getItem('userRole');
        if (!userId || userRole !== '1') {
            navigate('/login');
        } else {
            loadGallery();
        }
    }, [navigate]);

    const loadGallery = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/gallery/allGallery`);
            setImages(result.data);
            setLoading(false);
        } catch (error) {
            console.error("Error loading gallery:", error);
            setLoading(false);
        }
    };

    const deleteGallery = async (id) => {
        try {
            const response = await Axios.delete(`${process.env.REACT_APP_ENDPOINT}/api/gallery/${id}`);
            if (response.status === 200) {
                console.log('Image deleted successfully');
                loadGallery();
            }
        } catch (error) {
            console.error('Error deleting image:', error);
        }
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
                    padding: '22% 40px',
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
                        onClick={() => navigate('/admin/addGallery')}
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
                    >
                        Add new Image
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
                ) : (
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
                                                Image Name
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
                                                Uploaded by
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                sx={{
                                                    backgroundColor: '#cccccc',
                                                }}
                                            >
                                                Date
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                sx={{
                                                    backgroundColor: '#cccccc',
                                                }}
                                            >
                                                Action
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {images.map((image) => (
                                            <TableRow key={image.imgId}>
                                                <TableCell align="center">{image.imgName}</TableCell>
                                                <TableCell align="center">{image.imgDescription}</TableCell>
                                                <TableCell align="center"></TableCell>
                                                <TableCell align="center">{image.uploadedBy}</TableCell>
                                                <TableCell align="center">{image.uploadedDate}</TableCell>
                                                <TableCell align="center">
                                                    <IconButton
                                                        onClick={() => navigate('/admin/editGallery', { state: { id: image.imgId } })}
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
                                                        onClick={() => deleteGallery(image.imgId)}
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
                )}
                <Box>
                    <Typography
                        sx={{
                            textAlign: 'center',
                            mt: '20px'
                        }}
                    >
                        Total Images: {images.length}
                    </Typography>
                </Box>
            </Box>
        </Grid2>
    );
}
