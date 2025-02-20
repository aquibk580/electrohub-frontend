import { SubmitHandler } from "react-hook-form";
import { ForgotPasswordFormSchemaType } from "@/components/Auth/FormSchema";
import ForgetPasswordForm from "@/components/Auth/ForgetPasswordForm";
import { useState } from "react";
import axios from "../../lib/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserForgotPassword = () => {
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
        navigate("/user/auth/signin");
      }
    } catch (error: any) {
      if (error.response.data?.flag === "InvalidCredentials") {
        toast.error("Invalid Credentials", {
          position: "top-center",
          theme: "light",
        });
      } else if (error.response.data?.flag === "UserNotFound") {
        toast.error("User does not exists", {
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
    <>
      <ForgetPasswordForm
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        navigateUrl={"/user/auth/signin"}
      />
    </>
  );
};

export default UserForgotPassword;
