import React, { useEffect, useState } from 'react';
import Menu from '../Menu';
import { Box, Typography, CircularProgress, Button, Container } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useNavigate } from "react-router-dom";
import Axios from 'axios';

export default function Profile() {
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();
    const [details, setDetails] = useState({});
    const [role, setRole] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchedUserId = sessionStorage.getItem('userId');
        const userRole = sessionStorage.getItem('userRole');
        if (!fetchedUserId || userRole !== '2') {
            navigate('/login');
        } else {
            setUserId(fetchedUserId);
            const fetchData = async () => {
                try {
                    await loadProfile(fetchedUserId);
                } catch (err) {
                    setError("Failed to load Profile Details.");
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [navigate]);

    const loadProfile = async (fetchedUserId) => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/user/${fetchedUserId}`);
            setDetails(result.data);
            if (result.data.role) {
                await loadRole(result.data.role);
            }
        } catch (error) {
            console.error("Error loading profile details:", error);
            setError("Failed to load Profile Details.");
        }
    };

    const loadRole = async (roleId) => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/role/${roleId}`);
            setRole(result.data);
        } catch (error) {
            console.error("Error loading role details:", error);
            setError("Failed to load Role Details.");
        }
    };

    const buttonStyle = {
        backgroundColor: 'white',
        color: '#007BFF',
        borderRadius: '10px',
        border: '1px solid #007BFF',
        ':hover': {
            bgcolor: '#007BFF',
            color: 'white',
        },
        textTransform: 'none',
        fontWeight: 'bold',
    };

    return (
        <Grid2 container sx={{ minWidth: '800px', backgroundColor: '#ffffff' }}>
            <Menu />
            <Box component="main" sx={{ padding: '11%', marginLeft: '240px', width: '100%' }}>
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
                            sx={{ color: '#fe9e0d' }}
                        />
                    </Box>
                ) : error ? (
                    <Typography variant='h6' sx={{ textAlign: 'center', color: 'red' }}>
                        {error}
                    </Typography>
                ) : details ? (
                    <Container component="main" maxWidth="md">
                        <Typography
                            component="h1"
                            variant="h4"
                            sx={{
                                textAlign: 'center',
                                mt: 4,
                                mb: 4,
                                fontWeight: 'bold',
                                textDecoration: 'underline',
                                color: '#000000',
                            }}
                        >
                            Profile Details
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <tbody>
                                    {[
                                        { label: 'First Name', value: details.firstName },
                                        { label: 'Last Name', value: details.lastName },
                                        { label: 'Address', value: details.address },
                                        { label: 'Email', value: details.email },
                                        { label: 'Role', value: role.roleName },
                                    ].map(({ label, value }) => (
                                        <tr key={label} style={{ borderBottom: '1px solid #ddd' }}>
                                            <td style={{ width: '45%', textAlign: 'right', padding: '8px' }}>
                                                <Typography variant="h6" sx={{ color: '#000000' }}>
                                                    {label}
                                                </Typography>
                                            </td>
                                            <td style={{ width: '10%', textAlign: 'center', padding: '8px' }}>
                                                <Typography variant="h6" sx={{ color: '#000000' }}>
                                                    :
                                                </Typography>
                                            </td>
                                            <td style={{ width: '45%', textAlign: 'left', padding: '8px' }}>
                                                <Typography variant="h6" sx={{ color: '#000000' }}>
                                                    {value}
                                                </Typography>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Box display='flex' sx={{ mt: 3, justifyContent: 'center' }}>
                                <Button
                                    variant="contained"
                                    sx={buttonStyle}
                                    onClick={() => navigate('/staff/changePassword')}
                                >
                                    Change Password
                                </Button>
                            </Box>
                        </Box>
                    </Container>
                ) : (
                    <Typography variant='h6' sx={{ textAlign: 'center' }}>
                        No Details Found.
                    </Typography>
                )}
            </Box>
        </Grid2>
    );
}
