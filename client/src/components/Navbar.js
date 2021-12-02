import React from "react";

import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";

import MenuIcon from '@mui/icons-material/Menu';

import Auth from "../utils/auth";

export const Navbar = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleClick}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              onClick={() => {
                window.location.assign("/");
              }}
            >
              Home
            </MenuItem>
            {Auth.loggedIn() && (
              <MenuItem
                onClick={() => {
                  window.location.assign("/upload");
                }}
              >
                Upload
              </MenuItem>
            )}
            {Auth.loggedIn() && (
              <MenuItem
                onClick={() => {
                  window.location.assign("/profile");
                }}
              >
                Profile
              </MenuItem>
            )}
            {!Auth.loggedIn() && (
              <MenuItem
                onClick={() => {
                  window.location.assign("/login");
                }}
              >
                Login
              </MenuItem>
            )}
            {!Auth.loggedIn() && (
              <MenuItem
                onClick={() => {
                  window.location.assign("/createUser");
                }}
              >
                Register
              </MenuItem>
            )}
            {Auth.loggedIn() && (
              <MenuItem
                onClick={Auth.logout}
              >
                Logout
              </MenuItem>
            )}
          </Menu>
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
