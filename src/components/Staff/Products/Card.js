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
        ':hover': {
            border: '2px solid rgba(254, 158, 13, 0.7)', // Orange border on hover
            boxShadow: '0px 0px 10px rgba(254, 158, 13, 0.7)', // Orange shadow on hover
            cursor: 'pointer',
        },
    };

    const imgStyle = {
        borderRadius: '5px',
        width: '100%',
        height: 'auto',
        objectFit: 'cover',
        aspectRatio: '1 / 1',
    };

    const btnStyle = {
        marginTop: 0,
        border: '2px solid #fe9e0d', // Orange border
        backgroundColor: '#ffffff',
        color: '#fe9e0d', // Orange text
        ':hover': {
            backgroundColor: '#fe9e0d', // Orange background on hover
            color: '#ffffff', // White text on hover
        },
    };

    const UnavailableBtnStyle = {
        marginTop: 0,
        border: '2px solid #fe9e0d', // Orange border
        backgroundColor: '#ffffff',
        color: '#fe9e0d', // Orange text
        ':hover': {
            backgroundColor: '#fe9e0d', // Orange background on hover
            color: '#ffffff', // White text on hover
        },
    };

    return (
        <Card key={props.product.id} sx={cardStyle}>
            <Box>
                {props.product.productImage ? (
                    <img
                        src={`/${props.product.productImage}`}
                        alt={props.product.productName}
                        style={imgStyle}
                    />
                ) : (
                    <img
                        src="/assets/empty.jpeg"
                        alt="Unavailable"
                        style={imgStyle}
                    />
                )}
            </Box>
            <CardContent sx={{ padding: '5px' }}>
                <Typography
                    sx={{
                        fontWeight: 'bold',
                        fontSize: '18px',
                        marginTop: 0,
                        color: '#007BFF', // Primary blue for product name
                    }}
                >
                    {props.product.productName}
                </Typography>
                <Typography sx={{ fontSize: '12px' }}>
                    {props.product.productDescription}
                </Typography>
                <Typography
                    sx={{
                        fontSize: '16px',
                        marginTop: 1,
                        textAlign: 'center',
                        fontWeight: 'bold',
                        color: '#fe9e0d', // Orange for price
                    }}
                >
                    Rs. {props.product.productPrice}
                </Typography>
            </CardContent>
            {props.product.productStatus === "Available" ? (
                <Button variant="contained" disabled sx={btnStyle}>
                    Available
                </Button>
            ) : (
                <Button variant="outlined" disabled sx={UnavailableBtnStyle}>
                    Unavailable
                </Button>
            )}
        </Card>
    );
}
