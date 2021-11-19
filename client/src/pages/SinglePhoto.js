import React from "react";
import { CardBody } from "../components/CardBody";
import { CardDetails } from "../components/CardDetails";
import { CardImage } from "../components/CardImage";
import { Hashtags } from "../components/Hashtags";
import { RatingSystem } from "../components/RatingSystem";
import { Comments } from "../components/Comments";
import { AverageRating } from "../components/AverageRating";

export const SinglePhoto = (props) => {
    return (
        <div>
            <CardBody>
                <CardDetails />
                <CardImage />
                <Hashtags />
                <RatingSystem />
                <AverageRating />
                <Comments/>
            </CardBody>
        </div>
    );
};
