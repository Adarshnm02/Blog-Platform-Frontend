import * as React from "react";
import { Mail } from "lucide-react";

import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignUp() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-extrabold text-center bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            Create an account
          </CardTitle>
          <CardDescription className="text-center text-gray-500 dark:text-gray-400">
            Enter your details below to create your account and get started
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button
            variant="outline"
            className="w-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Mail className="mr-2 h-4 w-4" />
            Sign up with Google
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300 dark:border-gray-600" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-gray-900 px-2 text-gray-500 dark:text-gray-400">
                Or continue with email
              </span>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              type="text"
              autoCapitalize="words"
              autoComplete="name"
              className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 dark:focus:ring-blue-500"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="Enter your email"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 dark:focus:ring-blue-500"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="Create a password"
              type="password"
              autoCapitalize="none"
              autoComplete="new-password"
              autoCorrect="off"
              className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 dark:focus:ring-blue-500"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
            Create account
          </Button>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            By creating an account, you agree to our{" "}
            <a
              href="#"
              className="font-medium text-purple-600 dark:text-blue-400 hover:underline"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="font-medium text-purple-600 dark:text-blue-400 hover:underline"
            >
              Privacy Policy
            </a>
            .
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
