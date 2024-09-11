import React from "react";
import { Box, Typography } from "@mui/material";

export default function Bubble(props) {

    const customerStyle = {
        backgroundColor: '#007BFF',
        color: 'white',
        padding: '10px 25px',
        marginRight: 'auto',
        mb: '0px',
        borderRadius: '40px 40px 40px 5px',
    };

    const staffStyle = {
        backgroundColor: '#fe9e0d',
        color: '#ffffff',
        padding: '10px 25px',
        marginLeft: 'auto',
        mb: '0px',
        borderRadius: '40px 40px 5px 40px',
    };

    return (
        <Box
        key={props.item.queryId}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                alignItems: 'center',
                mb: '8px',
            }}
        >
            <Typography
                maxWidth={'75%'}
                sx={props.item.queryStaff ? staffStyle : customerStyle}
            >
                {props.item.queryText || "No text available"}
            </Typography>
        </Box>
    );    
}
