import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import { useQuery } from '@apollo/client'
import { GET_PHOTO } from '../utils/queries'
import { CardDetails } from "../components/CardDetails";
import { CardImage } from "../components/CardImage";
import { Hashtags } from "../components/Hashtags";
import { RatingSystem } from "../components/RatingSystem";
import { Comments } from "../components/Comments";
import { AverageRating } from "../components/AverageRating";
import CardActions from '@mui/material/CardActions';


export const CardBody = (props) => {
    const { loading, data } = useQuery(GET_PHOTO, {variables: {photoId: props.photoId}})
    console.log(data);
    
    useEffect(()=>{
        console.log(data);
    }, [data]);

    return (
        <Card sx={{ maxWidth: 345, m: 'auto', mt: '5%' }}>
            {data && 
            (
                <div>
                    <CardDetails />
                    <CardImage />
                    <Hashtags />
                    <CardActions>
                        <RatingSystem />
                        <AverageRating />
                    </CardActions>
                    <Comments />

                </div>

            )
            
            }
        </Card>)
};