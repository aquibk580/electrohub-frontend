import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { InfoIcon, LockIcon, MailIcon, PhoneIcon, HomeIcon, UserIcon } from "lucide-react";
import "animate.css";
import axios from "axios";
import { setUser } from "@/redux/slices/user";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { GoogleButton } from "@/components/Auth/GoogleButton";
import { clearSeller } from "@/redux/slices/seller";

export default function UserRegister() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UserRegFormSchemaType>({
    resolver: zodResolver(UserRegistrationFormSchema),
    mode: "onChange",
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
        dispatch(clearSeller());
        navigate("/");
        toast.success("Signed in successfully", {
          position: "top-center",
          theme: "light",
        });
      }
    } catch (error: any) {
      if (error.response?.data?.flag === "UserExists") {
        toast.error("User already exists", {
          position: "top-center",
          theme: "light",
        });
      } else {
        toast.error(error.message || "Registration failed", {
          position: "top-center",
          theme: "light",
        });
      }
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
    } finally {
      dispatch(clearSeller());
    }
  };

  const FormField = ({
    id,
    label,
    type = "text",
    placeholder,
    icon,
    errors,
    tooltip,
    ...props
  }: {
    id: keyof UserRegFormSchemaType;
    label: string;
    type?: string;
    placeholder: string;
    icon?: React.ReactNode;
    errors: any;
    tooltip?: string;
    [key: string]: any;
  }) => (
    <div className="space-y-2 relative group">
      <div className="flex items-center justify-between">
        <Label htmlFor={String(id)} className="text-foreground font-medium">
          {label}
        </Label>
        {tooltip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
              </TooltipTrigger>
              <TooltipContent className="bg-background border border-border">
                <p className="text-foreground text-sm">{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {icon}
          </div>
        )}
        <Input
          id={String(id)}
          type={type}
          placeholder={placeholder}
          className={cn(
            "transition-all focus-visible:ring-primary",
            icon && "pl-10",
            errors[id] && "border-destructive focus-visible:ring-destructive",
            "bg-background text-foreground border-input"
          )}
          {...props}
        />
      </div>
      {errors[id] && (
        <p className="text-destructive text-sm font-medium">
          {String(errors[id].message)}
        </p>
      )}
    </div>
  );

  return (
    <div className="max-w-2xl w-full mx-auto sm:px-8 lg:p-4 space-y-6">
      <Card className="animate__animated animate__fadeIn shadow-xl rounded-xl border-border bg-card text-card-foreground">
        <CardHeader className="space-y-2 pb-4">
          <CardTitle className="text-3xl font-extrabold text-center bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Sign Up
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground font-medium">
            Create your User Account to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FormField
                id="name"
                label="Full Name"
                placeholder="John Doe"
                icon={<UserIcon className="h-4 w-4" />}
                errors={errors}
                tooltip="Enter your legal name as it appears on official documents"
                {...register("name")}
              />

              <FormField
                id="email"
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                icon={<MailIcon className="h-4 w-4" />}
                errors={errors}
                tooltip="We'll send a verification email to this address"
                {...register("email")}
              />

              <FormField
                id="phone"
                label="Phone Number"
                type="tel"
                placeholder="10-digit number"
                icon={<PhoneIcon className="h-4 w-4" />}
                errors={errors}
                tooltip="Your phone number for account recovery and notifications"
                {...register("phone")}
              />

              <FormField
                id="password"
                label="Password"
                type="password"
                placeholder="Minimum 8 characters"
                icon={<LockIcon className="h-4 w-4" />}
                errors={errors}
                tooltip="Use a strong password with letters, numbers, and symbols"
                {...register("password")}
              />

              <div className="sm:col-span-2">
                <FormField
                  id="address"
                  label="Address"
                  placeholder="Your full address"
                  icon={<HomeIcon className="h-4 w-4" />}
                  errors={errors}
                  tooltip="Your shipping address for deliveries"
                  {...register("address")}
                />
              </div>

              <div className="sm:col-span-2">
                <FormField
                  id="answer"
                  label="Security Question"
                  placeholder="What is your favorite word?"
                  errors={errors}
                  tooltip="This helps recover your account if you forget your password"
                  {...register("answer")}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 py-2">
              <Checkbox
                id="terms"
                required
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <Label
                htmlFor="terms"
                className="text-sm font-medium leading-none text-foreground cursor-pointer select-none"
              >
                I accept the{" "}
                <span className="text-primary hover:underline cursor-pointer" onClick={() => navigate("/info/terms-of-service")}>
                  terms and conditions
                </span>
              </Label>
            </div>

            <Button
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <span className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent"></span>
                  Creating Account...
                </div>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <div className="relative my-6">
            <Separator className="absolute inset-0" />
            <div className="relative flex justify-center">
              <span className="bg-card px-3 text-xs uppercase text-muted-foreground font-medium">
                Or continue with
              </span>
            </div>
          </div>

          <GoogleButton
            onClick={handleGoogleSignUp}
            text="Sign Up with Google"
            className="w-full py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 shadow-sm"
          />
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 pt-2 pb-6">
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Button
              variant="link"
              className="p-0 h-auto font-semibold text-primary"
              onClick={() => navigate("/user/auth/signin")}
            >
              Sign in
            </Button>
          </p>
        </CardFooter>
      </Card>
      
      <Button
        variant="outline"
        className="w-full shadow-md hover:shadow-lg transition-all font-semibold border-primary/20 hover:border-primary/40 text-foreground hover:bg-accent"
        onClick={() => navigate("/seller/auth/signup")}
      >
        Create a New Seller Account Instead
      </Button>
    </div>
  );
}