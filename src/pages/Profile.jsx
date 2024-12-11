import React from 'react'
import { User, Mail, Phone, MapPin, Camera, LogOut } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Profile() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4">
      <Card className="w-full max-w-3xl mx-auto shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <CardTitle className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            John Doe
          </CardTitle>
          <CardDescription>Manage your profile and settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <User className="text-gray-500" />
              <div>
                <p className="font-medium">John Doe</p>
                <p className="text-sm text-gray-500">Full Name</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Mail className="text-gray-500" />
              <div>
                <p className="font-medium">john.doe@example.com</p>
                <p className="text-sm text-gray-500">Email</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Phone className="text-gray-500" />
              <div>
                <p className="font-medium">+1 (555) 123-4567</p>
                <p className="text-sm text-gray-500">Phone</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <MapPin className="text-gray-500" />
              <div>
                <p className="font-medium">New York, USA</p>
                <p className="text-sm text-gray-500">Location</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Account Settings</h3>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="two-factor">Two-factor authentication</Label>
                <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
              </div>
              <Switch id="two-factor" />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifications">Email notifications</Label>
                <p className="text-sm text-gray-500">Receive email updates about your account activity</p>
              </div>
              <Switch id="notifications" defaultChecked />
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
  )
}

