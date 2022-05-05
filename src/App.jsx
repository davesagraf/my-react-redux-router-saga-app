import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  Outlet,
} from "react-router-dom";
import { SignIn } from "./pages/SignIn";
import { ProfilePage } from "./pages/ProfilePage";
import { SignUp } from "./pages/SignUp";
import { HomePage } from "./pages/HomePage";
import MainPage from "./pages/MainPage";
import PostPage from "./pages/PostPage";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/material";
import { blue } from "@mui/material/colors";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Collapse from "@mui/material/Collapse";

export const App = () => {
  const classes = useStyles();
  const auth = localStorage.getItem("Authorization");

  const [user, setUserLogOut] = useState({
    email: "",
    password: ""
  })

  const handleLogOut = () => {
    localStorage.clear();
    user = setUserLogOut()
  }

  const ProtectedRoute = () => {
          <>
        <Collapse timeout={5000}>
          <Alert
            sx={{ width: "50em", height: "20em" }}
            severity="error"
            variant="filled"
          >
            <AlertTitle>User not logged in</AlertTitle>
            You need to Sign Up or Log In — {" "}
            <strong>
              <Link to="/">Click here</Link>
            </strong>
          </Alert>
        </Collapse>
      </>
    return auth ? <Outlet /> : <Navigate to="/" replace/>;
  };

  return (
    <>


      <BrowserRouter>
        <Box
          sx={{
            display: "flex",
            padding: "15px 20px",
            background: blue[500],
            justifyContent: "space-between",
          }}
        >
          <Link className={classes.links} to={auth ? "/main" : "/"}>
            Home
          </Link>
          <Link onClick={handleLogOut} className={classes.links} to="/">
            Log Out
          </Link>
        </Box>

        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/post/:id" element={<PostPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

const useStyles = makeStyles({
  links: {
    cursor: "pointer",
    color: "white !important",
    textDecoration: "none !important",
    fontFamily: "sans-serif !important",
    fontSize: "16px",
  },
});
