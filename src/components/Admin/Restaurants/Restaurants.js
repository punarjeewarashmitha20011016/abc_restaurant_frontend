import React, { useState, useEffect } from "react";
import Menu from '../Menu';
import Axios from "axios";
import { useNavigate } from "react-router-dom";

import { Box, Typography, CircularProgress, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

// Define color theme
const primaryColor = '#fe9901'; // Button primary color
const hoverColor = '#ff7e00'; // Button hover color
const errorTextColor = 'red'; // Error text color
const iconColor = '#333'; // Icon button background color
const editIconColor = '#66ff99'; // Edit icon color
const editIconHoverColor = '#009933'; // Edit icon hover color
const deleteIconColor = '#ff6666'; // Delete icon color
const deleteIconHoverColor = '#ff0000'; // Delete icon hover color

export default function Restaurents() {
    const navigate = useNavigate();

    const [restaurents, setRestaurents] = useState([]);
    const [Facilities, setFacilities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        const userRole = sessionStorage.getItem('userRole');
        if (!userId || userRole !== '1') {
            navigate('/login');
        } else {
            loadRestaurents();
            loadFacilities();
        }
    }, [navigate]);

    const loadRestaurents = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/restaurent/allRestaurents/`);
            setRestaurents(result.data);
        } catch (error) {
            console.error("Error loading restaurants:", error);
            setError("Failed to load restaurants. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const loadFacilities = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/facility/allFacilities`);
            setFacilities(result.data);
        } catch (error) {
            console.error("Error loading facilities:", error);
            setError("Failed to load facilities. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const getFacilityNames = (facilityIds) => {
        return facilityIds.map(id => {
            const facility = Facilities.find(f => f.facilityId === id);
            return facility ? facility.facilityName : '';
        }).join(', ');
    };

    const deleteRestaurents = async (id) => {
        try {
            const response = await Axios.delete(`${process.env.REACT_APP_ENDPOINT}/api/restaurent/${id}`);
            if (response.status === 200) {
                console.log('Restaurant deleted successfully');
                loadRestaurents();
            }
        } catch (error) {
            console.error('Error deleting restaurant:', error);
            setError("Failed to delete restaurant. Please try again.");
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
                    marginLeft: '240px', // Ensure this matches the Drawer width
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
                        onClick={() => navigate('/admin/addRestaurants')}
                        sx={{
                            backgroundColor: '#007BFF',
                            color: '#fff',
                            ':hover': {
                                bgcolor: 'white',
                                color: 'black',
                            },
                            borderRadius: '20px',
                            padding: '10px 20px',
                        }}
                    >
                        Add new Location
                    </Button>
                </Box>
                {loading ? (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '70vh',
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
                ) : error ? (
                    <Typography
                        variant="h5"
                        sx={{
                            textAlign: 'center',
                            color: errorTextColor,
                        }}
                    >
                        {error}
                    </Typography>
                ) : restaurents.length > 0 ? (
                    <>
                        <Box>
                            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                <TableContainer sx={{ maxHeight: 600 }}>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                                {["Location Name", "Address", "City", "District", "Phone", "Facilities", "Action"].map((header) => (
                                                    <TableCell
                                                        key={header}
                                                        align="center"
                                                        sx={{
                                                            backgroundColor: '#e0e0e0',
                                                            fontWeight: 'bold',
                                                            color: '#333',
                                                        }}
                                                    >
                                                        {header}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {restaurents.map((restaurent) => (
                                                <TableRow key={restaurent.locationId}>
                                                    <TableCell align="center">{restaurent.locationName}</TableCell>
                                                    <TableCell align="center">{restaurent.locationAddress}</TableCell>
                                                    <TableCell align="center">{restaurent.locationCity}</TableCell>
                                                    <TableCell align="center">{restaurent.locationDistrict}</TableCell>
                                                    <TableCell align="center">{restaurent.locationPhone}</TableCell>
                                                    <TableCell align="center">{getFacilityNames(restaurent.locationFacilities)}</TableCell>
                                                    <TableCell align="center">
                                                        <IconButton
                                                            onClick={() => navigate('/admin/editRestaurants', { state: { locationId: restaurent.locationId } })}
                                                            aria-label="edit"
                                                            sx={{
                                                                color: editIconColor,
                                                                backgroundColor: iconColor,
                                                                marginRight: '4px',
                                                                ':hover': {
                                                                    color: editIconHoverColor,
                                                                    backgroundColor: '#444',
                                                                }
                                                            }}
                                                        >
                                                            <EditIcon />
                                                        </IconButton>
                                                        <IconButton
                                                            aria-label="delete"
                                                            onClick={() => deleteRestaurents(restaurent.locationId)}
                                                            sx={{
                                                                color: deleteIconColor,
                                                                backgroundColor: iconColor,
                                                                marginLeft: '4px',
                                                                ':hover': {
                                                                    color: deleteIconHoverColor,
                                                                    backgroundColor: '#444',
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
                        <Box
                            sx={{
                                textAlign: 'center',
                                marginTop: '20px',
                            }}
                        >
                            <Typography
                                sx={{
                                    fontWeight: 'bold',
                                }}
                            >
                                Total Locations: {restaurents.length}
                            </Typography>
                        </Box>
                    </>
                ) : (
                    <Typography
                        variant="h5"
                        sx={{
                            textAlign: 'center',
                            margin: 'auto',
                        }}
                    >
                        No Restaurant Available.
                    </Typography>
                )}
            </Box>
        </Grid2>
    );
}




