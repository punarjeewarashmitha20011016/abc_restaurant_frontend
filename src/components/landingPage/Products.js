import React from "react";
import './LandingPageStyles.css';
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Container, Typography } from "@mui/material";
import PanToolAltIcon from '@mui/icons-material/PanToolAlt';
import { useNavigate } from "react-router-dom";

export default function Products() {

    const navigate = useNavigate();

    const boxStyle = { width: 350, margin: '5px', borderRadius: '10px', bgcolor: '#fe9e0d', color: 'white', textAlign: 'center', flexShrink: 0 };

    return (
        <Container id="products">
            <Box className="description">
                <h1>Our Menu</h1>
                <Typography>
                Explore our diverse menu, offering a delightful range of culinary experiences. From savory short eats to hearty breakfasts and sumptuous lunches, we cater to every palate. Indulge in our delicious offerings and discover the perfect dish for any time of day.
                </Typography>
            </Box>

            <Container
                sx={{
                    display: "flex",
                    overflowX: 'auto',
                    flexGrow: '1',
                    flexDirection: 'row',
                }}
            >
                <Card sx={boxStyle}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="340"
                            width="340"
                            image="./assets/shorteats.jpeg"
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Short Eats
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Card sx={boxStyle}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="340"
                            image="./assets/Breakfast1.jpeg"
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Breakfast
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Card sx={boxStyle}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="340"
                            image="./assets/lunch.jpg"
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Lunch
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Card sx={boxStyle}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="340"
                            image="./assets/desserts.jpg"
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Desserts
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Card sx={boxStyle}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="340"
                            image="./assets/baverages.jpeg"
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Baverages
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Container>
        </Container>
    )
}

