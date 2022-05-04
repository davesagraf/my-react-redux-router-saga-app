import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { SignIn } from "./pages/SignIn";
import { ProfilePage } from "./pages/ProfilePage";
import { SignUp } from "./pages/SignUp";
import { HomePage } from "./pages/HomePage";
import MainPage from "./pages/MainPage";
import PostPage from "./pages/PostPage";
import ProtectedRoute from "./components/ProtectedRoute";

export const App = () => {

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/profile"
            element={
              <ProtectedRoute >
                <ProfilePage />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/main"
            element={
              <ProtectedRoute >
                <MainPage />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route
            path="/post/:id"
            element={
              <ProtectedRoute >
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
