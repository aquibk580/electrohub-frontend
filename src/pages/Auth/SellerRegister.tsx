"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SellerRegistrationFormSchema,
  type SellerRegFormSchemaType,
} from "@/components/Auth/FormSchema";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
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
import { assets } from "@/assets/assets";
import axios from "../../lib/axios";
import { setSeller } from "@/redux/slices/seller";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { GoogleButton } from "@/components/Auth/GoogleButton";

export default function SellerRegister() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SellerRegFormSchemaType>({
    resolver: zodResolver(SellerRegistrationFormSchema),
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setProfileImage(file);
    setValue("pfp", file);
  };

  const onSubmit: SubmitHandler<SellerRegFormSchemaType> = async (data) => {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("pfp", data.pfp as File);
    formData.append("name", data.companyName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("phone", data.phone);
    formData.append("address", data.companyAddress);
    formData.append("answer", data.securityQuestion);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/seller/auth/signup`,
        data
      );

      if (response.status === 201) {
        dispatch(setSeller(response.data.seller));
        navigate("/seller/dashboard");
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
      const redirectUrl = `${
        import.meta.env.VITE_FRONTEND_URL
      }/seller/auth/seller-details`;
      const userType = "seller";

      window.location.href = `${
        import.meta.env.VITE_API_URL
      }/api/auth/google?redirectUrl=${encodeURIComponent(
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
            Create Seller Account
          </CardTitle>
          <CardDescription className="text-center text-gray-600">
            Register as a seller
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col items-center space-y-2">
              <Label htmlFor="file" className="cursor-pointer group relative">
                <img
                  src={
                    profileImage
                      ? URL.createObjectURL(profileImage)
                      : assets.upload
                  }
                  alt="Upload company logo or profile picture"
                  className="w-32 h-32 object-cover border border-gray-300 rounded-full shadow-md"
                />
                {!profileImage && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 text-white text-sm font-medium rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    Upload Photo
                  </div>
                )}
              </Label>
              <Input
                id="file"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onFileChange}
              />
              <p className="text-sm text-gray-500">
                Upload your company logo or profile picture
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  {...register("companyName")}
                  placeholder="Company Name"
                />
                {errors.companyName && (
                  <p className="text-red-500 text-sm">
                    {errors.companyName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="Email ID"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  {...register("phone")}
                  placeholder="Mobile No."
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                  placeholder="Password"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyAddress">Company Address</Label>
              <Input
                id="companyAddress"
                {...register("companyAddress")}
                placeholder="Enter your company's full address"
              />
              {errors.companyAddress && (
                <p className="text-red-500 text-sm">
                  {errors.companyAddress.message}
                </p>
              )}
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="securityQuestion">Security Question</Label>
              <Input
                id="securityQuestion"
                {...register("securityQuestion")}
                placeholder="What is your favorite word?"
              />
              {errors.securityQuestion && (
                <p className="text-red-500 text-sm">
                  {errors.securityQuestion.message}
                </p>
              )}
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox id="terms" required />
              <div className="grid gap-1.5 leading-none">
                <Label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the terms and conditions
                </Label>
                <p className="text-sm text-muted-foreground">
                  By signing up, you agree to our Terms of Service and Privacy
                  Policy.
                </p>
              </div>
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
            Already registered as a seller?{" "}
            <Button
              variant="link"
              className="p-0 h-auto font-semibold text-green-700"
              onClick={() => navigate("/seller/auth/signin")}
            >
              Sign in
            </Button>
          </p>
          <Button
            variant="outline"
            className="w-full shadow-md hover:shadow-lg transition-all font-semibold"
            onClick={() => navigate("/user/auth/signup")}
          >
            Sign Up for a User Account
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
