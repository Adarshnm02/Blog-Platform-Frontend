import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const UserLogout = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  return !userInfo ? <Outlet /> : <Navigate to="/signup" />;
};

export default UserLogout;
