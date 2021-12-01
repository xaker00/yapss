// To Do

// From Ilya: hashtag component in his branch for singlePhoto

// 1. Create add an add comment component - done
// 2. Create addComment query - pseudo code done
// 2. Seed database to test queries - 1st
// 3. If we are moving to Likes, implement - ask victor
// 4. Send Like/Rating/Comment back to databse
// 5. Determine UI limit for comments and hashtags - do first
// 6. Determine wheter to display most recent of first comments and hashtags
// 7. Find method to access comments and hashtags from arrays, .map? - do second

// muttions.js
// import from mutations

import { BrowserRouter as Router, Switch, Route, useParams } from "react-router-dom";

import React, { useEffect } from "react";
import { CardBody } from "../components/CardBody";

export const SinglePhoto = (props) => {
    const {id} = useParams();
    return (
        <div>
            <CardBody photoId={id}>
            </CardBody>
        </div>
    );
};
