import { Box, Button, Card, CardContent, Typography } from "@mui/material";
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
        return new Date(dateTime).toLocaleDateString('en-GB'); // Format to 'dd/mm/yyyy'
    };

    return (
        <Card key={props.offer.id} sx={{
            display: 'flex',
            flexDirection: 'column',
            margin: '10px',
            width: '350px',
            padding: '10px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            userSelect: 'none',
            transition: '0.3s',
            ':hover': {
                border: '2px solid rgba(254, 158, 13, 0.7)',
                boxShadow: '0px 0px 12px rgba(254, 158, 13, 0.7)',
                cursor: 'pointer',
            }
        }}>
            <Box>
                <img
                    src={props.offer.offerImage ? `/${props.offer.offerImage}` : "/assets/offer.jpg"}
                    alt="Offer"
                    style={{
                        borderRadius: '5px',
                        width: '100%',
                        height: 'auto',
                        objectFit: 'cover',
                        aspectRatio: '1 / 1',
                    }}
                />
            </Box>
            <CardContent sx={{
                padding: '10px',
                textAlign: 'center',
            }}>
                <Typography sx={{
                    fontWeight: 'bold',
                    fontSize: '18px',
                }}>
                    {props.offer.offerName}
                </Typography>
                <Typography sx={{
                    fontSize: '12px',
                }}>
                    Code: {props.offer.offerId}
                </Typography>
                <Typography sx={{
                    fontSize: '12px',
                }}>
                    For: {getCategoryNames(props.offer.offerCategory)}
                </Typography>
                <Typography sx={{
                    textShadow: '1px 1px 4px rgba(255, 0, 0, 0.7)',
                    fontSize: '16px',
                    mt: 1,
                    fontWeight: 'bold',
                    color: props.offer.offerPrice === 0 ? 'red' : 'black'
                }}>
                    {props.offer.offerPrice === 0 ? (
                        `Discount: ${props.offer.offerDiscount}`
                    ) : (
                        `Rs. ${props.offer.offerPrice}`
                    )}
                </Typography>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    fontSize: '12px',
                    mt: 1
                }}>
                    <Typography>
                        From: {getDate(props.offer.offerStartDate)}
                    </Typography>
                    <Typography>
                        To: {getDate(props.offer.offerEndDate)}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}
