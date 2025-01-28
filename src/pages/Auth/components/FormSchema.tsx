import { z } from "zod";

export const SellerRegistrationFormSchema = z.object({
  pfp: z.instanceof(File).nullable(),
  companyName: z.string().min(1, "Company name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 8 characters"),
  phone: z
    .string()
    .regex(/^[7-9]{1}[0-9]{9}$/, "Please enter a valid 10-digit phone number"),
  companyAddress: z.string().min(1, "Company address is required"),
  securityQuestion: z.string().min(1, "Security question is required"),
});

export type SellerRegFormSchemaType = z.infer<
  typeof SellerRegistrationFormSchema
>;

export const UserRegistrationFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 8 characters"),
  phone: z
    .string()
    .regex(/^[7-9]{1}[0-9]{9}$/, "Please enter a valid 10-digit phone number"),
  address: z.string().min(1, "Address is required"),
  securityQuestion: z.string().min(1, "Security question is required"),
});

export type UserRegFormSchemaType = z.infer<typeof UserRegistrationFormSchema>;

export const LoginFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 8 characters"),
});

export type LoginFormSchemaType = z.infer<typeof LoginFormSchema>;

export const ForgotPasswordFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  answer: z.string().min(1, "Answer is required"),
  password: z.string().min(6, "Password must be at least 8 characters"),
});

export type ForgotPasswordFormSchemaType = z.infer<typeof ForgotPasswordFormSchema>;