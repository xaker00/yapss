import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { Box, Typography, ImageList, ImageListItem } from "@mui/material";
import { FullScreenViewer } from "../components/FullScreenViewer";

export const Profile = (props) => {
  const { loading, data, refetch } = useQuery(GET_ME);

  const [fullScreen, setFullScreen] = useState();

  const onFullScreenClose = () => {
    refetch();
    setFullScreen(undefined);
  };

  return (
    <Box sx={{ marginTop: "10px", marginBottom: "50px" }}>
      {fullScreen && (
        <FullScreenViewer
          photoId={fullScreen.photoId}
          open={true}
          close={onFullScreenClose}
        />
      )}
      {!loading && (
        <div>
          <Typography variant="h6">{data.me.username}'s profile</Typography>

          <ImageList variant="masonry" cols={4}>
            {data.me.photos.map((item) => (
              <ImageListItem key={item._id}>
                {/* TODO: make sure images have proper aspect ratio */}
                <img
                  src={item.url}
                  alt={item.title}
                  loading="lazy"
                  onClick={() => {
                    setFullScreen({ photoId: item._id, open: true });
                  }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </div>
      )}
    </Box>
  );
};
