// To Do

// 1. Create add an add comment component
// 2. Create addComment query
// 2. Seed database to test queries
// 3. If we are moving to Likes, implement
// 4. Send Like/Rating/Comment back to databse
// 5. Determine UI limit for comments and hashtags
// 6. Determine wheter to display most recent of first comments and hashtags
// 7. Find method to access comments and hashtags from arrays, .map?


import React from "react";
import { CardBody } from "../components/CardBody";
import { CardDetails } from "../components/CardDetails";
import { CardImage } from "../components/CardImage";
import { Hashtags } from "../components/Hashtags";
import { RatingSystem } from "../components/RatingSystem";
import { Comments } from "../components/Comments";
import { AverageRating } from "../components/AverageRating";
import CardActions from '@mui/material/CardActions';

export const SinglePhoto = (props) => {
    return (
        <div>
            <CardBody>
                <CardDetails />
                <CardImage />
                <Hashtags />
                <CardActions>
                    <RatingSystem />
                    <AverageRating />
                </CardActions>
                <Comments />
            </CardBody>
        </div>
    );
};
