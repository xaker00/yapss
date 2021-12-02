import React from "react";
import { useQuery } from "@apollo/client";
import { GET_PHOTO } from "../utils/queries";
import {
  // Box,
  // Typography,
  // ImageList,
  // ImageListItem,
  Dialog,
  Button,
} from "@mui/material";

export const FullScreenViewer = (props) => {
  const { loading, data } = useQuery(GET_PHOTO, {
    variables: { photoId: props.photoId },
  });

  const handleClose = () => {
    props.close();
  };

  return (
    <div>
      {!loading && (
        <Dialog fullScreen open={props.open} onClose={handleClose}>
          <Button autoFocus color="inherit" onClick={handleClose}>
            close
          </Button>
          <img src={data.photo.url} alt={data.photo.description} />
        </Dialog>
      )}
    </div>
  );
};
