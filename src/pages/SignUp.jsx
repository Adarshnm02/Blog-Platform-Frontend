import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../utils/Validations";
import { signup } from "../Api/UserApi";
import { setUserInfo } from "../redux/UserSlice";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "react-toastify";

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    try {
      console.log(data);

      const response = await signup(data);
      if (response?.status == 200) {
        localStorage.setItem("token", response.data.token);
        dispatch(setUserInfo(response.data.data));
        toast.success(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <Card className="w-full max-w-md mx-auto shadow-2x1">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-extrabold text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="mt-2">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                {...register("name")}
                placeholder="Enter your name"
                type="text"
                autoCapitalize="words"
                autoComplete="name"
                className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 dark:focus:ring-blue-500"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}{" "}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email" className="mt-1">
                Email
              </Label>
              <Input
                id="email"
                placeholder="Enter your email"
                type="email"
                name="email"
                {...register("email")}
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 dark:focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" className="mt-2">
                Password
              </Label>
              <Input
                id="password"
                placeholder="Create a password"
                type="password"
                name="password"
                {...register("password")}
                autoCapitalize="none"
                autoComplete="new-password"
                autoCorrect="off"
                className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 dark:focus:ring-blue-500"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2 px-4 rounded-md transition-all duration-200"
            >
              Create account
            </button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
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
