import * as z from "zod";

export const sellerSchema = z.object({
  name: z.string().min(1, "Company name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Company address is required"),
  answer:z.string().min(1, "Answer is required")
});

export type SellerFormData = z.infer<typeof sellerSchema>;

export const AddProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.preprocess(
    (val) => Number(val),
    z.number().positive("Price must be positive")
  ),
  offerPercentage: z.preprocess(
    (val) => Number(val),
    z.number().min(0).max(100, "Offer percentage must be between 0 and 100")
  ),
  stock: z.preprocess(
    (val) => Number(val),
    z.number().int().positive("Stock must be a positive integer")
  ),
  categoryName: z.string().min(1, "Category is required"),
  status: z.string().min(1, "Status is required"),
  brand: z
    .string()
    .min(2, "Brand is required and must be at least 2 characters long"),
  details: z
    .array(
      z.object({
        key: z.string().min(1, "Key is required"),
        value: z.string().min(1, "Value is required"),
      })
    )
    .optional(),
});

export type AddProductSchematype = z.infer<typeof AddProductSchema>;

export const EditProductSchema = z.object({
  name: z.string().min(1, "Product name is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
  price: z
    .preprocess(
      (val) => Number(val),
      z.number().positive("Price must be positive")
    )
    .optional(),
  offerPercentage: z
    .preprocess(
      (val) => Number(val),
      z.number().min(0).max(100, "Offer percentage must be between 0 and 100")
    )
    .optional(),
  stock: z
    .preprocess(
      (val) => Number(val),
      z.number().int().nonnegative("Stock must be a non-negative integer")
    )
    .optional(),
  categoryName: z.string().min(1, "Category is required").optional(),
  status: z.string().min(1, "Status is required").optional(),
  brand: z
    .string()
    .min(2, "Brand is required and must be at least 2 characters long")
    .optional(),
  details: z
    .array(
      z.object({
        key: z.string().min(1, "Key is required"),
        value: z.string().min(1, "Value is required"),
      })
    )
    .optional(),
});

export type EditProductSchemaType = z.infer<typeof EditProductSchema>;
