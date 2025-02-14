import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import "animate.css";
import axios from "../../lib/axios";
import { toast } from "react-toastify";
import { setPfp, setUser } from "@/redux/slices/user";
import {
  UserDetailsFormSchema,
  UserDetailsFormSchemaType,
} from "@/components/Auth/FormSchema";

export default function UserDetails() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserDetailsFormSchemaType>({
    resolver: zodResolver(UserDetailsFormSchema),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit: SubmitHandler<UserDetailsFormSchemaType> = async (data) => {
    setIsSubmitting(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/auth/get-id`
      );
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/user/${res.data}`,
        data
      );
      if (response.status === 200) {
        dispatch(
          setUser({
            id: response.data.user.id,
            name: response.data.user.name,
            email: response.data.user.email,
            address: response.data.user.address,
            answer: response.data.user.answer,
            phone: response.data.user.address,
          })
        );
        dispatch(setPfp(response.data.user.pfp));
        navigate("/seller/dashboard");
        toast.success("Account created successfully", {
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
  return (
    <div className="max-w-md w-full mx-auto space-y-8 sm:px-8 sm:p-4">
      <Card className="animate__animated animate__fadeIn shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-extrabold text-center">
            Additional Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="number"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[7-9]{1}[0-9]{9}$/,
                    message: "Invalid Phone number",
                  },
                })}
                placeholder="Phone number is required"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                type="text"
                {...register("address", {
                  required: "Address is required",
                })}
                placeholder="Email ID"
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address.message}</p>
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

            <div className="space-y-2">
              <Label htmlFor="answer">Answer</Label>
              <Input
                id="answer"
                type="text"
                {...register("answer", {
                  required: "Answer to the security question is required",
                })}
                placeholder="what is your favourite word"
              />
              {errors.answer && (
                <p className="text-red-500 text-sm">{errors.answer.message}</p>
              )}
            </div>

            <Button
              className="w-full bg-green-700 hover:bg-green-950 text-white"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
