import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  AdminRegistrationFormSchemaType,
  AdminRegistrationFormSchema,
} from "@/components/Auth/FormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { toast } from "react-toastify";
import axios from "@/lib/axios";
import { setAdmin } from "@/redux/slices/admin";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminRegistrationFormSchemaType>({
    resolver: zodResolver(AdminRegistrationFormSchema),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit: SubmitHandler<AdminRegistrationFormSchemaType> = async (
    data
  ) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/admin/auth/signup`,
        data
      );
      if (response.status === 201) {
        dispatch(
          setAdmin({
            id: response.data?.admin?.id,
            name: response.data?.admin?.name,
            email: response.data?.admin?.email,
          })
        );
        navigate("/admin/dashboard");
        toast.success("Signed up successfully", {
          position: "top-center",
          theme: "light",
        });
      }
    } catch (error: any) {
      if (error.response.data?.flag === "AdminExists") {
        toast.error("Admin already exists", {
          position: "top-center",
          theme: "light",
        });
      } else if (error.response.data?.flag === "InvadlidCredentials") {
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
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto space-y-8 sm:px-8 sm:p-4">
      <Card className="animate__animated animate__fadeIn shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-extrabold text-center">
            Sign Up
          </CardTitle>
          <CardDescription className="text-center text-gray-800">
            Sign Up to your Admin Account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Name</Label>
              <Input
                id="name"
                type="text"
                {...register("name", {
                  required: "Name is required",
                })}
                placeholder="Enter your name"
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

            <div className="space-y-2">
              <Label htmlFor="email">Admin secret key</Label>
              <Input
                id="secretKey"
                type="password"
                {...register("secretKey", {
                  required: "Secret key is required",
                })}
                placeholder="Enter Admin secret key"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">
                  {String(errors.name.message)}
                </p>
              )}
            </div>

            <div className="flex items-center justify-start">
              <Button
                variant="link"
                className="p-0 h-auto font-medium text-blue-950"
                onClick={() => navigate("/admin/auth/forgot-password")}
              >
                Forgot password?
              </Button>
            </div>

            <Button
              className="w-full bg-green-700 hover:bg-green-950 text-white"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing Up..." : "Sign Up"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <p className="text-center text-sm font-medium">
            Already have an Admin Account?{" "}
            <Button
              variant="link"
              className="p-0 h-auto font-semibold text-green-700"
              onClick={() => navigate("/admin/auth/signin")}
            >
              Sign In
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
