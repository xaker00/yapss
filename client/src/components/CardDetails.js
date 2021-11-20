import React from 'react';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';

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

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}


export const CardDetails = (props) => {
  return (
    // Header containing avatar of uploader, title, and subheader
    // can pass in img as img src or srcSet
    // or as a letter as seen below
    // or have mui generate the color and two letter initials with the name of the person
    // like <Avatar {...stringAvatar('First Last')} />
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