import "animate.css";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  LoginFormSchema,
  type LoginFormSchemaType,
} from "@/components/Auth/FormSchema";
import { type SubmitHandler, useForm } from "react-hook-form";
import { GoogleButton } from "@/components/Auth/GoogleButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { clearSeller } from "@/redux/slices/seller";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { setUser } from "@/redux/slices/user";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useState } from "react";

import axios from "../../lib/axios";
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
        dispatch(clearSeller());
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

      window.location.href = `${
        import.meta.env.VITE_API_URL
      }/api/auth/google?redirectUrl=${encodeURIComponent(
        redirectUrl
      )}&userType=${encodeURIComponent(userType)}`;
    } catch (error: any) {
      console.log(error);
    } finally {
      dispatch(clearSeller());
    }
  };

  return (
    <div className=" md:max-w-md w-full     mx-auto space-y-8 sm:px-8 sm:p-4">
      <Card className="animate__animated animate__fadeIn shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-extrabold text-center">
            Sign In
          </CardTitle>
          <CardDescription className="text-center text-gray-800 dark:text-gray-100">
            Sign in to your User Account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid email address",
                  },
                })}
                placeholder="Email ID"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">
                  {String(errors.email.message)}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                placeholder="Password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {String(errors.password.message)}
                </p>
              )}
            </div>

            <div className="flex items-center justify-start">
              <Button
                type="button"
                variant="link"
                className="p-0 h-auto font-medium text-blue-950 dark:text-blue-500"
                onClick={() => navigate("/user/auth/forgot-password")}
              >
                Forgot password?
              </Button>
            </div>

            <Button
              className="w-full bg-green-700 hover:bg-green-950 text-white"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          <div className="relative my-3">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <GoogleButton
            onClick={handleGoogleSignIn}
            text="Sign In with Google"
          />
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <p className="text-center text-sm font-medium">
            Don't have a User Account?{" "}
            <Button
              variant="link"
              className="p-0 h-auto font-semibold text-green-700"
              onClick={() => navigate("/user/auth/signup")}
            >
              Sign Up
            </Button>
          </p>
        </CardFooter>
      </Card>
      <Button
        variant="outline"
        className="w-full shadow-md hover:shadow-lg transition-all font-semibold"
        onClick={() => navigate("/seller/auth/signin")}
      >
        Sign in to your Seller Account
      </Button>
    </div>
  );
}
