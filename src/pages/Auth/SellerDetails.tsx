import "animate.css";

import { SellerDetailsFormSchema, SellerDetailsFormSchemaType, } from "@/components/Auth/FormSchema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { setSeller } from "@/redux/slices/seller";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { assets } from "@/assets/assets";
import { toast } from "react-toastify";
import { useState } from "react";

import axios from "../../lib/axios";
export default function SellerDetails() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SellerDetailsFormSchemaType>({
    resolver: zodResolver(SellerDetailsFormSchema),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setProfileImage(file);
      setValue("pfp", file);
    }
  };

  const onSubmit: SubmitHandler<SellerDetailsFormSchemaType> = async (data) => {
    setIsSubmitting(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/auth/get-id`
      );
      const { address, phone, answer, password, pfp } = data;
      const formData = new FormData();
      formData.append("address", address);
      formData.append("phone", phone);
      formData.append("answer", answer);
      formData.append("password", password);
      if (pfp) {
        formData.append("pfp", pfp);
      }
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/seller/${res.data}`,
        formData
      );
      if (response.status === 200) {
        dispatch(
          setSeller({
            id: response.data.seller.id,
            name: response.data.seller.name,
            email: response.data.seller.email,
            address: response.data.seller.address,
            answer: response.data.seller.answer,
            phone: response.data.seller.address,
            pfp: response.data.seller.pfp,
          })
        );
        navigate("/seller/dashboard");
        toast.success("Seller Account created successfully", {
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
              <div className="flex flex-col items-center space-y-2">
                <Label htmlFor="pfp" className="cursor-pointer group relative">
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
                  id="pfp"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onFileChange}
                />
                <p className="text-sm text-gray-500">
                  Upload your logo (optional)
                </p>
              </div>
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
              {errors.phone && <p className="text-red-500 text-sm">{}</p>}
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
                <p className="text-red-500 text-sm">
                  {String(errors.address.message)}
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
                <p className="text-red-500 text-sm">
                  {String(errors.answer.message)}
                </p>
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
