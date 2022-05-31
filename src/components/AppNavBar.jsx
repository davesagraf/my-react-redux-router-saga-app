import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  MenuItem,
  Menu,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

import Logout from "@mui/icons-material/Logout";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import Popover from "@mui/material/Popover";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NotificationsIcon from "@mui/icons-material/Notifications";

export default function AppNavBar() {
  const auth = localStorage.getItem("Authorization");
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const { currentUser } = useSelector((store) => store.user);
  const thisUserFirstName = currentUser.first_name;
  const userFirstNameFirstLetter = thisUserFirstName.charAt(0);

  const [user, setUserLogOut] = useState({
    email: "",
    password: "",
  });

  const [showSideBar, setShowSideBar] = useState(false);

  const [sideBarAnchorEl, setSideBarAnchorEl] = useState(null);

  const [tabValue, setTabValue] = useState(1);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    localStorage.clear();
    setUserLogOut(user);
    navigate("/");
  };

  const handleNavigateToProfile = () => {
    try {
      navigate("/profile");
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleNavigateToMain = () => {
    try {
      navigate("/main");
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleOpenSideBar = (event) => {
    setSideBarAnchorEl(event.currentTarget);
    try {
      setShowSideBar(true);
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleCloseSideBar = () => {
    setSideBarAnchorEl(null);
    setShowSideBar(false)
  };

  const handleTabChange = (event, newTabValue) => {
    setTabValue(newTabValue);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            {auth ? (
              <>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  onClick={handleOpenSideBar}
                >
                  <MenuIcon />
                </IconButton>
                <Tooltip title="Go to Home page">
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={handleNavigateToMain}
                  >
                    <HomeIcon></HomeIcon>
                  </IconButton>
                </Tooltip>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  {`Welcome, ${thisUserFirstName}!`}
                </Typography>

                <div>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <Tooltip title="Account options">
                      <IconButton
                        onClick={handleMenu}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-haspopup="true"
                      >
                        <Avatar sx={{ width: 32, height: 32 }}>
                          {" "}
                          {userFirstNameFirstLetter}
                        </Avatar>
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem
                      onClick={() => {
                        handleNavigateToProfile();
                        handleClose();
                      }}
                    >
                      <AccountCircle />
                      Profile
                    </MenuItem>

                    <Divider />

                    <MenuItem
                      onClick={() => {
                        handleLogOut();
                        handleClose();
                      }}
                    >
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Menu>
                </div>
              </>
            ) : null }
          </Toolbar>
        </AppBar>
      </Box>

      {showSideBar ? (
        <Popover
          open={Boolean(sideBarAnchorEl)}
          anchorEl={sideBarAnchorEl}
          onClose={handleCloseSideBar}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            orientation="vertical"
          >
            <Tab icon={<FavoriteIcon/>} label="Favorites" aria-label="favorite" value="/favs" to="/favs" component={Link}/>
            <Tab icon={<NotificationsIcon />} aria-label="notifications" />
          </Tabs>
        </Popover>
      ) : null}
    </>
  );
}
