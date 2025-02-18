import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UserRegistrationFormSchema,
  type UserRegFormSchemaType,
} from "@/components/Auth/FormSchema";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import "animate.css";
import axios from "axios";
import { setUser } from "@/redux/slices/user";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { GoogleButton } from "@/components/Auth/GoogleButton";

export default function UserRegister() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegFormSchemaType>({
    resolver: zodResolver(UserRegistrationFormSchema),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit: SubmitHandler<UserRegFormSchemaType> = async (
    data: UserRegFormSchemaType
  ) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/auth/signup`,
        data
      );

      if (response.status === 201) {
        dispatch(setUser(response.data.user));
        navigate("/");
        toast.success("Signed in successfully", {
          position: "top-center",
          theme: "light",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const redirectUrl = `${import.meta.env.VITE_FRONTEND_URL}/user/auth/user-details`;  
      const userType = "user";

      window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google?redirectUrl=${encodeURIComponent(
        redirectUrl
      )}&userType=${encodeURIComponent(userType)}`;
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-2xl w-full mx-auto sm:px-8 lg:p-4">
      <Card className="animate__animated animate__fadeIn shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-extrabold text-center">
            Sign Up
          </CardTitle>
          <CardDescription className="text-center text-gray-600">
            Create your User Account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  {...register("name", { required: "Name is required" })}
                  placeholder="Full Name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{String(errors.name.message)}</p>
                )}
              </div>

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
                  placeholder="Email Address"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{String(errors.email.message)}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Please enter a valid 10-digit phone number",
                    },
                  })}
                  placeholder="Phone Number"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{String(errors.phone.message)}</p>
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

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  {...register("address", { required: "Address is required" })}
                  placeholder="Your Address"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm">
                    {String(errors.address.message)}
                  </p>
                )}
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="answer">Security Question</Label>
                <Input
                  id="answer"
                  {...register("answer", {
                    required: "Security question is required",
                  })}
                  placeholder="What is your favorite word?"
                />
                {errors.answer && (
                  <p className="text-red-500 text-sm">
                    {String(errors.answer.message)}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" required />
              <Label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I accept the terms and conditions
              </Label>
            </div>

            <Button
              className="w-full bg-green-700 hover:bg-green-800 text-white"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing Up..." : "Sign Up"}
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
            onClick={handleGoogleSignUp}
            text="Sign Up with Google"
          />
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <p className="text-center text-sm">
            Already have an account?{" "}
            <Button
              variant="link"
              className="p-0 h-auto font-semibold text-green-700"
              onClick={() => navigate("/user/auth/signin")}
            >
              Sign in
            </Button>
          </p>
          <Button
            variant="outline"
            className="w-full shadow-md hover:shadow-lg transition-all font-semibold"
            onClick={() => navigate("/seller/auth/signup")}
          >
            Create a New Seller Account
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
