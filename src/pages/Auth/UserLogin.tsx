import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  LoginFormSchema,
  type LoginFormSchemaType,
} from "@/components/Auth/FormSchema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import "animate.css";
import axios from "../../lib/axios";
import { toast } from "react-toastify";
import { setUser } from "@/redux/slices/user";
import { GoogleButton } from "@/components/Auth/GoogleButton";
import { clearSeller } from "@/redux/slices/seller";
import { Lock, Mail } from "lucide-react"; // Added icon imports

export default function UserLogin() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormSchemaType>({
    resolver: zodResolver(LoginFormSchema),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit: SubmitHandler<LoginFormSchemaType> = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/auth/signin`,
        data
      );
      if (response.status === 200) {
        dispatch(setUser(response.data.user));
        dispatch(clearSeller())
        navigate("/");
        toast.success("Signed in successfully", {
          position: "top-center",
          theme: "light",
        });
      }
    } catch (error: any) {
      if (error.response.data?.flag === "UserNotFound") {
        toast.error("User not found", {
          position: "top-center",
          theme: "light",
        });
      } else if (error.response.data?.flag === "PasswordNotFound") {
        toast.error("Password not found in the db", {
          position: "top-center",
          theme: "light",
        });
      } else if (error.response.data?.flag === "InvalidCredentials") {
        toast.error("Invalid Credentials", {
          position: "top-center",
          theme: "light",
        });
      } else {
        toast.error(error.message, {
          position: "top-center",
          theme: "light",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const redirectUrl = `${import.meta.env.VITE_FRONTEND_URL}/`;
      const userType = "user";

      window.location.href = `${import.meta.env.VITE_API_URL
        }/api/auth/google?redirectUrl=${encodeURIComponent(
          redirectUrl
        )}&userType=${encodeURIComponent(userType)}`;
    } catch (error: any) {
      console.log(error);
    } finally {
      dispatch(clearSeller())
    }
  };

  return (
    <div className="w-full md:max-w-md mx-auto p-4 sm:p-8">
      <Card className="animate__animated animate__fadeIn border-0 shadow-lg rounded-2xl bg-white dark:bg-gray-900 overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-primary to-accent" />
        <CardHeader className="pt-8">
          <CardTitle className="text-3xl font-bold text-center text-gray-800 dark:text-white">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-center text-gray-600 dark:text-gray-300">
            Sign in to your User Account
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6 sm:px-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label 
                htmlFor="email" 
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email Address
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="pl-10 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:ring-primary focus:border-primary dark:focus:ring-accent dark:focus:border-accent"
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {String(errors.email.message)}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label 
                  htmlFor="password" 
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Password
                </Label>
                <Button
                  variant="link"
                  className="p-0 h-auto text-sm font-medium text-primary  hover:text-primary/80 dark:hover:text-accent/80"
                  onClick={() => navigate("/user/auth/forgot-password")}
                >
                  Forgot password?
                </Button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                  className="pl-10 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:ring-primary focus:border-primary dark:focus:ring-accent dark:focus:border-accent"
                  placeholder="••••••••"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {String(errors.password.message)}
                </p>
              )}
            </div>

            <Button
              className="w-full py-2.5 bg-primary hover:bg-primary/90 text-white dark:bg-accent dark:hover:bg-accent/90 rounded-lg transition-all duration-200 font-medium shadow-md hover:shadow-lg"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing In...
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300 dark:border-gray-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          <GoogleButton
            onClick={handleGoogleSignIn}
            text="Sign In with Google"
            className="w-full py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 shadow-sm"          />
        </CardContent>
        <CardFooter className="flex flex-col space-y-5 px-6 sm:px-8 pb-8">
          <p className="text-center text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Button
              variant="link"
              className="p-0 h-auto font-medium text-primary  hover:underline"
              onClick={() => navigate("/user/auth/signup")}
            >
              Sign Up
            </Button>
          </p>
          
          <Button
            variant="outline"
            className="w-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium rounded-lg transition-all duration-200"
            onClick={() => navigate("/seller/auth/signin")}
          >
            Sign in as Seller
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}