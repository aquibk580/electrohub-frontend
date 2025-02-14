import { z, ZodSchema } from "zod";

export const SellerRegistrationFormSchema: ZodSchema = z.object({
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

export const UserRegistrationFormSchema: ZodSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 8 characters"),
  phone: z
    .string()
    .regex(/^[7-9]{1}[0-9]{9}$/, "Please enter a valid 10-digit phone number"),
  address: z.string().min(1, "Address is required"),
  answer: z.string().min(1, "Security question is required"),
});

export type UserRegFormSchemaType = z.infer<typeof UserRegistrationFormSchema>;

export const LoginFormSchema: ZodSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 8 characters"),
});

export type LoginFormSchemaType = z.infer<typeof LoginFormSchema>;

export const ForgotPasswordFormSchema: ZodSchema = z.object({
  email: z.string().email("Invalid email address"),
  answer: z.string().min(1, "Answer is required"),
  password: z.string().min(6, "Password must be at least 8 characters"),
});

export type ForgotPasswordFormSchemaType = z.infer<
  typeof ForgotPasswordFormSchema
>;

export const UserDetailsFormSchema: ZodSchema = z.object({
  password: z.string().min(6, "Password must be at least 8 characters"),
  answer: z.string().min(1, "Answer is required"),
  address: z.string().min(1, "Address is required"),
  phone: z
    .string()
    .regex(/^[7-9]{1}[0-9]{9}$/, "Please enter a valid 10-digit phone number"),
});

export type UserDetailsFormSchemaType = z.infer<typeof UserDetailsFormSchema>;

export const SellerDetailsFormSchema: ZodSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
  answer: z.string().min(1, "Answer is required"),
  address: z.string().min(1, "Address is required"),
  phone: z
    .string()
    .regex(/^[7-9]{1}[0-9]{9}$/, "Please enter a valid 10-digit phone number"),
  pfp: z
    .custom<File>((file) => {
      if (!(file instanceof File)) {
        throw new Error("Invalid file");
      }
      const allowedTypes = ["image/jpeg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        throw new Error("Only JPEG and PNG files are allowed");
      }

      const maxSize = 2 * 1024 * 1024;
      if (file.size > maxSize) {
        throw new Error("File size must be under 2MB");
      }

      return file;
    })
    .optional(),
});

export type SellerDetailsFormSchemaType = z.infer<
  typeof SellerDetailsFormSchema
>;

export const AdminRegistrationFormSchema: ZodSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  secretKey: z
    .string()
    .min(6, "Admin scret key must be at least 6 characters long"),
});

export type AdminRegistrationFormSchemaType = z.infer<
  typeof AdminRegistrationFormSchema
>;

export const AdminForgotPasswordFormSchema: ZodSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  secretKey: z
    .string()
    .min(6, "Admin scret key must be at least 6 characters long"),
});

export type AdminForgotPasswordFormSchemaType = z.infer<
  typeof AdminForgotPasswordFormSchema
>;
