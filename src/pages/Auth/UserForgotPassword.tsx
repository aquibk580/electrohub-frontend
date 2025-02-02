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
        "http://localhost:8000/api/user/auth/forgot-password",
        data
      );
      if (response.status === 200) {
        toast.success("Password reset successfull", {
          position: "top-center",
          theme: "light",
        });
        navigate("/user/auth/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <ForgetPasswordForm
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        navigateUrl={"/user/auth/login"}
      />
    </>
  );
};

export default UserForgotPassword;
