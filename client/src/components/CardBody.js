import React from 'react';
import Card from '@mui/material/Card';


export const CardBody = (props) => {
    return (
        <Card sx={{ maxWidth: 345, m:'auto', mt:'5%' }}>
            {props.children}
        </Card>)
};