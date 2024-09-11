// import { Box, Button, Card, CardContent, Typography } from "@mui/material";
// import Axios from "axios";
// import React, { useEffect, useState } from "react";

// export default function CardComponent(props) {

//     const [categories, setCategories] = useState([]);

//     useEffect(() => {
//         loadCategory();
//     }, []);

//     const loadCategory = async () => {
//         try {
//             const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}api/productCategory/allProductCategories`);
//             setCategories(result.data);
//         } catch (error) {
//             console.error("Error loading categories:", error);
//         }
//     };

//     const getCategoryNames = (categoryIds) => {
//         return categoryIds.map(id => {
//             const category = categories.find(f => f.categoryId === id);
//             return category ? category.categoryName : '';
//         }).join(', ');
//     };

//     const getDate = (dateTime) => {
//         return (dateTime.substring(0, 10));
//     }

//     const cardStyle = {
//         display: 'flex',
//         flexDirection: 'column',
//         flex: ' 0 0 auto',
//         scrolllBehavior: 'auto',
//         margin: '10px 10px 50px 10px',
//         width: '350px',
//         padding: '10px',
//         borderRadius: '10px',
//         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//         userSelect: 'none',
//         ':hover': {
//             border: '2px solid rgba(254, 158, 13, 0.7)',
//             boxShadow: '0px 0px 10px rgba(254, 158, 13, 0.7)',
//             cursor: 'pointer',
//         }
//     };

//     const imgStyle = {
//         borderRadius: '5px',
//         width: '100%',
//         height: 'auto',
//         objectFit: 'cover',
//         aspectRatio: '1 / 1',
//     };

//     const offerStyle = {
//         textShaow: '1px 1px 10px rgba(255, 0, 0, 1)',
//         fontSize: '16px',
//         mt: 1,
//         textAlign: 'center',
//         fontWeight: 'bold',
//     }

//     return (
//         <Card key={props.offer.id} sx={cardStyle}>
//             <Box>
//                 {props.offer.offerImage ?
//                     (
//                         <img
//                             src={`/${props.offer.offerImage}`}
//                             alt="Lunch"
//                             style={imgStyle}
//                         />
//                     ) : (
//                         <img
//                             src="/assets/offer.jpg"
//                             alt="Lunch"
//                             style={imgStyle}
//                         />
//                     )
//                 }
//             </Box>
//             <CardContent
//                 sx={{
//                     all: 'unset',
//                     padding: '5px',
//                     textAlign: 'center',
//                 }}
//             >
//                 <Typography
//                     sx={{
//                         fontWeight: 'bold',
//                         fontSize: '18px',
//                         mt: 0,
                        
//                     }}
//                 >
//                     {props.offer.offerName}
//                 </Typography>
//                 <Typography
//                     sx={{
//                         fontSize: '12px',
//                         userSelect: 'text',
//                     }}
//                 >
//                     Code : {props.offer.offerId}
//                 </Typography>
//                 <Typography
//                     sx={{
//                         fontSize: '12px'
//                     }}
//                 >
//                     For : {getCategoryNames(props.offer.offerCategory)}
//                 </Typography>
//                 <Typography
//                     sx={offerStyle}
//                 >
//                     {props.offer.offerPrice === 0 ? (
//                         `Discount: ${props.offer.offerDiscount}`
//                     ) : (
//                         `Rs. ${props.offer.offerPrice}`
//                     )}
//                 </Typography>
//                 <Box
//                     sx={{
//                         display: 'flex',
//                         flexDirection: 'row',
//                         justifyContent: 'space-between'
//                     }}
//                 >
//                     <Typography
//                         sx={{
//                             fontSize: '12px'
//                         }}
//                     >
//                         From : {getDate(props.offer.offerStartDate)}
//                     </Typography>
//                     <Typography
//                         sx={{
//                             fontSize: '12px'
//                         }}
//                     >
//                         To : {getDate(props.offer.offerEndDate)}
//                     </Typography>
//                 </Box>
//             </CardContent>
//         </Card>
//     );
// }
import { Box, Card, CardContent, Typography } from "@mui/material";
import Axios from "axios";
import React, { useEffect, useState } from "react";

export default function CardComponent(props) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        loadCategory();
    }, []);

    const loadCategory = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/productCategory/allProductCategories`);
            setCategories(result.data);
        } catch (error) {
            console.error("Error loading categories:", error);
        }
    };

    const getCategoryNames = (categoryIds) => {
        return categoryIds.map(id => {
            const category = categories.find(f => f.categoryId === id);
            return category ? category.categoryName : '';
        }).join(', ');
    };

    const getDate = (dateTime) => {
        return new Date(dateTime).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    const cardStyle = {
        display: 'flex',
        flexDirection: 'column',
        flex: '0 0 auto',
        margin: '15px',
        width: '350px',
        padding: '15px',
        borderRadius: '15px',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#FFF9E6', // Light yellow background
        transition: '0.3s ease',
        ':hover': {
            border: '2px solid #FEBF00', // Yellow border on hover
            boxShadow: '0 10px 20px rgba(254, 191, 0, 0.7)', // Yellow shadow
            cursor: 'pointer',
        }
    };

    const imgStyle = {
        borderRadius: '10px',
        width: '100%',
        height: 'auto',
        objectFit: 'cover',
        aspectRatio: '1 / 1',
        marginBottom: '10px',
    };

    const offerStyle = {
        color: '#FE9E0D', // Yellow text
        fontSize: '16px',
        mt: 1,
        textAlign: 'center',
        fontWeight: 'bold',
    };

    return (
        <Card sx={cardStyle}>
            <Box>
                <img
                    src={props.offer.offerImage ? `/${props.offer.offerImage}` : "/assets/offer.jpg"}
                    alt="Offer"
                    style={imgStyle}
                />
            </Box>
            <CardContent sx={{ padding: '10px', textAlign: 'center' }}>
                <Typography sx={{ fontWeight: 'bold', fontSize: '20px', color: '#FEBF00' }}> {/* Bright Yellow Title */}
                    {props.offer.offerName}
                </Typography>
                <Typography sx={{ fontSize: '14px', color: '#555' }}> {/* Greyish text */}
                    Code: {props.offer.offerId}
                </Typography>
                <Typography sx={{ fontSize: '14px', color: '#555' }}>
                    For: {getCategoryNames(props.offer.offerCategory)}
                </Typography>
                <Typography sx={offerStyle}>
                    {props.offer.offerPrice === 0 ? `Discount: ${props.offer.offerDiscount}` : `Rs. ${props.offer.offerPrice}`}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '10px' }}>
                    <Typography sx={{ fontSize: '12px', color: '#888' }}>From: {getDate(props.offer.offerStartDate)}</Typography>
                    <Typography sx={{ fontSize: '12px', color: '#888' }}>To: {getDate(props.offer.offerEndDate)}</Typography>
                </Box>
            </CardContent>
        </Card>
    );
}
