import { useState } from "react";
import "animate.css";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormSchema, type LoginFormSchemaType } from "@/components/Auth/FormSchema";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "../../lib/axios";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { setSeller, setSellerIsAuthenticated } from "@/redux/slices/seller";
import { toast } from "react-toastify";
import { GoogleButton } from "@/components/Auth/GoogleButton";
import { clearUser } from "@/redux/slices/user";
import { Settings2 } from "lucide-react";
export default function SellerLogin() {
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
        `${import.meta.env.VITE_API_URL}/api/seller/auth/signin`,
        data
      );
      if (response.status === 200) {
        dispatch(setSeller(response.data.seller));
        dispatch(clearUser());
        navigate("/seller/dashboard");
        toast.success("Signed in successfully", {
          position: "top-center",
          theme: "light",
        });
      }
    } catch (error: any) {
      console.log(error);
      if (error.response.data?.flag === "InvalidCredentials") {
        toast.error("Invalid Credentials", {
          position: "top-center",
          theme: "dark",
        });
      } else if (error.response.data?.flag === "SellerNotFound") {
        toast.error("Seller not found", {
          position: "top-center",
          theme: "dark",
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
      const redirectUrl = `${
        import.meta.env.VITE_FRONTEND_URL
      }/seller/dashboard`;
      const userType = "seller";
      dispatch(setSellerIsAuthenticated(true));
      window.location.href = `${
        import.meta.env.VITE_API_URL
      }/api/auth/google?redirectUrl=${encodeURIComponent(
        redirectUrl
      )}&userType=${encodeURIComponent(userType)}`;
    } catch (error: any) {
      console.log(error);
    } finally {
      dispatch(clearUser());
    }
  };

  return (
    <div className="w-full md:max-w-md mx-auto p-4 sm:p-8">
      <Card className="animate__animated animate__fadeIn border-0 shadow-xl rounded-2xl bg-white dark:bg-gray-900 overflow-hidden">
        {/* Side accent instead of top gradient */}
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-accent" />
        
        <CardHeader className="pt-8 pl-8">
          <div className="flex items-center space-x-2 mb-2">
            <div className="p-2 rounded-full bg-primary/10 dark:bg-accent/10">
              {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary dark:text-accent">
                <path d="M20 7h-9" />
                <path d="M14 17H5" />
                <circle cx="17" cy="17" r="3" />
                <circle cx="7" cy="7" r="3" />
              </svg> */}
              <Settings2 className="text-primary" size={24} />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">
              Seller Portal
            </CardTitle>
          </div>
          <CardDescription className="text-gray-600 dark:text-gray-300">
            Access your seller dashboard and manage your business
          </CardDescription>
        </CardHeader>
        
        <CardContent className="px-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label 
                htmlFor="email" 
                className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z" />
                  <polyline points="15,9 18,9 18,11" />
                  <path d="M6 10V5.5C6 3.5 7.5 2 9.5 2h5C16.5 2 18 3.5 18 5.5V10" />
                </svg>
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:ring-primary focus:border-primary dark:focus:ring-accent dark:focus:border-accent"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {String(errors.email.message)}
                </p>
              )}
            </div>
  
            <div className="space-y-2">
              <Label 
                htmlFor="password" 
                className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <rect width="18" height="16" x="3" y="4" rx="2" />
                  <path d="M7 12h10" />
                  <path d="M12 8v8" />
                </svg>
                Password
              </Label>
              <Input
                id="password"
                type="password"
                {...register("password")}
                className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:ring-primary focus:border-primary dark:focus:ring-accent dark:focus:border-accent"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {String(errors.password.message)}
                </p>
              )}
            </div>
  
            <div className="flex items-center justify-end">
              <Button
                variant="link"
                className="p-0 h-auto text-sm font-medium text-primary"
                onClick={() => navigate("/seller/auth/forgot-password")}
              >
                Forgot password?
              </Button>
            </div>
  
            <Button
              className="w-full py-3 bg-accent hover:bg-accent/90 text-white dark:bg-primary dark:hover:bg-primary/90 rounded-lg transition-all duration-200 font-medium shadow-md hover:shadow-lg"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing In...
                </div>
              ) : (
                "Access Dashboard"
              )}
            </Button>
          </form>
  
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300 dark:border-gray-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">
                Other options
              </span>
            </div>
          </div>
  
          <GoogleButton
            onClick={handleGoogleSignIn}
            text="Sign In with Google"
            className="w-full py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 shadow-sm"
          />
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-5 px-8 pb-8 pt-4">
          <div className="flex items-center justify-between w-full">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              New seller?
            </p>
            <Button
              variant="link"
              className="p-0 h-auto font-medium text-primary hover:underline"
              onClick={() => navigate("/seller/auth/signup")}
            >
              Create an account
            </Button>
          </div>
          
          <Button
            variant="outline"
            className="w-full flex items-center justify-center space-x-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium rounded-lg transition-all duration-200"
            onClick={() => navigate("/user/auth/signin")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span>Switch to User Account</span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
