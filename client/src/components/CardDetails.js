import React from 'react';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import { GET_PHOTO } from '../utils/queries';
import { useQuery } from '@apollo/client';

// Convert Avatar name to color
function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

// Edited for single word avatar name

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: name,
  };
}


export const CardDetails = (props) => {
  
  // Sample return statement using mock-up query and data

  // const photo = useQuery( GET_PHOTO );
  // return (
  //   <CardHeader
  //     avatar={
  //       <Avatar {...stringAvatar({photo.user.username})} aria-label="avatar">
  //         {photo.user.username}
  //       </Avatar>
  //     }
  //     title="{photo.title}"
  //     subheader="{photo.timestamp}"
  //   />)

  
  return (
    <CardHeader
      avatar={
        <Avatar {...stringAvatar('Misty Island')} aria-label="avatar">
          Misty Island
        </Avatar>
      }
      title="Misty Island"
      subheader="November 20, 2021"
    />)
};