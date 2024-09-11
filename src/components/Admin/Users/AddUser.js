// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import { Box, FormControl, Typography, CircularProgress } from "@mui/material";
// import Button from '@mui/material/Button';
// import Container from '@mui/material/Container';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
// import TextField from '@mui/material/TextField';
// import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
// import Axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Menu from "../Menu";

// export default function AddUser() {

//     let navigate = useNavigate();

//     useEffect(() => {
//         const userId = sessionStorage.getItem('userId');
//         const userRole = sessionStorage.getItem('userRole');
//         if (!userId || userRole !== '1') {
//             navigate('/login');
//         }
//     }, []);

//     const [form, setForm] = useState({
//         firstName: "",
//         lastName: "",
//         address: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//         role: "",
//     });
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

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
//             const response = await Axios.post(`${process.env.REACT_APP_ENDPOINT}/api/user/addUser`, form);
//             navigate("/admin/users");
//         } catch (error) {
//             console.error(error);
//             setError(error);
//         } finally {
//             setLoading(false);
//         }
//     };


//     const selectStyle = {
//         color: 'white',
//         '& .Mui-selected': {
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
//             <Menu />
//             <Box
//                 component="main"
//                 sx={{
//                     padding: '30px 40px',
//                     marginLeft: '240px',
//                 }}
//             >
//                 <Box>
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
//                         onClick={() => navigate("/admin/users")}
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
//                     ) : (
//                         <Container
//                             component="main"
//                             maxWidth="xs"
//                         >
//                             <Typography
//                                 component="h1"
//                                 variant="h5"
//                                 sx={{
//                                     textAlign: 'center',
//                                     fontWeight: 'bold',
//                                     textDecoration: 'underline',
//                                 }}
//                             >
//                                 Add New User
//                             </Typography>
//                             <Box
//                                 component="form"
//                                 onSubmit={handleSubmit}
//                                 noValidate
//                                 sx={{
//                                     mt: 1,
//                                 }}
//                             >
//                                 <FormControl fullWidth margin="normal" required sx={textboxStyle}>
//                                     <InputLabel id="selectRole">Role</InputLabel>
//                                     <Select
//                                         required
//                                         fullWidth
//                                         labelId="selectRole"
//                                         id="role"
//                                         label="Role"
//                                         autoFocus
//                                         sx={selectStyle}
//                                         name="role"
//                                         value={form.role}
//                                         onChange={handleChange}
//                                     >
//                                         <MenuItem value={1}>Admin</MenuItem>
//                                         <MenuItem value={2}>Staff</MenuItem>
//                                         <MenuItem value={3}>Customer</MenuItem>
//                                     </Select>
//                                 </FormControl>
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
//                                 <TextField
//                                     margin="normal"
//                                     required
//                                     fullWidth
//                                     name="password"
//                                     label="Password"
//                                     type="password"
//                                     id="password"
//                                     sx={textboxStyle}
//                                     value={form.password}
//                                     onChange={handleChange}
//                                 />
//                                 <TextField
//                                     margin="normal"
//                                     required
//                                     fullWidth
//                                     name="confirmPassword"
//                                     label="Confirm Password"
//                                     type="password"
//                                     id="confirmPassword"
//                                     sx={textboxStyle}
//                                     value={form.confirmPassword}
//                                     onChange={handleChange}
//                                 />
//                                 <Button
//                                     type="submit"
//                                     fullWidth
//                                     variant="contained"
//                                     sx={buttonStyle}
//                                 >
//                                     Add
//                                 </Button>
//                             </Box>
//                         </Container>
//                     )}
//                 </Box>
//             </Box>
//         </Grid2>
//     );
// }

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Box, FormControl, Typography, CircularProgress } from "@mui/material";
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../Menu";

export default function AddUser() {
    let navigate = useNavigate();

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        const userRole = sessionStorage.getItem('userRole');
        if (!userId || userRole !== '1') {
            navigate('/login');
        }
    }, [navigate]);

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        address: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        setLoading(true);
        try {
            await Axios.post(`${process.env.REACT_APP_ENDPOINT}/api/user/addUser`, form);
            navigate("/admin/users");
        } catch (error) {
            console.error(error);
            setError("Failed to add user. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const selectStyle = {
        color: 'white',
        '& .Mui-selected': {
            color: 'white',
        },
        "& .MuiOutlinedInput-notchedOutline": {
            borderWidth: "2px",
            borderColor: "#fe9e0d",
            "&.Mui-focused": {
                "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#fe9e0d",
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
        "& .MuiOutlinedInput-root": {
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Box shadow for text fields
            '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#007BFF',
                borderWidth: '3px',
            },
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
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Box shadow for button
    };

    return (
        <Grid2
            sx={{
                minWidth: '800px',
            }}
        >
            <Menu />
            <Box
                component="main"
                sx={{
                    padding: '30px 40px',
                    marginLeft: '240px',
                    backgroundColor: '#f5f5f5',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    borderRadius: '8px', // Added border radius
                }}
            >
                <Box>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: 'white',
                            color: '#007BFF',
                            borderRadius: '10px',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Box shadow for button
                            ':hover': {
                                bgcolor: '#007BFF', // Replace with primaryColor if defined
                                color: 'white',
                            },
                            marginTop:"1%",
                        }}
                        startIcon={<ArrowBackIosIcon />}
                        onClick={() => navigate("/admin/users")}
                    >
                        Back
                    </Button>
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
                        <Container
                            component="main"
                            maxWidth="xs"
                        >
                            <Typography
                                component="h1"
                                variant="h5"
                                sx={{
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                    textDecoration: 'underline',
                                    mb: 4,
                                    color: '#007BFF',
                                }}
                            >
                                Add New User
                            </Typography>
                            {error && (
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: 'red',
                                        textAlign: 'center',
                                        mb: 2,
                                    }}
                                >
                                    {error}
                                </Typography>
                            )}
                            <Box
                                component="form"
                                onSubmit={handleSubmit}
                                noValidate
                                sx={{
                                    mt: 1,
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Box shadow for form container
                                    padding: '20px',
                                    borderRadius: '8px',
                                    backgroundColor: 'white',
                                }}
                            >
                                <FormControl fullWidth margin="normal" required sx={textboxStyle}>
                                    <InputLabel id="selectRole">Role</InputLabel>
                                    <Select
                                        required
                                        fullWidth
                                        labelId="selectRole"
                                        id="role"
                                        label="Role"
                                        autoFocus
                                        sx={selectStyle}
                                        name="role"
                                        value={form.role}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={1}>Admin</MenuItem>
                                        <MenuItem value={2}>Staff</MenuItem>
                                        <MenuItem value={3}>Customer</MenuItem>
                                    </Select>
                                </FormControl>
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
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    sx={textboxStyle}
                                    value={form.password}
                                    onChange={handleChange}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirmPassword"
                                    sx={textboxStyle}
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={buttonStyle}
                                    disabled={loading}
                                >
                                    Add
                                </Button>
                            </Box>
                        </Container>
                    )}
                </Box>
            </Box>
        </Grid2>
    );
}

