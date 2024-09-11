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

export default function Facilities() {
    const navigate = useNavigate();

    const [facilities, setFacilities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        const userRole = sessionStorage.getItem('userRole');
        if (!userId || userRole !== '1') {
            navigate('/login');
        } else {
            const fetchData = async () => {
                try {
                    await loadFacilities();
                } catch (err) {
                    setError("Failed to load facilities.");
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [navigate]);

    const loadFacilities = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/facility/allFacilities`);
            setFacilities(result.data);
        } catch (error) {
            console.error("Error loading facilities:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const deleteFacilities = async (id) => {
        setDeleting(true);
        try {
            const response = await Axios.delete(`${process.env.REACT_APP_ENDPOINT}/api/facility/${id}`);
            if (response.status === 200) {
                console.log('Facility deleted successfully');
                loadFacilities();
            }
        } catch (error) {
            console.error('Error deleting facility:', error);
        } finally {
            setDeleting(false);
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
                        onClick={() => navigate('/admin/addFacility')}
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
                        Add new Facility
                    </Button>
                </Box>
                <Box>
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
                    ) : facilities.length > 0 ? (
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
                                                Facility ID
                                            </TableCell>
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
                                        {facilities.map((facility) => (
                                            <TableRow key={facility.id}>
                                                <TableCell align="center" component="th" scope="row">{facility.facilityId}</TableCell>
                                                <TableCell align="center">{facility.facilityName}</TableCell>
                                                <TableCell align="center">{facility.facilityDescription}</TableCell>
                                                <TableCell align="center">
                                                    <IconButton
                                                        onClick={() => navigate('/admin/editFacility', { state: { id: facility.facilityId } })}
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
                                                        onClick={() => deleteFacilities(facility.facilityId)}
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

                    ) : (
                        <Typography
                            variant="h5"
                            sx={{
                                textAlign: 'center',
                                justifyContent: 'center',
                                margin: 'auto'
                            }}
                        >
                            No Facility Available.
                        </Typography>
                    )}
                </Box>
                <Box>
                    <Typography
                        sx={{
                            textAlign: 'center',
                            mt: '20px'
                        }}
                    >
                        {deleting ? "Deleting facility..." : `Total Facilities: ${facilities.length}`}
                    </Typography>
                </Box>
            </Box>
        </Grid2>
    );
}
