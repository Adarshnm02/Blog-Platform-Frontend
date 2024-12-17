import * as React from "react";
import { Button } from "@/components/ui/button";
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
import { LockIcon, MailIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { loginSchema } from "../utils/Validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "../Api/UserApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../redux/UserSlice";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    try {
      const response = await login(data);
      if (response?.status == 200) {
        localStorage.setItem("token", response.data.token);
        dispatch(setUserInfo(response.data));
        toast.success(response.data.message);
        navigate("/home");
      }
    } catch (error) {
      console.log("Error From Login onSubmit", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <Card className="w-[350px] shadow-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-extrabold text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Login
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="sr-only">
                Email
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  placeholder="Email"
                  type="email"
                  {...register("email")}
                  className="pl-10"
                />
                <MailIcon
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  size={18}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="sr-only">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  placeholder="Password"
                  type="password"
                  autoComplete="current-password"
                  {...register("password")}
                  className="pl-10"
                />
                <LockIcon
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  size={18}
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
            >
              Sign In
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 text-center">
          <a href="#" className="text-sm text-gray-600 hover:text-gray-800">
            Forgot password?
          </a>
          <div className="text-sm">
            Don't have an account?{" "}
            <span
              className="text-purple-600 hover:text-pink-600 font-semibold cursor-pointer transition-colors duration-200"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
