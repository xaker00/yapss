import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';


export const RatingSystem = (props) => {
    
    // set default value to rating given, if given, default in database should be null
    const [rating, setRating] = useState(null);

    return (
        <div>
            <Typography component="legend">Rate!</Typography>
            <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue) => {
                    setRating(newValue);
                }}
            />
        </div>
    )
};