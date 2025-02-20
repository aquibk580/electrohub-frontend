"use client"

import { useEffect, useState } from "react"
import type React from "react" // Added import for React
import { useForm, useFieldArray, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CloudUpload, Plus, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import axios from "../../lib/axios"
import { AddProductSchema, type AddProductSchematype } from "@/components/Seller/FormSchema"
// import { Separator } from "@radix-ui/react-dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { useSelector } from "react-redux"
import type { RootState } from "@/redux/store"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

interface Category {
  name: string
}

export default function AddProductForm() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const navigate = useNavigate()
  const [categories, setCategories] = useState<Category[]>([])
  const seller = useSelector((state: RootState) => state.seller.seller)
  const [images, setImages] = useState<(File | null)[]>([null, null, null, null, null])
  const [previews, setPreviews] = useState<string[]>(["", "", "", "", ""])
  const [fileNames, setFileNames] = useState<string[]>(Array(previews.length).fill("No Selected File"))

  const { control, handleSubmit, register, formState: { errors }, } = useForm<AddProductSchematype>({
    resolver: zodResolver(AddProductSchema),
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
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "details",
  })

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
  //   const file = e.target.files?.[0] || null
  //   if (file) {
  //     const reader = new FileReader()
  //     reader.onloadend = () => {
  //       const newPreviews = [...previews]

  //       newPreviews[index] = reader.result as string

  //       const newFileNames = [...fileNames]
  //       newFileNames[index] = file.name

  //       setPreviews(newPreviews)
  //       setFileNames(newFileNames)
  //     }
  //     reader.readAsDataURL(file)

  //     const newImages = [...images]
  //     newImages[index] = file
  //     setImages(newImages)
  //   }
  // }
  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    let file: File | null = null;

    if ("dataTransfer" in e) {
      // Handle Drag and Drop
      e.preventDefault();
      const items = e.dataTransfer.items;

      for (const item of items) {
        if (item.kind === "file") {
          file = item.getAsFile();
        } else if (item.kind === "string") {
          // Handle dragging an image from a website
          item.getAsString(async (url) => {
            if (url.startsWith("http")) {
              try {
                file = await urlToFile(url);
                updateImageState(file, index);
              } catch (error) {
                console.error("Failed to download image:", error);
              }
            }
          });
          return;
        }
      }
    } else {
      // Handle File Input
      file = e.target.files?.[0] || null;
    }

    if (file) {
      updateImageState(file, index);
    }
  };

  const urlToFile = async (imageUrl: string) => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    return new File([blob], "dropped-image.jpg", { type: blob.type });
  };

  const updateImageState = (file: File | null, index: number) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const newPreviews = [...previews];
      newPreviews[index] = reader.result as string;

      const newFileNames = [...fileNames];
      newFileNames[index] = file.name;

      setPreviews(newPreviews);
      setFileNames(newFileNames);
    };
    reader.readAsDataURL(file);

    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
  };


  const onSubmit = async (data: AddProductSchematype) => {
    setIsSubmitting(true)
    const formData = new FormData()

    Object.entries(data).forEach(([key, value]) => {
      if (key === "details" && Array.isArray(value)) {
        formData.append(key, JSON.stringify(value))
      } else {
        formData.append(key, value.toString())
      }
    })

    images.forEach((image) => {
      if (image) {
        formData.append("images", image)
      }
    })

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/seller/products/${seller!.id}`, formData)
      if (response.status === 201) {
        toast.success("Product added successfully", {
          position: "top-center",
          theme: "dark",
        })
        navigate("/seller/dashboard/products")
      }
    } catch (error: any) {
      toast.error(error.message, {
        position: "top-center",
        theme: "dark",
      })
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatFileName = (fileName: string) => {
    if (fileName === "No Selected File") return fileName

    const maxLength = 10 // Limit the name length
    const extension = fileName.split(".").pop() // Get file extension
    const namePart = fileName.slice(0, maxLength) // Get the first 15 characters of the file name

    return `${namePart}...${extension ? "." + extension : ""}`
  }

  // Function to remove the image at a specific index
  const removeImage = (index: number) => {
    const newFileNames = [...fileNames]
    const newPreviews = [...previews]

    // Reset the specific index to initial values
    newFileNames[index] = "No Selected File"
    newPreviews[index] = "" // Clear the preview
    setImages(images.filter((_, i) => i !== index))

    setFileNames(newFileNames)
    setPreviews(newPreviews)
  }

  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/categories`)
        if (response.status === 200) {
          setCategories(response.data)
        }
      } catch (error: any) {
        console.log(error)
      }
    }

    getAllCategories()
  }, [])

  return (
    <div className=" mx-auto p-2 animate__animated animate__fadeIn">
      <h1 className="text-xl bg-primary text-primary-foreground  pl-5 p-2 rounded-lg font-semibold mb-2">Add Product</h1>

      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-4 p-2">
        {/* Image Upload Section */}
        <div className="flex flex-wrap place-content-center gap-5 p-2 ">
          {previews.map((preview, index) => (
            <div key={index} className="space-y-2 flex flex-col w-fit h-fit items-center  ">
              <p className="text-sm font-semibold text-center text-accent-foreground/80">
                Upload Product Image
                <li key={index} className="list-none">
                  {index === 0 ? "(Primary)" : ""}
                  {index === 1 ? "(Secondary)" : ""}
                  {index === 2 ? "(Tertiary)" : ""}
                  {index >= 3 ? "(Optional)" : ""}
                </li>
              </p>

              <div
                className="relative w-[21rem] h-64 md:h-48 md:w-48 lg:w-52 lg:h-52 sm:h-64 sm:w-64 p-2 rounded-lg bg-card text-card-foreground"
                onDrop={(e) => handleImageChange(e, index)}
                onDragOver={(e) => e.preventDefault()} // Prevent default to allow drop
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, index)}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  required={index < 3}
                  title=""
                />
                {preview ? (
                  <img
                    src={preview || "/placeholder.svg"}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full rounded-md object-cover"
                  />
                ) : (
                  <div className="flex flex-col justify-center shadow-sm   border-dashed border-2 rounded-md border-gray-400 items-center w-full h-full ">
                    {/* <img className="w-full" src={assets.image || "/placeholder.svg"} alt="" /> */}
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-24 text-primary"
                    >
                      <path
                        d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15"
                        className="stroke-current"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <p className="text-center text-sm text-primary">Browse File to upload!</p>
                  </div>
                )}
              </div>
              <div className="p-1 px-2 w-full flex shadow-sm items-center justify-between rounded-md  bg-card">
                <div className=" rounded-full  bg-muted p-1">
                  {" "}
                  <CloudUpload />
                </div>
                <span className="text-sm ">
                  {fileNames[index] ? formatFileName(fileNames[index]) : "No Selected File"}
                </span>

                <div
                  className=" rounded-lg cursor-pointer bg-destructive/10 text-destructive p-1"
                  onClick={() => removeImage(index)}
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
              render={({ field }) => <Input {...field} id="name" className="py-5" placeholder="Type here" />}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div className="space-y-1">
            <Label htmlFor="description" className="text-md font-medium">
              Product Description
            </Label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => <Input {...field} id="description" className="py-5" placeholder="Type here" />}
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>
          <div className="space-y-1">
            <Label htmlFor="price" className="text-md font-medium">
              Price
            </Label>
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <Input {...field} id="price" type="number" className="py-5" placeholder="Type here" />
              )}
            />
            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
          </div>
          <div className="space-y-1">
            <Label htmlFor="offerPercentage" className="text-md font-medium">
              Offer Percentage
            </Label>
            <Controller
              name="offerPercentage"
              control={control}
              render={({ field }) => (
                <Input {...field} id="offerPercentage" type="number" className="py-5" placeholder="Type here" />
              )}
            />
            {errors.offerPercentage && <p className="text-red-500 text-sm">{errors.offerPercentage.message}</p>}
          </div>
          <div className="space-y-1">
            <Label htmlFor="stock" className="text-md font-medium">
              Stock
            </Label>
            <Controller
              name="stock"
              control={control}
              render={({ field }) => (
                <Input {...field} id="stock" type="number" className="py-5" placeholder="Type here" />
              )}
            />
            {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message}</p>}
          </div>
          <div className="space-y-1">
            <Label htmlFor="categoryName" className="text-md font-medium">
              Category
            </Label>
            <Controller
              name="categoryName"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="py-5">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category, index) => (
                      <SelectItem key={index} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.categoryName && <p className="text-red-500 text-sm">{errors.categoryName.message}</p>}
          </div>
          <div className="space-y-1">
            <Label htmlFor="status" className="text-md font-medium">
              Status
            </Label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="py-5">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="OutOfStock">OutOfStock</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="brand" className="text-sm font-medium">
                Brand
              </Label>
              <Controller
                name="brand"
                control={control}
                render={({ field }) => <Input {...field} id="brand" placeholder="e.g. MSI" />}
              />
              {errors.brand && <p className="text-sm text-destructive">{errors.brand.message}</p>}
            </div>
          </div>
        </div>

        {/* Product Specifications */}

        <Separator />
        <h2 className="text-xl font-semibold mb-4 bg-primary text-primary-foreground pl-4 p-2 rounded-lg">Additional Product Details</h2>
        <div className="space-y-4">
          <Label className="text-sm font-medium">Custom Attributes</Label>
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-2">
              <Input {...register(`details.${index}.key`)} placeholder="Key" className="flex-1" />
              <Input {...register(`details.${index}.value`)} placeholder="Value" className="flex-1" />
              <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}>
                <X className="h-4 w-4" strokeWidth={4} />
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
            className="  bg-primary font-semibold text-lg rounded-lg md:px-32 py-6 hover:bg-primary/90 shadow-lg "
          >
            {!isSubmitting ? "Add Product" : "Adding..."}
          </Button>
        </div>
      </form>
    </div>
  )
}

