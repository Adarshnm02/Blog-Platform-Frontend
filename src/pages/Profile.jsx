import React, { useEffect, useState } from "react";
import { User, Mail, Camera, LogOut } from "lucide-react";
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
import { getUserPosts } from "../Api/UserApi";

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};

export default function Profile() {

  const userInfo = useSelector((state) => state.user.userInfo);
  const [userPosts, setUserPosts] = useState([])

  useEffect(() => {
    const fetchUserPosts = async() => {
      try {
        const response = await getUserPosts()
        setUserPosts(response)
      } catch (error) {
        console.log("Error fetching user posts:", error)
      }
    }
    fetchUserPosts()
  }, []);
  
  
  
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <Card className="w-full shadow-2xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {userInfo.user.name || 'Username'}
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

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Your Posts</h2>
          {Array.isArray(userPosts) && userPosts.length > 0 ? (
            userPosts.map((post) => (
              <Card key={post._id} className="shadow-md">
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{truncateText(post.description, 100)}</p>
                </CardContent>
                {post.coverImage && (
                  <img
                    src={post.coverImage}
                    alt="Cover"
                    className="w-full h-48 object-cover"
                  />
                )}
                <CardFooter>
                  <Button variant="link" className="text-purple-600 hover:text-purple-800">
                    View And Edit
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent>
                <p className="text-gray-600 py-4">You haven't created any posts yet.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
