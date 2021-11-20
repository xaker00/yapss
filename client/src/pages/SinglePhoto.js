// To Do

// For hashtags and comments:
// Determine limit for both
// Determine which hashtags/comments to display when limit is reached

// Giving data to componenets (props):
// prop names needed:
// avatar name - needs to be two words for color choosing function
// -or- modify StringAvatar() funciton to accept single avatar name
// photo name - ID?
// hashtag name
// average rating name
// comment name
// avatar name for each comment

// Find method to use props when there are multiple props to display
// Need for hashtags and comments

// Find way to accept prop (rating) and send to database

// Questions:
// Should we allow user to choose avatar photo?


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
