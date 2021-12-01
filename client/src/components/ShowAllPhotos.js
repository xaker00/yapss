import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_PHOTOS } from "../utils/queries";
import Auth from "../utils/auth";
import {
  TextField,
  CssBaseline,
  Container,
  Box,
  Button,
  CardContent,
} from "@mui/material";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  gridList: {
    cols: "3",
  },
}));

const SearchPhotos = () => {
      const classes = useStyles();
  // create state for holding our search field data
    const [searchInput, setSearchInput] = useState("");
    const { loading, data } = useQuery(GET_ALL_PHOTOS);
    // create state for holding returned photo data
    const [SearchPhotos, setSearchPhotos] = useState(loading ? null : data);
    
  // create method to search for photos and set state on form submit
    const handleFormSubmit = async (event) => {
        console.log(searchInput);
        // console.log(SearchPhotos.find((photo) => (photo.title = searchInput)));
        // setSearchPhotos(SearchPhotos.find((photo) => (photo.title = searchInput)));
    };

    if (loading) {
        return <h1>Loading...</h1>;
    }
    else if (!data) {
        return <h1>No Data...</h1>;
    }
    else 
    return (
      <>
        <Container>
          <CssBaseline />
          {/* <h1>Search for Photo!</h1>
          <Box onSubmit={() => handleFormSubmit}>
            <TextField
              name="searchInput"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              type="text"
              size="lg"
              placeholder="Search for a photo title"
            />
            <Button type="submit" variant="success" size="lg">
              Search
            </Button>
          </Box> */}
        </Container>
        <Container>
          <h2>
            {SearchPhotos.photos.length
              ? `Viewing ${SearchPhotos.photos.length} results:`
              : "Search for a photo to begin"}
          </h2>
          <CardContent>
            <GridList
              cellHeight={300}
              spacing={30}
              className={classes.gridList}
            >
              <GridListTile key="Subheader" cols={4} style={{ height: "auto" }}>
                <ListSubheader component="div"></ListSubheader>
              </GridListTile>
              {SearchPhotos.photos.map((photo) => (
                <GridListTile key={photo.title}>
                  <img src={photo.url} alt={photo.title} />
                  <GridListTileBar
                    title={`${photo.title} by ${photo.user.name}`}
                    actionIcon={
                      <IconButton
                        aria-label={`info about ${photo.user.name}`}
                        className={classes.icon}
                      >
                        <InfoIcon />
                      </IconButton>
                    }
                  />
                </GridListTile>
              ))}
            </GridList>
          </CardContent>
        </Container>
      </>
    );
};

export default SearchPhotos;