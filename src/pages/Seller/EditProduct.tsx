import { useEffect, useState } from "react";
import type React from "react"; // Added import for React
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CloudUpload, MoveLeft, Plus, Trash2, X } from "lucide-react";
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

import { assets } from "@/assets/assets";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  EditProductSchema,
  EditProductSchemaType,
} from "@/components/Seller/FormSchema";
import axios from "../../lib/axios";
import { toast } from "react-toastify";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Category, Product } from "@/components/product/productTypes";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [isEditting, setIsEditting] = useState<boolean>(false);
  const [product, setProduct] = useState<Product | null>(
    location.state?.product || null
  );
  const [categories, setCategories] = useState<Category[]>([]);
  const [images, setImages] = useState<(File | null)[]>([
    null,
    null,
    null,
    null,
    null,
  ]);

  const [previews, setPreviews] = useState<
    Array<{ id: number | null; url: string }>
  >(() =>
    location.state?.product?.images
      ? location.state.product.images.map(
          (image: { id: number; url: string }) => ({
            id: image.id ?? null,
            url: image.url,
          })
        )
      : []
  );

  const [fileNames, setFileNames] = useState<string[]>(
    Array(previews.length).fill("No Selected File")
  );

  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<EditProductSchemaType>({
    resolver: zodResolver(EditProductSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      offerPercentage: 0,
      stock: 0,
      categoryName: "",
      status: "",
      brand: "",
      details: [{ key: "", value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "details",
  });

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/api/seller/products/single-product/${id}`
        );
        if (response.status === 200) {
          setProduct(response.data);
        }
      } catch (error: any) {
        console.log(error);
        toast.error(error.message, { position: "top-center", theme: "dark" });
      }
    };

    getProduct();
  }, []);

  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/categories`
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

  useEffect(() => {
    if (product?.images) {
      setPreviews(
        product.images.map((image) => ({
          id: image.id,
          url: image.url,
        }))
      );
    }
    setValue("name", product?.name);
    setValue("description", product?.description);
    setValue("categoryName", product?.categoryName);
    setValue("price", product?.price);
    setValue("brand", product?.productInfo?.brand);
    setValue("offerPercentage", product?.offerPercentage);
    setValue("status", product?.status);
    setValue("stock", product?.stock);
    if (product?.productInfo?.details) {
      const parsedDetails =
        typeof product.productInfo.details === "string"
          ? JSON.parse(product.productInfo.details)
          : product.productInfo.details;

      setValue("details", parsedDetails);
    }
  }, [product, setValue]);

  const previewSlots = Array.from(
    { length: 5 },
    (_, index) => previews[index] || { id: null, url: null }
  );

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    e.target.value = "";

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviews((prev) => {
        const newPreviews = [...prev];
        newPreviews[index] = { id: null, url: reader.result as string };
        return newPreviews;
      });

      setFileNames((prev) => {
        const newFileNames = [...prev];
        newFileNames[index] = file.name;
        return newFileNames;
      });

      setImages((prev) => {
        const newImages = [...prev];
        newImages[index] = file;
        return newImages;
      });
    };

    reader.readAsDataURL(file);
  };

  const onSubmit = async (data: EditProductSchemaType) => {
    setIsEditting(true);
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "details" && Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value.toString());
      }
    });

    images.forEach((image) => {
      if (image) {
        formData.append("images", image);
      }
    });

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/seller/products/${product!.id}`,
        formData
      );
      if (response.status === 200) {
        toast.success("Product Updated successfully", {
          position: "top-center",
          theme: "dark",
        });
        navigate(`/seller/dashboard/products/view-product/${product?.id}`, {
          state: {
            product,
          },
        });
      }
    } catch (error: any) {
      toast.error(error.message, {
        position: "top-center",
        theme: "dark",
      });
      console.log(error);
    } finally {
      setIsEditting(false);
    }
  };

  const formatFileName = (fileName: string) => {
    if (fileName === "No Selected File") return fileName;

    const maxLength = 10; // Limit the name length
    const extension = fileName.split(".").pop(); // Get file extension
    const namePart = fileName.slice(0, maxLength); // Get the first 15 characters of the file name

    return `${namePart}...${extension ? "." + extension : ""}`;
  };

  // Function to remove the image at a specific index
  const removeImage = async (index: number, imageId: number | null) => {
    try {
      if (imageId) {
        const response = await axios.delete(
          `${import.meta.env.VITE_API_URL}/api/seller/products/image/${imageId}`
        );

        if (response.status === 200) {
          setPreviews((prev) =>
            prev.map((item, i) => (i === index ? { id: null, url: "" } : item))
          );
          setFileNames((prev) =>
            prev.map((name, i) => (i === index ? "No Selected File" : name))
          );
        }
      } else {
        setPreviews((prev) =>
          prev.map((item, i) => (i === index ? { id: null, url: "" } : item))
        );
        setImages((prev) => prev.map((item, i) => (i === index ? null : item)));
        setFileNames((prev) =>
          prev.map((name, i) => (i === index ? "No Selected File" : name))
        );
      }
    } catch (error: any) {
      if (error.response) {
        const { status, data } = error.response;

        if (status === 400 && data?.status === "ImageQuantityError") {
          toast.warning(data.error, {
            position: "top-center",
            theme: "dark",
          });
          return;
        }
      }
      console.error(error);
      toast.error(error.message || "Failed to remove image", {
        position: "top-center",
        theme: "dark",
      });
    }
  };

  return (
    <div className="space-y-2">
      <div className=" mx-auto p-2  rounded-xl   animate__animated animate__fadeIn">
        <Button
          variant="outline"
          className="text-sm text-gray-700  border-none bg-transparent rounded-full hover:bg-zinc-50  shadow-none"
          onClick={() => navigate(-1)}
        >
          <MoveLeft /> Back to Orders
        </Button>
        <h1 className="text-xl mt-4 bg-zinc-100  pl-5 p-2 rounded-lg font-semibold mb-2">
          Edit Product
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4  p-2">
          {/* Image Upload Section */}
          <div className="flex flex-wrap place-content-center gap-5 p-2 ">
            {previewSlots.map((preview, index) => (
              <div
                key={index}
                className="space-y-2 flex flex-col w-fit h-fit items-center  "
              >
                <p className="text-sm font-semibold text-center text-gray-700">
                  Upload Product Image
                  <li key={index} className="list-none">
                    {index === 0 ? "(Primary)" : ""}
                    {index === 1 ? "(Secondary)" : ""}
                    {index === 2 ? "(Tertiary)" : ""}
                    {index >= 3 ? "(Optional)" : ""}
                  </li>
                </p>

                <div className="relative w-[21rem] h-64 md:h-48 md:w-48 lg:w-52  lg:h-52 sm:h-64 sm:w-64 p-2 rounded-lg  bg-zinc-50  ">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, index)}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    required={false}
                    title=""
                  />
                  {preview.url ? (
                    <img
                      src={preview.url}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full rounded-md object-cover"
                    />
                  ) : (
                    <div className="flex flex-col justify-center shadow-sm   border-dashed border-2 rounded-md border-gray-400 items-center w-full h-full ">
                      {/* <img className="w-full" src={assets.image} alt="" /> */}
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-24"
                      >
                        <path
                          d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15"
                          stroke="grey"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                      <p className="text-center text-sm text-gray-800">
                        Browse File to upload!
                      </p>
                    </div>
                  )}
                </div>
                <div className="p-1 px-2 w-full flex shadow-sm items-center justify-between rounded-md  bg-zinc-50">
                  <div className=" rounded-full  bg-zinc-100 p-1">
                    {" "}
                    <CloudUpload />
                  </div>
                  <span className="text-sm ">
                    {fileNames[index]
                      ? formatFileName(fileNames[index])
                      : preview.url
                      ? preview?.url?.substring(0, 18)
                      : "No Selected File"}
                  </span>

                  <div
                    className=" rounded-lg cursor-pointer bg-red-100 text-red-600 p-1"
                    onClick={() => removeImage(index, preview.id)}
                  >
                    <Trash2 />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Basic Product Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 gap-x-8  ">
            <div className="space-y-1">
              <Label htmlFor="name" className="text-md font-medium">
                Product Name
              </Label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    id="name"
                    className=" text-start "
                    placeholder="Type here"
                  />
                )}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-1 ">
              <Label htmlFor="description" className="text-md font-medium">
                Product Description
              </Label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    id="description"
                    className="align-text-top"
                    placeholder="Type here"
                  />
                )}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="price" className="text-md font-medium">
                Price
              </Label>
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="price"
                    type="number"
                    className="py-5"
                    placeholder="Type here"
                  />
                )}
              />
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price.message}</p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="offerPercentage" className="text-md font-medium">
                Offer Percentage
              </Label>
              <Controller
                name="offerPercentage"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="offerPercentage"
                    type="number"
                    className="py-5"
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
            <div className="space-y-1">
              <Label htmlFor="stock" className="text-md font-medium">
                Stock
              </Label>
              <Controller
                name="stock"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="stock"
                    type="number"
                    className="py-5"
                    placeholder="Type here"
                  />
                )}
              />
              {errors.stock && (
                <p className="text-red-500 text-sm">{errors.stock.message}</p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="categoryName" className="text-md font-medium">
                Category
              </Label>
              <Controller
                name="categoryName"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || product?.categoryName || ""}
                  >
                    <SelectTrigger className="py-5">
                      <SelectValue placeholder="Select category">
                        {field.value ||
                          product?.categoryName ||
                          "Select category"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.categoryName && (
                <p className="text-red-500 text-sm">
                  {errors.categoryName.message}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="status" className="text-md font-medium">
                Status
              </Label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || product?.status || ""}
                  >
                    <SelectTrigger className="py-5">
                      <SelectValue placeholder="Select status">
                        {field.value || product?.status || "Select status"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                      <SelectItem value="OutOfStock">Out Of Stock</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.status && (
                <p className="text-red-500 text-sm">{errors.status.message}</p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 gap-x-8">
              <div className="space-y-1">
                <Label htmlFor="brand" className="text-md font-medium">
                  Brand
                </Label>
                <Controller
                  name="brand"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="brand"
                      className="py-5"
                      placeholder="e.g. MSI"
                    />
                  )}
                />
                {errors.brand && (
                  <p className="text-red-500 text-sm">{errors.brand.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Product Specifications */}

          <Separator />
          <h2 className="text-xl font-semibold mb-4 bg-zinc-100 pl-4 p-2 rounded-lg">
            Additional Product Details
          </h2>
          <div className="space-y-4">
            <Label className="text-sm font-medium">Custom Attributes</Label>
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center space-x-2">
                <Input
                  {...register(`details.${index}.key`)}
                  placeholder="Key"
                  className="flex-1"
                />
                <Input
                  {...register(`details.${index}.value`)}
                  placeholder="Value"
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => remove(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => append({ key: "", value: "" })}
            >
              <Plus className="h-4 w-4 mr-2" /> Add Attribute
            </Button>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-center">
            <Button
              type="submit"
              className="  bg-[#041e04] font-semibold text-lg rounded-lg md:px-32 py-6 hover:bg-[#052105] shadow-lg text-white"
            >
              {!isEditting ? "Edit Product" : "Editting..."}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
