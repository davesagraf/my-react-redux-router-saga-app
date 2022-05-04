import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import { SignIn } from "./pages/SignIn";
import { ProfilePage } from "./pages/ProfilePage";
import { SignUp } from "./pages/SignUp";
import { HomePage } from "./pages/HomePage";
import MainPage from "./pages/MainPage";
import PostPage from "./pages/PostPage";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "./actions/userAction";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Collapse from "@mui/material/Collapse";

export const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return (
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

        <Navigate to="/" replace />
      </>
    );
  }
  return children;
};

export const App = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((store) => store.user);

  useEffect(() => {
    dispatch(getUserData());
    setUser(currentUser);
  }, [dispatch, currentUser]);
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/profile"
            element={
              <ProtectedRoute user={user}>
                <ProfilePage />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/main"
            element={
              <ProtectedRoute user={user}>
                <MainPage />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route
            path="/post/:id"
            element={
              <ProtectedRoute user={user}>
                <PostPage />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/" element={<HomePage />}></Route>
        </Routes>
      </Router>
    </>
  );
};
