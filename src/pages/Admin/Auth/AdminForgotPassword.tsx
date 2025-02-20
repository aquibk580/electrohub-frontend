import { SubmitHandler, useForm } from "react-hook-form";
import {
  AdminForgotPasswordFormSchemaType,
  AdminForgotPasswordFormSchema,
} from "@/components/Auth/FormSchema";
import { useState } from "react";
import axios from "@/lib/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { zodResolver } from "@hookform/resolvers/zod";

const UserForgotPassword = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminForgotPasswordFormSchemaType>({
    resolver: zodResolver(AdminForgotPasswordFormSchema),
  });

  const onSubmit: SubmitHandler<AdminForgotPasswordFormSchemaType> = async (
    data
  ) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/admin/auth/forgot-password`,
        data
      );
      if (response.status === 200) {
        toast.success("Password reset successfull", {
          position: "top-center",
          theme: "light",
        });
        navigate("/admin/auth/signin");
      }
    } catch (error: any) {
      if (error.response.data?.flag === "AdminNotFound") {
        toast.error("Admin not found", {
          position: "top-center",
          theme: "dark",
        });
      } else if (error.response.data?.flag === "InvadlidCredentials") {
        toast.error("Invalid Credentials", {
          position: "top-center",
          theme: "dark",
        });
      } else {
        toast.error(error.message, {
          position: "top-center",
          theme: "dark",
        });
      }
    }
  };
  return (
    <div className="max-w-md w-full mx-auto space-y-8 sm:px-8 sm:p-4">
      <Card className="animate__animated animate__fadeIn shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-extrabold text-center">
            Reset Password
          </CardTitle>
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
              <Label htmlFor="password">New Password</Label>
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

            <Button
              className="w-full bg-green-700 hover:bg-green-950 text-white"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Resetting..." : "Reset"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <p className="text-center text-sm font-medium">
            Remembered your password?{" "}
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

export default UserForgotPassword;
