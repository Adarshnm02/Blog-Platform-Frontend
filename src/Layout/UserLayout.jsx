import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "../pages/Nav";
import Footer from "../pages/Footer";
const UserLayout = () => {
  return (
    <div className="">
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
};

export default UserLayout;
