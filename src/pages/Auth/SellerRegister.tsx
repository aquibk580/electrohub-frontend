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
import { clearUser } from "@/redux/slices/user";

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
    <div className="max-w-2xl w-full mx-auto sm:px-8 lg:p-6 space-y-4">
      <Card className="animate__animated animate__fadeIn border-0 shadow-2xl rounded-3xl bg-white dark:bg-slate-800 overflow-hidden">
        {/* Decorative top bar with animated gradient */}
        <div className="h-2 bg-gradient-to-r from-primary via-accent to-primary bg-size-200 animate-gradient-x"></div>
        
        <CardHeader className="pt-10 pb-6">
          <div className="flex justify-center mb-6">
            <div className="p-2 rounded-full bg-gradient-to-r from-primary to-accent">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"></path>
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"></path>
                <path d="M2 7h20"></path>
                <path d="M22 7v3a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2V7"></path>
                <path d="M2 7v3a2 2 0 0 0 2 2v0a2 2 0 0 0 2-2V7"></path>
              </svg>
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-center">
            <span className="inline-block  bg-clip-text text-primary">
              Seller Registration
            </span>
          </CardTitle>
          <CardDescription className="text-center text-gray-600 dark:text-gray-300 text-base mt-2">
            Start your journey as a seller and grow your business
          </CardDescription>
        </CardHeader>
  
        <CardContent className="px-6 sm:px-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
            <div className="flex flex-col items-center space-y-3">
              <Label htmlFor="file" className="cursor-pointer group relative">
                <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-primary dark:border-accent shadow-lg transition-all duration-300 group-hover:scale-105">
                  <img
                    src={profileImage ? URL.createObjectURL(profileImage) : assets.upload}
                    alt="Upload company logo"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-primary/70 dark:bg-accent/70 text-white font-medium rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg> */}
                  </div>
                </div>
              </Label>
              <Input
                id="file"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onFileChange}
              />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Upload your company logo or profile picture
              </p>
            </div>
  
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2 group">
                <Label htmlFor="name" className="text-sm font-medium flex items-center space-x-1.5 text-gray-700 dark:text-gray-300 group-focus-within:text-primary dark:group-focus-within:text-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16"></path>
                    <path d="M12 7h.01"></path>
                    <path d="M15 11h.01"></path>
                    <path d="M12 15h.01"></path>
                    <path d="M9 11h.01"></path>
                  </svg>
                  <span>Company Name</span>
                </Label>
                <div className="relative">
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="Your business name"
                    className="pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:border-primary dark:focus:border-accent focus:ring-1 focus:ring-primary dark:focus:ring-accent"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect>
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                  </div>
                </div>
                {errors.name && (
                  <p className="text-red-500 text-sm flex items-center space-x-1 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" x2="12" y1="8" y2="12"></line>
                      <line x1="12" x2="12.01" y1="16" y2="16"></line>
                    </svg>
                    <span>{String(errors.name.message)}</span>
                  </p>
                )}
              </div>
  
              <div className="space-y-2 group">
                <Label htmlFor="email" className="text-sm font-medium flex items-center space-x-1.5 text-gray-700 dark:text-gray-300 group-focus-within:text-primary dark:group-focus-within:text-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                  <span>Email Address</span>
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="company@example.com"
                    className="pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:border-primary dark:focus:border-accent focus:ring-1 focus:ring-primary dark:focus:ring-accent"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z"></path>
                      <path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10"></path>
                    </svg>
                  </div>
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm flex items-center space-x-1 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" x2="12" y1="8" y2="12"></line>
                      <line x1="12" x2="12.01" y1="16" y2="16"></line>
                    </svg>
                    <span>{String(errors.email.message)}</span>
                  </p>
                )}
              </div>
  
              <div className="space-y-2 group">
                <Label htmlFor="phone" className="text-sm font-medium flex items-center space-x-1.5 text-gray-700 dark:text-gray-300 group-focus-within:text-primary dark:group-focus-within:text-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <span>Phone Number</span>
                </Label>
                <div className="relative">
                  <Input
                    id="phone"
                    type="tel"
                    {...register("phone")}
                    placeholder="1234567890"
                    className="pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:border-primary dark:focus:border-accent focus:ring-1 focus:ring-primary dark:focus:ring-accent"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5Z"></path>
                      <path d="M12.5 8H17"></path>
                      <path d="M12.5 12H17"></path>
                      <path d="M8 16h9"></path>
                      <path d="M8 8h.01"></path>
                      <path d="M8 12h.01"></path>
                    </svg>
                  </div>
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-sm flex items-center space-x-1 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" x2="12" y1="8" y2="12"></line>
                      <line x1="12" x2="12.01" y1="16" y2="16"></line>
                    </svg>
                    <span>{String(errors.phone.message)}</span>
                  </p>
                )}
              </div>
  
              <div className="space-y-2 group">
                <Label htmlFor="password" className="text-sm font-medium flex items-center space-x-1.5 text-gray-700 dark:text-gray-300 group-focus-within:text-primary dark:group-focus-within:text-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  <span>Password</span>
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    {...register("password")}
                    placeholder="••••••••"
                    className="pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:border-primary dark:focus:border-accent focus:ring-1 focus:ring-primary dark:focus:ring-accent"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"></path>
                      <circle cx="16.5" cy="7.5" r=".5"></circle>
                    </svg>
                  </div>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm flex items-center space-x-1 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" x2="12" y1="8" y2="12"></line>
                      <line x1="12" x2="12.01" y1="16" y2="16"></line>
                    </svg>
                    <span>{String(errors.password.message)}</span>
                  </p>
                )}
              </div>
            </div>
  
            <div className="space-y-2 group">
              <Label htmlFor="address" className="text-sm font-medium flex items-center space-x-1.5 text-gray-700 dark:text-gray-300 group-focus-within:text-primary dark:group-focus-within:text-accent">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>Company Address</span>
              </Label>
              <div className="relative">
                <Input
                  id="address"
                  {...register("address")}
                  placeholder="Enter your company's full address"
                  className="pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:border-primary dark:focus:border-accent focus:ring-1 focus:ring-primary dark:focus:ring-accent"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
              </div>
              {errors.address && (
                <p className="text-red-500 text-sm flex items-center space-x-1 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" x2="12" y1="8" y2="12"></line>
                    <line x1="12" x2="12.01" y1="16" y2="16"></line>
                  </svg>
                  <span>{String(errors.address.message)}</span>
                </p>
              )}
            </div>
  
            <div className="space-y-2 group">
              <Label htmlFor="answer" className="text-sm font-medium flex items-center space-x-1.5 text-gray-700 dark:text-gray-300 group-focus-within:text-primary dark:group-focus-within:text-accent">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                  <path d="M12 17h.01"></path>
                </svg>
                <span>Security Question</span>
              </Label>
              <div className="relative">
                <Input
                  id="answer"
                  {...register("answer")}
                  placeholder="What is your favorite word?"
                  className="pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:border-primary dark:focus:border-accent focus:ring-1 focus:ring-primary dark:focus:ring-accent"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9.31 9.31 5.5 5.5"></path>
                    <path d="m18.5 18.5-4-4"></path>
                    <path d="M5.5 18.5 9.31 9.31"></path>
                    <path d="m18.5 5.5-4 9.19"></path>
                    <path d="M2 12h20"></path>
                    <path d="M12 2v20"></path>
                  </svg>
                </div>
              </div>
              {errors.answer && (
                <p className="text-red-500 text-sm flex items-center space-x-1 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" x2="12" y1="8" y2="12"></line>
                    <line x1="12" x2="12.01" y1="16" y2="16"></line>
                  </svg>
                  <span>{String(errors.answer.message)}</span>
                </p>
              )}
            </div>
  
            <div className="flex items-start rounded-xl p-4 bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-700">
              <Checkbox id="terms" required className="mt-1 text-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:text-accent dark:data-[state=checked]:bg-accent dark:data-[state=checked]:text-accent-foreground" />
              <div className="ml-3 space-y-1">
                <Label
                  htmlFor="terms"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  I agree to the terms and conditions
                </Label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  By signing up, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
  
            <Button
              className="w-full py-4 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg font-medium"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating Account...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <span>Start Selling</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </div>
              )}
            </Button>
          </form>
  
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300 dark:border-gray-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-2 bg-white dark:bg-slate-800 text-gray-500 dark:text-gray-400">
                Or continue with
              </span>
            </div>
          </div>
  
          <GoogleButton
            onClick={handleGoogleSignUp}
            text="Sign Up with Google"
            className="w-full py-3 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-300 rounded-xl transition-all duration-200 shadow-sm flex items-center justify-center gap-2 font-medium hover:-translate-y-0.5"
          />
        </CardContent>
  
        <CardFooter className="flex flex-col space-y-6 px-6 sm:px-10 py-8">
          <div className="flex items-center justify-center">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>
          </div>
          
          <div className="flex items-center justify-center space-x-1 text-center text-gray-600 dark:text-gray-400">
            <span>Already registered as a seller?</span>
            <Button
              variant="link"
              className="p-0 h-auto font-medium text-primary hover:text-primary/80  dark:hover:text-accent/80"
              onClick={() => navigate("/seller/auth/signin")}
            >
              Sign in
            </Button>
          </div>
          
          <Button
            variant="outline"
            className="w-full py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 font-medium rounded-xl transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-md"
            onClick={() => navigate("/user/auth/signup")}
          >
            <div className="flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <span>Sign Up as a Customer Instead</span>
            </div>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
