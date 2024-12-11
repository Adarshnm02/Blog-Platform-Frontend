import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const UserLogin = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  console.log("From login protector ", userInfo)

  return userInfo ? <Outlet /> : <Navigate to="/login" />;
};

export default UserLogin;
