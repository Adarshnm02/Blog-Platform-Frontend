import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/UserSlice";
import { setSearchQuery } from "../redux/searchSlice";

export default function Nav() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.search.query);

  const handleLogout = async () => {
    dispatch(logoutUser());
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleSearch = (e) => {
    dispatch(setSearchQuery(e.target.value));
    if(window.location.pathname !== "/home"){
      navigate("/home")
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 left-0 w-full z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/home" className="text-2xl font-bold text-purple-600">
          BlogHub
        </Link>
        {/* <nav className="hidden md:flex space-x-4">
          <Link to="/home" className="text-gray-600 hover:text-purple-600">
            Home
          </Link>
          <Link to="/home" className="text-gray-600 hover:text-purple-600">
            About
          </Link>
          <Link to="/home" className="text-gray-600 hover:text-purple-600">
            Contact
          </Link>
        </nav> */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 rounded-full"
              value={searchQuery}
              onChange={handleSearch}
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>
          <Button className="md:hidden" variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="hidden md:flex items-center"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
          <Link to="/profile">
            <Button variant="ghost" className="p-0 h-auto">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="User profile"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
