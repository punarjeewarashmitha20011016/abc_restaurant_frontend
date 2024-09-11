// import React, { useState, useEffect } from "react";
// import { Box, Typography, CircularProgress } from "@mui/material";
// import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Container from '@mui/material/Container';
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import Axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function EditDetails() {
//     let userId = "";
//     let navigate = useNavigate();
//     const [idUser, setIdUser] = useState(null)

//     useEffect(() => {
//         userId = sessionStorage.getItem('userId');
//         const userRole = sessionStorage.getItem('userRole');
//         setIdUser(userId)
//         if (!userId || userRole !== '3') {
//             navigate('/login');
//         }
//     }, [navigate]);


//     // const [role, setRole] = useState('');
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const [form, setForm] = useState({
//         firstName: "",
//         lastName: "",
//         address: "",
//         email: "",
//     });

//     useEffect(() => {
//         loadProfile();
//     }, []);

//     const loadProfile = async () => {
//         try {
//             const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/user/${userId}`);
//             setForm(result.data);
//         } catch (error) {
//             console.error("Error loading user data:", error);
//             setError(error);
//         } finally {
//             setLoading(false);
//         };
//     };

//     const handleChange = (event) => {
//         const { name, value } = event.target;
//         setForm((prevForm) => ({
//             ...prevForm,
//             [name]: value,
//         }));
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         setLoading(true);
//         try {
//             const response = await Axios.put(`${process.env.REACT_APP_ENDPOINT}/api/user/${idUser}`, form);
//             navigate("/user/dashboard'");
//         } catch (error) {
//             console.error(error);
//             setError(error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const textboxStyle = {
//         input: {
//             color: 'white',
//         },
//         "& .MuiOutlinedInput-notchedOutline": {
//             borderWidth: "2px",
//             borderColor: "#fe9e0d",
//             "&.Mui-focused": {
//                 "& .MuiOutlinedInput-notchedOutline": {
//                     borderColor: "#fe9e0d",
//                     borderWidth: "3px",
//                 },
//             },
//         },
//         "& .MuiInputLabel-outlined": {
//             color: "#ffffff",
//             fontWeight: "bold",
//             borderColor: "#fe9e0d",
//         },
//     };

//     const buttonStyle = {
//         mt: 3,
//         color: 'white',
//         background: '#fe9e0d',
//         ':hover': {
//             bgcolor: ' #cb7a01',
//             color: 'white',
//         },
//     };

//     return (
//         <Grid2
//             sx={{
//                 minWidth: '800px',
//             }}
//         >
//             <Box
//                 component="main"
//                 sx={{
//                     padding: '30px 40px',
//                     marginLeft: '240px',
//                 }}
//             >
//                 <Box
//                     sx={{ marginTop: 'auto' }}
//                 >
//                     <Button
//                         variant="contained"
//                         sx={{
//                             backgroundColor: 'white',
//                             color: '#fe9e0d',
//                             borderRadius: '10px',
//                             ':hover': {
//                                 bgcolor: ' #fe9e0d',
//                                 color: 'white',
//                             },
//                         }}
//                         startIcon={<ArrowBackIosIcon />}
//                         onClick={() => navigate("/user/dashboard'")}
//                     >
//                         Back
//                     </Button>
//                     {loading ? (
//                         <Box
//                             sx={{
//                                 display: 'flex',
//                                 justifyContent: 'center',
//                                 alignItems: 'center',
//                                 height: '90vh',
//                             }}
//                         >
//                             <CircularProgress
//                                 size={70}
//                                 thickness={4}
//                                 sx={{
//                                     color: '#fe9e0d',
//                                 }}
//                             />
//                         </Box>
//                     ) : error ? (
//                         <Typography
//                             variant="h5"
//                             sx={{
//                                 textAlign: 'center',
//                                 justifyContent: 'center',
//                                 margin: 'auto',
//                                 color: 'red',
//                             }}
//                         >
//                             {error}
//                         </Typography>
//                     ) : (
//                         <Container
//                             component="main"
//                             maxWidth="xs"
//                         >
//                             <Typography
//                                 component="h1"
//                                 variant="h4"
//                                 sx={{
//                                     textAlign: 'center',
//                                     mt: '50px',
//                                     mb: '30px',
//                                     fontWeight: 'bold',
//                                     textDecoration: 'underline',
//                                 }}
//                             >
//                                 Update Profile Details
//                             </Typography>
//                             <Box
//                                 component="form"
//                                 onSubmit={handleSubmit}
//                                 sx={{
//                                     mt: 1,
//                                 }}
//                             >
//                                 <TextField
//                                     margin="normal"
//                                     required
//                                     fullWidth
//                                     id="firstName"
//                                     label="First Name"
//                                     name="firstName"
//                                     autoComplete="first-name"
//                                     sx={textboxStyle}
//                                     value={form.firstName}
//                                     onChange={handleChange}
//                                 />
//                                 <TextField
//                                     margin="normal"
//                                     required
//                                     fullWidth
//                                     id="lastName"
//                                     label="Last Name"
//                                     name="lastName"
//                                     autoComplete="family-name"
//                                     sx={textboxStyle}
//                                     value={form.lastName}
//                                     onChange={handleChange}
//                                 />
//                                 <TextField
//                                     margin="normal"
//                                     required
//                                     fullWidth
//                                     id="address"
//                                     label="Address"
//                                     name="address"
//                                     autoComplete="address"
//                                     sx={textboxStyle}
//                                     value={form.address}
//                                     onChange={handleChange}
//                                 />
//                                 <TextField
//                                     margin="normal"
//                                     required
//                                     fullWidth
//                                     id="email"
//                                     label="Email Address"
//                                     name="email"
//                                     autoComplete="email"
//                                     sx={textboxStyle}
//                                     value={form.email}
//                                     onChange={handleChange}
//                                 />
//                                 <Button
//                                     type="submit"
//                                     fullWidth
//                                     variant="contained"
//                                     sx={buttonStyle}
//                                 >
//                                     Update
//                                 </Button>
//                             </Box>
//                         </Container>
//                     )}
//                 </Box>
//             </Box>
//         </Grid2>
//     )
// }

import React, { useState, useEffect } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EditDetails() {
    let userId = "";
    let navigate = useNavigate();
    const [idUser, setIdUser] = useState(null)

    useEffect(() => {
        userId = sessionStorage.getItem('userId');
        const userRole = sessionStorage.getItem('userRole');
        setIdUser(userId);
        if (!userId || userRole !== '3') {
            navigate('/login');
        }
    }, [navigate]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        address: "",
        email: "",
    });

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/user/${userId}`);
            setForm(result.data);
        } catch (error) {
            console.error("Error loading user data:", error);
            setError(error);
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            await Axios.put(`${process.env.REACT_APP_ENDPOINT}/api/user/${idUser}`, form);
            navigate("/user/dashboard'");
        } catch (error) {
            console.error(error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const textboxStyle = {
        input: {
            color: 'white',
        },
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#fbc02d",  // Yellow border
            "&.Mui-focused": {
                borderColor: "#f9a825",  // Darker yellow on focus
            },
        },
        "& .MuiInputLabel-outlined": {
            color: "#ffffff",
            fontWeight: "bold",
        },
    };

    const buttonStyle = {
        mt: 3,
        color: 'white',
        backgroundColor: '#fbc02d',  // Yellow background
        ':hover': {
            bgcolor: '#f9a825',  // Darker yellow on hover
        },
    };

    return (
        <Grid2
            container
            justifyContent="center"
            alignItems="center"
            sx={{ minHeight: '100vh' }}
        >
            <Container
                component="main"
                maxWidth="xs"
                sx={{
                    backgroundColor: '#424242',  // Dark background for contrast
                    padding: '30px 40px',
                    borderRadius: '10px',
                }}
            >
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{
                        textAlign: 'center',
                        mb: '30px',
                        fontWeight: 'bold',
                        color: 'white',
                    }}
                >
                    Update Profile Details
                </Typography>
                {loading ? (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                        }}
                    >
                        <CircularProgress
                            size={70}
                            thickness={4}
                            sx={{ color: '#fbc02d' }}
                        />
                    </Box>
                ) : error ? (
                    <Typography
                        variant="h5"
                        sx={{
                            textAlign: 'center',
                            color: 'red',
                        }}
                    >
                        {error}
                    </Typography>
                ) : (
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            name="firstName"
                            autoComplete="first-name"
                            sx={textboxStyle}
                            value={form.firstName}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="family-name"
                            sx={textboxStyle}
                            value={form.lastName}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="address"
                            label="Address"
                            name="address"
                            autoComplete="address"
                            sx={textboxStyle}
                            value={form.address}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            sx={textboxStyle}
                            value={form.email}
                            onChange={handleChange}
                        />

                        {/* Button Layout */}
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                mt: 3,
                            }}
                        >
                            <Button
                               variant="contained"
                               sx={buttonStyle}
                                startIcon={<ArrowBackIosIcon />}
                                onClick={() => navigate("/user/dashboard")}
                            >
                                Back
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={buttonStyle}
                            >
                                Update
                            </Button>
                        </Box>
                    </Box>
                )}
            </Container>
        </Grid2>
    )
}
