import React from "react";
import { User, Mail, Phone, MapPin, Camera, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux";

export default function Profile() {
  const userInfo = useSelector((state) => state.user.userInfo);
  console.log("This is userinfo form profile: ", userInfo)
  return (
      <div className="flex justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-7">
        <Card className="w-full max-w-3xl mx-auto shadow-2xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {userInfo.user.name || 'username'}
            </CardTitle>
            <CardDescription>Manage your profile and settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <User className="text-gray-500" />
                <div>
                  <p className="font-medium">{userInfo.user.name}</p>
                  <p className="text-sm text-gray-500">Full Name</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="text-gray-500" />
                <div>
                  <p className="font-medium">{userInfo.user.email}</p>
                  <p className="text-sm text-gray-500">Email</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" className="w-full mr-2">
              <Camera className="mr-2 h-4 w-4" /> Change Avatar
            </Button>
            <Button variant="destructive" className="w-full ml-2">
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </CardFooter>
        </Card>
      </div>
  );
}
