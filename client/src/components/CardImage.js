import React from 'react';
import CardMedia from '@mui/material/CardMedia';


export const CardImage = (props) => {
    return (
        // Image
        // prop can be image or src
        <CardMedia
            component="img"
            height="194"
            image="https://images.pexels.com/photos/10292822/pexels-photo-10292822.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            alt="Woman Dancing"
        />
    )
};