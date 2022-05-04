import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignIn } from "./pages/SignIn";
import { ProfilePage } from "./pages/ProfilePage";
import { SignUp } from "./pages/SignUp";
import { HomePage } from "./pages/HomePage";
import MainPage from "./pages/MainPage";
import PostPage from "./pages/PostPage";
import { ProtectedRoute } from "./components/ProtectedRoute";

export const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
          <Route path="/main" element={<MainPage />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/post/:id" element={<PostPage />}></Route>
        </Routes>
      </Router>
    </>
  );
};