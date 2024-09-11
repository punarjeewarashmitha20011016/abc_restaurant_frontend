// import React, { useState, useEffect } from "react";
// import Menu from "../Menu";
// import { Box, FormControl, Typography, CircularProgress } from "@mui/material";
// import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Container from '@mui/material/Container';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import InputLabel from '@mui/material/InputLabel';
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import Axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function AddUser() {
//     const navigate = useNavigate();

//     const [form, setForm] = useState({
//         locationName: "",
//         locationAddress: "",
//         locationCity: "",
//         locationDistrict: "",
//         locationPhone: "",
//         locationFacilities: [],
//     });

//     const [Facilities, setFacilities] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const userId = sessionStorage.getItem('userId');
//         const userRole = sessionStorage.getItem('userRole');
//         if (!userId || userRole !== '1') {
//             navigate('/login');
//         } else {
//             loadFacilities();
//         }
//     }, []);

//     const loadFacilities = async () => {
//         setLoading(true);
//         try {
//             const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/facility/allFacilities`);
//             setFacilities(result.data);
//         } catch (error) {
//             console.error("Error loading user data:", error);
//             setError(error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleChange = (event) => {
//         const { name, value } = event.target;
//         setForm((prevForm) => ({
//             ...prevForm,
//             [name]: value,
//         }));
//     };

//     const handleFacilitiesChange = (event) => {
//         const { value } = event.target;
//         setForm((prevForm) => ({
//             ...prevForm,
//             locationFacilities: typeof value === 'string' ? value.split(',') : value,
//         }));
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             const response = await Axios.post(`${process.env.REACT_APP_ENDPOINT}/api/restaurent/addRestaurent`, form);
//             navigate("/admin/restaurants");
//         } catch (error) {
//             console.error(error);
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
//         mt: '30px',
//         mb: 2,
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
//                 {loading ? (
//                     <Box
//                         sx={{
//                             display: 'flex',
//                             justifyContent: 'center',
//                             alignItems: 'center',
//                             height: '90vh',
//                         }}
//                     >
//                         <CircularProgress
//                             size={70}
//                             thickness={4}
//                             sx={{
//                                 color: '#fe9e0d',
//                             }}
//                         />
//                     </Box>
//                 ) : (
//                     <Box>
//                         <Button
//                             variant="contained"
//                             sx={{
//                                 backgroundColor: 'white',
//                                 color: '#fe9e0d',
//                                 borderRadius: '10px',
//                                 ':hover': {
//                                     bgcolor: ' #fe9e0d',
//                                     color: 'white',
//                                 },
//                             }}
//                             startIcon={<ArrowBackIosIcon />}
//                             onClick={() => navigate("/admin/restaurants")}
//                         >
//                             Back
//                         </Button>
//                         <Container
//                             component="main"
//                             maxWidth="xs"
//                         >
//                             <Typography
//                                 component="h1"
//                                 variant="h5"
//                                 sx={{
//                                     textAlign: 'center',
//                                     mt: '30px',
//                                     mb: '10px',
//                                     fontWeight: 'bold',
//                                     textDecoration: 'underline',
//                                 }}
//                             >
//                                 Add Restaurant
//                             </Typography>
//                             <Box
//                                 component="form"
//                                 onSubmit={handleSubmit}
//                                 noValidate
//                                 sx={{
//                                     mt: 1,
//                                 }}
//                             >
//                                 <TextField
//                                     margin="normal"
//                                     required
//                                     fullWidth
//                                     autoFocus
//                                     id="locationName"
//                                     label="Locatoion Name"
//                                     name="locationName"
//                                     autoComplete="location-name"
//                                     sx={textboxStyle}
//                                     value={form.locationName}
//                                     onChange={handleChange}
//                                 />
//                                 <TextField
//                                     margin="normal"
//                                     required
//                                     fullWidth
//                                     id="locationAddress"
//                                     label="Address"
//                                     name="locationAddress"
//                                     autoComplete="location-address"
//                                     sx={textboxStyle}
//                                     value={form.locationAddress}
//                                     onChange={handleChange}
//                                 />
//                                 <TextField
//                                     margin="normal"
//                                     required
//                                     fullWidth
//                                     id="locationCity"
//                                     label="City"
//                                     name="locationCity"
//                                     autoComplete="location-city"
//                                     sx={textboxStyle}
//                                     value={form.locationCity}
//                                     onChange={handleChange}
//                                 />
//                                 <TextField
//                                     margin="normal"
//                                     required
//                                     fullWidth
//                                     id="locationDistrict"
//                                     label="District"
//                                     name="locationDistrict"
//                                     autoComplete="location-district"
//                                     sx={textboxStyle}
//                                     value={form.locationDistrict}
//                                     onChange={handleChange}
//                                 />
//                                 <TextField
//                                     margin="normal"
//                                     required
//                                     fullWidth
//                                     id="locationPhone"
//                                     label="Phone"
//                                     name="locationPhone"
//                                     autoComplete="location-phone"
//                                     sx={textboxStyle}
//                                     value={form.locationPhone}
//                                     onChange={handleChange}
//                                 />
//                                 <FormControl fullWidth margin="normal" required sx={textboxStyle}>
//                                     <InputLabel id="selectFacilities">Facilities</InputLabel>
//                                     <Select
//                                         multiple
//                                         required
//                                         fullWidth
//                                         labelId="selectFacilities"
//                                         id="facility"
//                                         label="Facilities"
//                                         sx={selectStyle}
//                                         name="locationFacilities"
//                                         value={form.locationFacilities}
//                                         onChange={handleFacilitiesChange}
//                                         renderValue={(selected) => selected.map(facilityId => {
//                                             const facility = Facilities.find(f => f.facilityId === facilityId);
//                                             return facility ? facility.facilityName : '';
//                                         }).join(', ')}
//                                     >
//                                         {Facilities.map((facility) => (
//                                             <MenuItem key={facility.facilityId} value={facility.facilityId}>{facility.facilityName}</MenuItem>
//                                         ))}
//                                     </Select>
//                                 </FormControl>
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
//                     </Box>
//                 )}
//             </Box>
//         </Grid2>
//     );
// }
import React, { useState, useEffect } from "react";
import Menu from "../Menu";
import { Box, FormControl, Typography, CircularProgress, Alert } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const primaryColor = '#007BFF'; // Primary color (Blue)
const hoverColor = '#0056b3'; // Darker shade of primary color (Darker Blue)
const logoutColor = '#dc3545'; // Logout color (Red)
const errorTextColor = '#dc3545'; // Error text color (Red)
const backgroundColor = '#2e2e2e'; // Background color
const cardBackgroundColor = '#3a3a3a'; // Form background color

export default function AddUser() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        locationName: "",
        locationAddress: "",
        locationCity: "",
        locationDistrict: "",
        locationPhone: "",
        locationFacilities: [],
    });

    const [Facilities, setFacilities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        const userRole = sessionStorage.getItem('userRole');
        if (!userId || userRole !== '1') {
            navigate('/login');
        } else {
            loadFacilities();
        }
    }, [navigate]);

    const loadFacilities = async () => {
        setLoading(true);
        try {
            const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/facility/allFacilities`);
            setFacilities(result.data);
        } catch (error) {
            console.error("Error loading facilities:", error);
            setError("Failed to load facilities. Please try again.");
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

    const handleFacilitiesChange = (event) => {
        const { value } = event.target;
        setForm((prevForm) => ({
            ...prevForm,
            locationFacilities: typeof value === 'string' ? value.split(',') : value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await Axios.post(`${process.env.REACT_APP_ENDPOINT}/api/restaurent/addRestaurent`, form);
            navigate("/admin/restaurants");
        } catch (error) {
            console.error("Submission error:", error);
            setError("Failed to add restaurant. Please try again.");
        }
    };

    const selectStyle = {
        color: 'white',
        '& .Mui-selected': {
            color: 'white',
        },
        "& .MuiOutlinedInput-notchedOutline": {
            borderWidth: "2px",
            borderColor: primaryColor,
            "&.Mui-focused": {
                "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: primaryColor,
                    borderWidth: "3px",
                },
            },
        },
        "& .MuiInputLabel-outlined": {
            color: "white",
            fontWeight: "bold",
        },
    };

    const textboxStyle = {
        input: {
            color: 'black',
        },
        "& .MuiOutlinedInput-notchedOutline": {
            borderWidth: "2px",
            borderColor: primaryColor,
            "&.Mui-focused": {
                "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: primaryColor,
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
    };

    const buttonStyle = {
        mt: '20px',
        mb: 2,
        color: 'white',
        background: primaryColor,
        ':hover': {
            bgcolor: hoverColor,
            color: 'white',
        },
    };

    return (
        <Grid2
            sx={{
                minWidth: '800px'
            }}
        >
            <Menu />
            <Box
                component="main"
                sx={{
                    padding: '30px 40px',
                    marginLeft: '240px',
                    backgroundColor: '#f5f5f5', // Light background color
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
                                color: primaryColor,
                            }}
                        />
                    </Box>
                ) : (
                    <Box>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: 'white',
                                color: primaryColor,
                                marginTop:'1%',
                                borderRadius: '10px',
                                ':hover': {
                                    bgcolor: primaryColor,
                                    color: 'white',
                                },
                            }}
                            startIcon={<ArrowBackIosIcon />}
                            onClick={() => navigate("/admin/restaurants")}
                        >
                            Back
                        </Button>
                        <Container
                            component="main"
                            maxWidth="xs"
                            sx={{
                                marginTop:'-2%'
                            }}
                        >
                            <Typography
                                component="h1"
                                variant="h5"
                                sx={{
                                    textAlign: 'center',
                                    mt: '20px',
                                    mb: '20px',
                                    fontWeight: 'bold',
                                    textDecoration: 'underline',
                                    color: primaryColor,
                                }}
                            >
                                Add Restaurant
                            </Typography>
                            {error && (
                                <Alert severity="error" sx={{ mb: 2, color: errorTextColor }}>
                                    {error}
                                </Alert>
                            )}
                            <Box
                                component="form"
                                onSubmit={handleSubmit}
                                noValidate
                                sx={{
                                    mt: 1,
                                    backgroundColor: '#ffffff', // White background color
                                    padding: '20px',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Adding shadow for depth
                                }}
                            >
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    autoFocus
                                    id="locationName"
                                    label="Location Name"
                                    name="locationName"
                                    autoComplete="location-name"
                                    sx={textboxStyle}
                                    value={form.locationName}
                                    onChange={handleChange}
                                    placeholder="Enter location name"
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="locationAddress"
                                    label="Address"
                                    name="locationAddress"
                                    autoComplete="location-address"
                                    sx={textboxStyle}
                                    value={form.locationAddress}
                                    onChange={handleChange}
                                    placeholder="Enter address"
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="locationCity"
                                    label="City"
                                    name="locationCity"
                                    autoComplete="location-city"
                                    sx={textboxStyle}
                                    value={form.locationCity}
                                    onChange={handleChange}
                                    placeholder="Enter city"
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="locationDistrict"
                                    label="District"
                                    name="locationDistrict"
                                    autoComplete="location-district"
                                    sx={textboxStyle}
                                    value={form.locationDistrict}
                                    onChange={handleChange}
                                    placeholder="Enter district"
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="locationPhone"
                                    label="Phone"
                                    name="locationPhone"
                                    autoComplete="location-phone"
                                    sx={textboxStyle}
                                    value={form.locationPhone}
                                    onChange={handleChange}
                                    placeholder="Enter phone number"
                                />
                                <FormControl fullWidth margin="normal" required sx={textboxStyle}>
                                    <InputLabel id="selectFacilities">Facilities</InputLabel>
                                    <Select
                                        multiple
                                        required
                                        fullWidth
                                        labelId="selectFacilities"
                                        id="facility"
                                        label="Facilities"
                                        sx={selectStyle}
                                        name="locationFacilities"
                                        value={form.locationFacilities}
                                        onChange={handleFacilitiesChange}
                                        renderValue={(selected) => selected.map(facilityId => {
                                            const facility = Facilities.find(f => f.facilityId === facilityId);
                                            return facility ? facility.facilityName : '';
                                        }).join(', ')}
                                    >
                                        {Facilities.map((facility) => (
                                            <MenuItem key={facility.facilityId} value={facility.facilityId}>
                                                {facility.facilityName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={buttonStyle}
                                >
                                    Add
                                </Button>
                            </Box>
                        </Container>
                    </Box>
                )}
            </Box>
        </Grid2>
    );
}

