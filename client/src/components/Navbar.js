import React from "react";

import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

import MenuIcon from "@material-ui/icons/Menu";

import Auth from "../utils/auth";

export const Navbar = (props) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            onClick={() => window.location.assign("/")}
          >
            YAPSS
          </Typography>
          {Auth.loggedIn() ? (
            <Button color="inherit" onClick={Auth.logout}>
              logout
            </Button>
          ) : (
            <Button color="inherit" href="/login">
              login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
