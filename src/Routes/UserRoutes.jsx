import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Home from "../pages/Home";
// import CreateEditPost from "../pages/CreateEditPost";
import UserLogin from "../UserProtect/UserLogin";
import UserLogout from "../UserProtect/UserLogout";
import UserLayout from "../Layout/UserLayout";
// import { CreatePostModal } from "../pages/CreatePostModal";



const UserRoutes = () => {
  return (
    <div>
      <Routes>
        <Route>
          <Route element={<UserLogin />}>
            {/* <Route path="/create" element={<CreatePostModal />} /> */}
            <Route element={<UserLayout />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/home" element={<Home />} />
              <Route path="/" element={<Home />} />
            </Route>
          </Route>
          <Route element={<UserLogout />}>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default UserRoutes;
