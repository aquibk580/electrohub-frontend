import "animate.css";

import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription, } from "@/components/ui/card";
import { SellerRegistrationFormSchema, type SellerRegFormSchemaType, } from "@/components/Auth/FormSchema";
import { useForm, type SubmitHandler } from "react-hook-form";
import { GoogleButton } from "@/components/Auth/GoogleButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";
import { setSeller } from "@/redux/slices/seller";
import { clearUser } from "@/redux/slices/user";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";
import { assets } from "@/assets/assets";
import { toast } from "react-toastify";
import { useState } from "react";

import axios from "../../lib/axios";


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
    if (file) setValue("pfp", file);
  };

  const onSubmit: SubmitHandler<SellerRegFormSchemaType> = async (
    data: SellerRegFormSchemaType
  ) => {
    setIsSubmitting(true);
    console.log(data);
    const formData = new FormData();
    formData.append("pfp", data.pfp as File);
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("phone", data.phone);
    formData.append("address", data.address);
    formData.append("answer", data.answer);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/seller/auth/signup`,
        formData
      );

      if (response.status === 201) {
        dispatch(setSeller(response.data.seller));
        dispatch(clearUser())
        navigate("/seller/dashboard");
        toast.success("Signed in successfully", {
          position: "top-center",
          theme: "light",
        });
      }
    } catch (error: any) {
      if (error.response.data?.flag === "SellerExists") {
        toast.error("Seller already exists", {
          position: "top-center",
          theme: "dark",
        });
      } else if (error.response.data?.flag === "PFPIsRequired") {
        toast.error("Profile picture is required", {
          position: "top-center",
          theme: "dark",
        });
      } else {
        toast.error(error.message, {
          position: "top-center",
          theme: "dark",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const redirectUrl = `${import.meta.env.VITE_FRONTEND_URL
        }/seller/auth/seller-details`;
      const userType = "seller";

      window.location.href = `${import.meta.env.VITE_API_URL
        }/api/auth/google?redirectUrl=${encodeURIComponent(
          redirectUrl
        )}&userType=${encodeURIComponent(userType)}`;
    } catch (error: any) {
      console.log(error);
    } finally {
      dispatch(clearUser())
    }
  };

  return (
    <div className="max-w-2xl w-full mx-auto sm:px-8 lg:p-4 space-y-4">
      <Card className="animate__animated animate__fadeIn shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-extrabold text-center">
            Create Seller Account
          </CardTitle>
          <CardDescription className="text-center text-gray-800 dark:text-gray-100">
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
                <Label htmlFor="name">Company Name</Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="Company Name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">
                    {String(errors.name.message)}
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
                  <p className="text-red-500 text-sm">
                    {String(errors.email.message)}
                  </p>
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
                  <p className="text-red-500 text-sm">
                    {String(errors.phone.message)}
                  </p>
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
                    {String(errors.password.message)}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Company Address</Label>
              <Input
                id="address"
                {...register("address")}
                placeholder="Enter your company's full address"
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
                {...register("answer")}
                placeholder="What is your favorite word?"
              />
              {errors.answer && (
                <p className="text-red-500 text-sm">
                  {String(errors.answer.message)}
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

        </CardFooter>

      </Card>
      <Button
        variant="outline"
        className="w-full shadow-md hover:shadow-lg transition-all font-semibold"
        onClick={() => navigate("/user/auth/signup")}
      >
        Sign Up for a User Account
      </Button>
    </div>
  );
}
