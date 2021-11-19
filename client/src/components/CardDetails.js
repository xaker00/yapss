import React from 'react';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import { red } from '@mui/material/colors';

export const CardDetails = (props) => {
  return (
    // Header containing avatar of uploader, title, and subheader
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: red[500] }} aria-label="avatar">
          T
        </Avatar>
      }
      title="Woman Dancing"
      subheader="November 20, 2021"
    />)
};