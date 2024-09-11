import { useNavigate } from 'react-router-dom';

import { Typography, Link, Container } from '@mui/material';
import React from 'react';

function Footer(props) {
    const navigate = useNavigate();
    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                padding: '20px 0px',
                textAlign: 'center',
                // mt: '30px',
                userSelect: 'none',
            }}
        >
            <Typography
                className='footer-credits'
                sx={{
                    fontSize: '12px',
                    pt: '10px',
                }}
            >
                Designed & Developed by <a href='https://www.linkedin.com/in/madhusha-weerasiri' style={{ color: 'white', textDecoration: 'underline' }}>Punarjeewa Rashmitha</a>
            </Typography>
        </Container>
    )
}

export default Footer;
