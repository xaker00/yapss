import React from 'react';
import Card from '@mui/material/Card';

export const CardBody = (props) => {
    return (
        <Card sx={{ maxWidth: 345 }}>
            {props.children}
        </Card>)
};