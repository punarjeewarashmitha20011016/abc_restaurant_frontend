import React, { useState, useEffect } from "react";
import Menu from '../Menu';
import Axios from "axios";
import { useNavigate } from "react-router-dom";

import { Box, Typography, CircularProgress, Grid, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const primaryColor = '#fe9901'; // Primary button color
const hoverColor = '#ff7e00'; // Button hover color
const errorTextColor = 'red'; // Error text color
const iconButtonBackgroundColor = '#262626'; // Icon button background color
const editIconColor = '#66ff99'; // Edit icon color
const editIconHoverColor = '#009933'; // Edit icon hover color
const deleteIconColor = '#ff6666'; // Delete icon color
const deleteIconHoverColor = '#ff0000'; // Delete icon hover color

export default function Users() {
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        const userRole = sessionStorage.getItem('userRole');
        if (!userId || userRole !== '1') {
            navigate('/login');
        } else {
            loadUsers();
        }
    }, [navigate]);

    const loadUsers = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/user/allUsers`);
            setUsers(result.data);
        } catch (error) {
            console.error("Error loading users:", error);
            setError("Failed to load users. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (id) => {
        try {
            const response = await Axios.delete(`${process.env.REACT_APP_ENDPOINT}/api/user/${id}`);
            if (response.status === 200) {
                console.log('User deleted successfully');
                loadUsers();
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            setError("Failed to delete user. Please try again.");
        }
    };

    return (
        <Grid
            container
            sx={{
                minWidth: '800px',
                backgroundColor: '#ffffff',
            }}
        >
            <Grid item xs={12}>
                <Menu />
            </Grid>
            <Grid item xs={12}>
                <Box
                    component="main"
                    sx={{
                        padding: '17% 40px',
                        marginLeft: '240px',
                        backgroundColor: '#f5f5f5',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        
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
                            onClick={() => navigate('/admin/addUsers')}
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
                            Add new user
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
                    ) : users.length > 0 ? (
                        <>
                            <Box>
                                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                    <TableContainer sx={{ maxHeight: 600 }}>
                                        <Table stickyHeader aria-label="sticky table">
                                            <TableHead>
                                                <TableRow>
                                                    {["User ID", "First Name", "Last Name", "Address", "Email", "Role", "Action"].map(header => (
                                                        <TableCell
                                                            key={header}
                                                            align="center"
                                                            sx={{
                                                                backgroundColor: '#cccccc',
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
                                                {users.map((user) => (
                                                    <TableRow key={user.userId}>
                                                        <TableCell align="center" component="th" scope="row">{user.userId}</TableCell>
                                                        <TableCell align="center">{user.firstName}</TableCell>
                                                        <TableCell align="center">{user.lastName}</TableCell>
                                                        <TableCell align="center">{user.address}</TableCell>
                                                        <TableCell align="center">{user.email}</TableCell>
                                                        <TableCell align="center">
                                                            {user.role === 1 ? 'Admin' : user.role === 2 ? 'Staff' : 'Customer'}
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <IconButton
                                                                onClick={() => navigate('/admin/editUsers', { state: { userId: user.userId } })}
                                                                aria-label="edit"
                                                                sx={{
                                                                    color: editIconColor,
                                                                    backgroundColor: iconButtonBackgroundColor,
                                                                    marginRight: '3px',
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
                                                                onClick={() => deleteUser(user.userId)}
                                                                sx={{
                                                                    color: deleteIconColor,
                                                                    backgroundColor: iconButtonBackgroundColor,
                                                                    marginLeft: '3px',
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
                            <Box>
                                <Typography
                                    sx={{
                                        textAlign: 'center',
                                        mt: '20px',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Total Users: {users.length}
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
                            No Users Available.
                        </Typography>
                    )}
                </Box>
            </Grid>
        </Grid>
    );
}
