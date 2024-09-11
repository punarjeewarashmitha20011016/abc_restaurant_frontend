// import { Box, Button, Card, CardContent, Typography } from "@mui/material";
// import React from "react";

// export default function CardComponent(props) {

//     const cardStyle = {
//         display: 'flex',
//         flexDirection: 'column',
//         flex: ' 0 0 auto',
//         scrolllBehavior: 'auto',
//         margin: '10px',
//         width: '210px',
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

//     const btnStyle = {
//         mt: 0,
//         border: '2px solid #fe9e0d',
//         bgcolor: '#ffffff',
//         color: '#fe9e0d',
//         ':hover': {
//             bgcolor: '#fe9e0d',
//             color: '#ffffff',
//         }
//     }

//     const UnavailablebtnStyle = {
//         mt: 0,
//         border: '2px solid #fe9e0d',
//         bgcolor: '#ffffff',
//         color: '#fe9e0d',
//         ':hover': {
//             bgcolor: '#fe9e0d',
//             color: '#ffffff',
//         }
//     }

//     return (
//         <Card key={props.product.id} sx={cardStyle}>
//             <Box>
//                 {props.product.productImage ?
//                     (
//                         <img
//                             src={`/${props.product.productImage}`}
//                             alt="Lunch"
//                             style={imgStyle}
//                         />
//                     ) : (
//                         <img
//                             src="/assets/empty.jpeg"
//                             alt="Lunch"
//                             style={imgStyle}
//                         />
//                     )
//                 }
//             </Box>
//             <CardContent
//                 sx={{
//                     padding: '5px'
//                 }}
//             >
//                 <Typography
//                     sx={{
//                         fontWeight: 'bold',
//                         fontSize: '18px',
//                         mt: 0,
//                     }}
//                 >
//                     {props.product.productName}
//                 </Typography>
//                 <Typography
//                     sx={{
//                         fontSize: '12px'
//                     }}
//                 >
//                     {props.product.productDescription}
//                 </Typography>
//                 <Typography
//                     sx={{
//                         fontSize: '16px',
//                         mt: 1,
//                         textAlign: 'center',
//                         fontWeight: 'bold',
//                     }}
//                 >
//                     Rs. {props.product.productPrice}
//                 </Typography>
//             </CardContent>
//             {props.product.productStatus === "Available" ? (
//                 <Button
//                     variant="contained"
//                     sx={btnStyle}>
//                     Add
//                 </Button>
//             ) : (
//                 <Button
//                     variant="outlined"
//                     disabled
//                     sx={UnavailablebtnStyle}>
//                     Unavailable
//                 </Button>
//             )}


//         </Card>
//     );
// }

import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import React from "react";

export default function CardComponent(props) {

    const cardStyle = {
        display: 'flex',
        flexDirection: 'column',
        flex: '0 0 auto',
        margin: '10px',
        width: '210px',
        padding: '10px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        userSelect: 'none',
        backgroundColor: '#fff', // White background for the card
        transition: 'box-shadow 0.3s, border 0.3s',
        ':hover': {
            border: '2px solid rgba(254, 158, 13, 0.7)',
            boxShadow: '0px 0px 12px rgba(254, 158, 13, 0.7)',
            cursor: 'pointer',
        }
    };

    const imgStyle = {
        borderRadius: '5px',
        width: '100%',
        height: 'auto',
        objectFit: 'cover',
        aspectRatio: '1 / 1',
    };

    const btnStyle = {
        mt: 1,
        border: '2px solid #fe9e0d',
        bgcolor: '#fe9e0d',
        color: '#ffffff',
        ':hover': {
            bgcolor: '#f68e1f', // Slightly darker yellow for hover
            color: '#ffffff',
        }
    }

    const unavailableBtnStyle = {
        mt: 1,
        border: '2px solid #fe9e0d',
        bgcolor: '#ffffff',
        color: '#fe9e0d',
        ':hover': {
            bgcolor: '#fe9e0d',
            color: '#ffffff',
        }
    }

    return (
        <Card key={props.product.id} sx={cardStyle}>
            <Box>
                <img
                    src={props.product.productImage ? `/${props.product.productImage}` : "/assets/empty.jpeg"}
                    alt={props.product.productName}
                    style={imgStyle}
                />
            </Box>
            <CardContent
                sx={{
                    padding: '5px'
                }}
            >
                <Typography
                    sx={{
                        fontWeight: 'bold',
                        fontSize: '18px',
                        mb: 1,
                    }}
                >
                    {props.product.productName}
                </Typography>
                <Typography
                    sx={{
                        fontSize: '12px',
                        color: '#666', // Light grey for description text
                    }}
                >
                    {props.product.productDescription}
                </Typography>
                <Typography
                    sx={{
                        fontSize: '16px',
                        mt: 1,
                        textAlign: 'center',
                        fontWeight: 'bold',
                        color: '#fe9e0d', // Yellow color for price
                    }}
                >
                    Rs. {props.product.productPrice}
                </Typography>
            </CardContent>
            <Button
                variant={props.product.productStatus === "Available" ? "contained" : "outlined"}
                disabled={props.product.productStatus !== "Available"}
                sx={props.product.productStatus === "Available" ? btnStyle : unavailableBtnStyle}
            >
                {props.product.productStatus === "Available" ? "Add" : "Unavailable"}
            </Button>
        </Card>
    );
}
