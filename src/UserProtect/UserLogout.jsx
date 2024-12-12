import React from "react";
import { useEffect } from "react";
import { useSelector} from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const UserLogout = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  useEffect(() => {
    console.log('User info updated:', userInfo);
  }, [userInfo]);
  
  return !userInfo ? <Outlet /> : <Navigate to="/" />;
};

export default UserLogout;
