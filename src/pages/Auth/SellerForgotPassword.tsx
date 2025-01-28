import { SubmitHandler } from "react-hook-form";
import { ForgotPasswordFormSchemaType } from "./components/FormSchema";
import ForgetPasswordForm from "./components/ForgetPasswordForm";
import { useState } from "react";

const SellerForgotPassword = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const onSubmit: SubmitHandler<ForgotPasswordFormSchemaType> = async (
    data
  ) => {
    setIsSubmitting(true);
  };
  return (
    <ForgetPasswordForm
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
      navigateUrl="/seller/auth/login"
    />
  );
};

export default SellerForgotPassword;
