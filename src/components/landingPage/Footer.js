import './LandingPageStyles.css';

import { Typography } from '@mui/material';
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaTwitterSquare } from "react-icons/fa";
import { FaYoutubeSquare } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import React from 'react';

function Footer() {
    return (
        <footer className="landingpageFooter" style={{backgroundColor:'black'}}>
            <div className='landingpageFooter-main'>
                <div className='landingpageFooter-logo'>
                    <img src='/assets/logo.png' alt='logo' />
                </div>
                <div className='landingpageFooter-socials'>
                    <a href='#'>
                        <FaFacebookSquare style={{ color: '#fe9e0d', fontSize: '2.5rem' }} />
                    </a>
                    <a href='#'>
                        <FaSquareInstagram style={{ color: '#fe9e0d', fontSize: '2.5rem' }} />
                    </a>
                    <a href='#'>
                        <FaTwitterSquare style={{ color: '#fe9e0d', fontSize: '2.5rem' }} />
                    </a>
                    <a href='#'>
                        <FaYoutubeSquare style={{ color: '#fe9e0d', fontSize: '2.5rem' }} />
                    </a>
                    <a href='#'>
                        <AiFillTikTok style={{ color: '#fe9e0d', fontSize: '2.7rem' }} />
                    </a>
                </div>
            </div>
            <Typography className='landingpageFooter-copyrights'>
                © 2024 ABC Restaurent.
                <br />
                All rights reserved.
            </Typography>
            <Typography className='landingpageFooter-credits'>
                    Designed & Developed by <a href='https://www.linkedin.com/in/madhusha-weerasiri' style={{ color: 'white', textDecoration:'underline'}}>Punarjeewa Rashmitha</a>
                </Typography>
        </footer>
    )
}

export default Footer;
