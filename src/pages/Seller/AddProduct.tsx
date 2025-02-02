import { useEffect, useState } from "react";
import type React from "react"; // Added import for React
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import axios from "../../lib/axios";

const schema = z.object({
  productName: z.string().min(1, "Product name is required"),
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
    z.number().int().nonnegative("Stock must be a non-negative integer")
  ),
  category: z.string().min(1, "Category is required"),
  status: z.string().min(1, "Status is required"),
  brand: z
    .string()
    .min(2, "Brand is required and must be at least 2 characters long"),
  model: z
    .string()
    .min(2, "Model must be at least 2 characters long")
    .optional()
    .or(z.literal("")),
  color: z
    .string()
    .min(3, "Color must be at least 3 characters long")
    .optional()
    .or(z.literal("")),
  warranty: z
    .string()
    .min(1, "Warranty must be at least 1 digit long")
    .optional()
    .or(z.literal("")),
  buildMaterial: z
    .string()
    .min(2, "Build material must be at least 2 characters long")
    .optional()
    .or(z.literal("")),
});

type FormData = z.infer<typeof schema>;

interface Category {
  name: string;
  imageUrl: string;
}

export default function AddProductForm() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [images, setImages] = useState<(File | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const [previews, setPreviews] = useState<string[]>(["", "", "", ""]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      productName: "",
      description: "",
      price: 0,
      offerPercentage: 0,
      stock: 0,
      category: "",
      status: "",
      brand: "",
      model: "",
      color: "",
      warranty: "",
      buildMaterial: "",
    },
  });

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newPreviews = [...previews];
        newPreviews[index] = reader.result as string;
        setPreviews(newPreviews);
      };
      reader.readAsDataURL(file);

      const newImages = [...images];
      newImages[index] = file;
      setImages(newImages);
    }
  };

  const onSubmit = (data: FormData) => {
    const formData = new FormData();

    // Append form fields
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });

    // Append images
    images.forEach((image, index) => {
      if (image) {
        formData.append(`image${index + 1}`, image);
      }
    });

    // Here you would typically send the formData to your API
    console.log("Form data to be sent:", formData);

    // If you need to log the actual contents:
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }
  };

  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/categories"
        );
        if (response.status === 200) {
          setCategories(response.data);
        }
      } catch (error: any) {
        console.log(error);
      }
    };

    getAllCategories();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add Product</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Image Upload Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {previews.map((preview, index) => (
            <Card key={index} className="relative">
              <CardContent className="p-2">
                <div className="relative aspect-square border-2 border-dashed rounded-lg flex items-center justify-center overflow-hidden">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, index)}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  />
                  {preview ? (
                    <img
                      src={preview || "/placeholder.svg"}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <Upload className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm">
                        {index === 3
                          ? "Upload Image (Optional)"
                          : `Upload Image (${index + 1})`}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Basic Product Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="productName">Product Name</Label>
            <Controller
              name="productName"
              control={control}
              render={({ field }) => (
                <Input {...field} id="productName" placeholder="Type here" />
              )}
            />
            {errors.productName && (
              <p className="text-red-500 text-sm">
                {errors.productName.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Product Description</Label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea {...field} id="description" placeholder="Type here" />
              )}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="price"
                  type="number"
                  placeholder="Type here"
                />
              )}
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="offerPercentage">Offer Percentage</Label>
            <Controller
              name="offerPercentage"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="offerPercentage"
                  type="number"
                  placeholder="Type here"
                />
              )}
            />
            {errors.offerPercentage && (
              <p className="text-red-500 text-sm">
                {errors.offerPercentage.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="stock">Stock</Label>
            <Controller
              name="stock"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="stock"
                  type="number"
                  placeholder="Type here"
                />
              )}
            />
            {errors.stock && (
              <p className="text-red-500 text-sm">{errors.stock.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem value={category.name.toLowerCase()}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.status && (
              <p className="text-red-500 text-sm">{errors.status.message}</p>
            )}
          </div>
        </div>

        {/* Product Specifications */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Product Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="brand">Brand</Label>
              <Controller
                name="brand"
                control={control}
                render={({ field }) => (
                  <Input {...field} id="brand" placeholder="e.g. MSI" />
                )}
              />
              {errors.brand && (
                <p className="text-red-500 text-sm">{errors.brand.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="model">Model</Label>
              <Controller
                name="model"
                control={control}
                render={({ field }) => (
                  <Input {...field} id="model" placeholder="e.g S22" />
                )}
              />
              {errors.model && (
                <p className="text-red-500 text-sm">{errors.model.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <Controller
                name="color"
                control={control}
                render={({ field }) => (
                  <Input {...field} id="color" placeholder="e.g blue" />
                )}
              />
              {errors.color && (
                <p className="text-red-500 text-sm">{errors.color.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="warranty">Warranty</Label>
              <Controller
                name="warranty"
                control={control}
                render={({ field }) => (
                  <Input {...field} id="warranty" placeholder="e.g 1 year" />
                )}
              />
              {errors.warranty && (
                <p className="text-red-500 text-sm">
                  {errors.warranty.message}
                </p>
              )}
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="buildMaterial">Build Material</Label>
              <Controller
                name="buildMaterial"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="buildMaterial"
                    placeholder="e.g metal"
                  />
                )}
              />
              {errors.buildMaterial && (
                <p className="text-red-500 text-sm">
                  {errors.buildMaterial.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-[#0B3B0B] hover:bg-[#0B3B0B]/90 text-white"
        >
          Add Product
        </Button>
      </form>
    </div>
  );
}
