"use client";

import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  LoginFormSchema,
  type LoginFormSchemaType,
} from "./components/FormSchema";
import { useNavigate } from "react-router-dom";
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

export default function SellerLogin() {
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
    console.log(data);
    // Here you would typically send the data to your API
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating API call
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-md w-full mx-auto space-y-8 sm:px-8 sm:p-4">
      <Card className="animate__animated animate__fadeIn shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-extrabold text-center">
            Sign In
          </CardTitle>
          <CardDescription className="text-center text-gray-800">
            Sign in to your Seller Account
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
                <p className="text-red-500 text-sm">{errors.email.message}</p>
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
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-start">
              <Button
                variant="link"
                className="p-0 h-auto font-medium text-blue-950"
                onClick={() => navigate("/seller/auth/forgot-password")}
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
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <p className="text-center text-sm font-medium">
            Don't have a Seller Account?{" "}
            <Button
              variant="link"
              className="p-0 h-auto font-semibold text-green-700"
              onClick={() => navigate("/seller/auth/register")}
            >
              Sign Up
            </Button>
          </p>
        </CardFooter>
      </Card>
      <Button
        variant="outline"
        className="w-full shadow-md hover:shadow-lg transition-all font-semibold"
        onClick={() => navigate("/user/auth/login")}
      >
        Sign in to your User Account
      </Button>
    </div>
  );
}
