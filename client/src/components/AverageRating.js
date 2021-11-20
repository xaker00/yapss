import React from 'react';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';


export const AverageRating = (props) => {
    return (
        <div>
            <Typography component="legend">Average Rating</Typography>
            <Rating name="read-only" value={4.5} precision={.1} readOnly >
            </Rating>
        </div>

    )
};