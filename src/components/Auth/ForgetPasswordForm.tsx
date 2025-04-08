import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import {  ForgotPasswordFormSchema,  type ForgotPasswordFormSchemaType } from "./FormSchema";
import { Lock } from "lucide-react";
interface ForgetPasswordFormProps {
  onSubmit: (data: ForgotPasswordFormSchemaType) => void;
  isSubmitting: boolean;
  navigateUrl: string;
}

const ForgetPasswordForm = ({
  onSubmit,
  isSubmitting,
  navigateUrl,
}: ForgetPasswordFormProps) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormSchemaType>({
    resolver: zodResolver(ForgotPasswordFormSchema),
  });
  return (
    <div className="w-full md:max-w-md mx-auto p-4 sm:p-8">
      <Card className="animate__animated animate__fadeIn border-0 shadow-lg rounded-2xl bg-white dark:bg-gray-900 overflow-hidden">
        {/* Decorative element */}
        <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary" />
        
        <CardHeader className="pt-8">
          <div className="flex flex-col items-center space-y-2">
            <div className="p-3 rounded-full bg-primary/10 dark:bg-accent/10">
              {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary dark:text-accent">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg> */}
              <Lock className="w-8 h-8 text-primary " />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">
              Reset Your Password
            </CardTitle>
            <p className="text-center text-gray-600 dark:text-gray-400 text-sm max-w-sm">
              Enter your email, answer your security question, and create a new password
            </p>
          </div>
        </CardHeader>
        
        <CardContent className="px-6 sm:px-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label 
                htmlFor="email" 
                className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
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
                htmlFor="answer" 
                className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                </svg>
                Security Question
              </Label>
              <Input
                id="answer"
                type="text"
                {...register("answer")}
                className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:ring-primary focus:border-primary dark:focus:ring-accent dark:focus:border-accent"
                placeholder="What is your favorite word?"
              />
              {errors.answer && (
                <p className="text-red-500 text-sm mt-1">
                  {String(errors.answer.message)}
                </p>
              )}
            </div>
  
            <div className="space-y-2">
              <Label 
                htmlFor="password" 
                className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M2 16s10-6 20 0" />
                  <path d="M5 11s7-4 14 0" />
                  <path d="M8 6s4-2 8 0" />
                </svg>
                New Password
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
  
            <div className="pt-2">
              <Button
                className="w-full py-2.5 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white rounded-lg transition-all duration-200 font-medium shadow-md hover:shadow-lg"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Resetting...
                  </div>
                ) : (
                  "Reset Password"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-4 px-6 sm:px-8 pb-8">
          <div className="w-full flex items-center justify-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
            <span>Remembered your password?</span>
            <Button
              variant="link"
              className="p-0 h-auto font-medium text-primary hover:underline"
              onClick={() => navigate(navigateUrl)}
            >
              Sign In
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ForgetPasswordForm;
