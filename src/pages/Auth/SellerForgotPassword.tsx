import { SubmitHandler } from "react-hook-form";
import { ForgotPasswordFormSchemaType } from "@/components/Auth/FormSchema";
import ForgetPasswordForm from "@/components/Auth/ForgetPasswordForm";
import { useState } from "react";
import axios from "../../lib/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SellerForgotPassword = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const onSubmit: SubmitHandler<ForgotPasswordFormSchemaType> = async (
    data
  ) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/auth/forgot-password`,
        data
      );
      if (response.status === 200) {
        toast.success("Password reset successfull", {
          position: "top-center",
          theme: "light",
        });
        navigate("/seller/auth/signin");
      }
    } catch (error: any) {
      if (error.response.data?.flag === "InvalidCredentials") {
        toast.error("Invalid Credentials", {
          position: "top-center",
          theme: "light",
        });
      } else if (error.response.data?.flag === "SellerNotFound") {
        toast.error("Seller not found", {
          position: "top-center",
          theme: "light",
        });
      } else {
        toast.error(error.message, {
          position: "top-center",
          theme: "light",
        });
      }
    }
  };
  return (
    <ForgetPasswordForm
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
      navigateUrl="/seller/auth/signin"
    />
  );
};

export default SellerForgotPassword;
