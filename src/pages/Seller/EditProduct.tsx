import { useEffect, useState } from "react"
import type React from "react"
import { useForm, Controller, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CloudUpload, MoveLeft, Plus, Trash2, X, Edit, Check, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EditProductSkeleton } from "@/components/Seller/Skeletons"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { EditProductSchema, type EditProductSchemaType } from "@/components/Seller/FormSchema"
import axios from "../../lib/axios"
import { toast } from "react-toastify"
import { Separator } from "@radix-ui/react-dropdown-menu"
import { Helmet } from "react-helmet-async"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Category {
  name: string
  imageUrl: string
}

interface Product {
  id: number
  name: string
  description: string
  price: number
  offerPercentage: number
  stock: number
  categoryName: string
  status: string
  brand: string
  productInfo: { brand: string; details: { key: string; value: string }[] }
  images: { id: number; url: string }[]
}

export default function EditProduct() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isEditting, setIsEditting] = useState<boolean>(false)
  const [product, setProduct] = useState<Product | null>(location.state?.product || null)
  const [categories, setCategories] = useState<Category[]>([])
  const [images, setImages] = useState<(File | null)[]>([null, null, null, null, null])

  const [previews, setPreviews] = useState<Array<{ id: number | null; url: string }>>(() =>
    location.state?.product?.images
      ? location.state.product.images.map((image: { id: number; url: string }) => ({
          id: image.id ?? null,
          url: image.url,
        }))
      : [],
  )

  const [fileNames, setFileNames] = useState<string[]>(Array(5).fill("No Selected File"))

  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [bgColor, setBgColor] = useState<string>("#ffffff")
  const [removedBgImage, setRemovedBgImage] = useState<string | null>(null)
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const bgColors = ["#ffffff", "#f0f0f0", "#000000", "#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"]

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
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "details",
  })

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/seller/products/single-product/${id}`)
        if (response.status === 200) {
          setProduct(response.data)
        }
      } catch (error: any) {
        console.error("Error fetching product:", error)
        toast.error(error.response?.data?.error || error.message, { position: "top-center", theme: "dark" })
      }
    }

    const getAllCategories = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/categories/all`)
        if (response.status === 200) {
          setCategories(response.data)
        }
      } catch (error: any) {
        console.error("Error fetching categories:", error)
        toast.error(error.response?.data?.error || error.message, { position: "top-center", theme: "dark" })
      }
    }

    const loadData = async () => {
      setIsLoading(true)
      try {
        await Promise.all([getProduct(), getAllCategories()])
      } catch (error) {
        console.error("Error loading data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [id])

  useEffect(() => {
    if (!product) return

    // Initialize previews from product images
    if (product.images && product.images.length > 0) {
      const productPreviews = product.images.map((image) => ({
        id: image.id,
        url: image.url,
      }))

      setPreviews(productPreviews)

      // Update fileNames based on image URLs
      const newFileNames = Array(5).fill("No Selected File")
      productPreviews.forEach((preview, index) => {
        if (preview.url) {
          const fileName = preview.url.split("/").pop() || `image-${index}.jpg`
          newFileNames[index] = fileName
        }
      })
      setFileNames(newFileNames)
    }

    // Set form values
    setValue("name", product.name || "")
    setValue("description", product.description || "")
    setValue("categoryName", product.categoryName || "")
    setValue("price", product.price || 0)
    setValue("brand", product.productInfo?.brand || "")
    setValue("offerPercentage", product.offerPercentage || 0)
    setValue("status", product.status || "")
    setValue("stock", product.stock || 0)

    // Handle details
    if (product.productInfo?.details) {
      const parsedDetails =
        typeof product.productInfo.details === "string"
          ? JSON.parse(product.productInfo.details)
          : product.productInfo.details

      // Ensure details is an array
      if (Array.isArray(parsedDetails) && parsedDetails.length > 0) {
        setValue("details", parsedDetails)
      } else {
        setValue("details", [{ key: "", value: "" }])
      }
    }
  }, [product, setValue])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Reset the input value to allow selecting the same file again
    e.target.value = ""

    // Validate file before processing
    try {
      validateFile(file)
    } catch (error: any) {
      toast.error(error.message, { position: "top-center", theme: "dark" })
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviews((prev) => {
        const newPreviews = [...prev]
        newPreviews[index] = { id: null, url: reader.result as string }
        return newPreviews
      })

      setFileNames((prev) => {
        const newFileNames = [...prev]
        newFileNames[index] = file.name
        return newFileNames
      })

      setImages((prev) => {
        const newImages = [...prev]
        newImages[index] = file
        return newImages
      })
    }

    reader.readAsDataURL(file)
  }

  const validateFile = (file: File) => {
    const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif", "image/webp"]
    const maxSize = 5 * 1024 * 1024 // 5MB

    if (!validTypes.includes(file.type)) {
      throw new Error("Invalid file type. Only JPEG, PNG, JPG, GIF, and WEBP are allowed")
    }

    if (file.size > maxSize) {
      throw new Error("File size must not exceed 5MB")
    }

    return true
  }

  // Server-side background removal function
  const handleRemoveBackground = async () => {
    if (!originalImage || editingIndex === null) return

    setIsProcessing(true)
    try {
      // Get the current image file
      const file = images[editingIndex]
      if (!file && !previews[editingIndex]?.url) {
        toast.error("No image to process", {
          position: "top-center",
          theme: "dark",
        })
        setIsProcessing(false)
        return
      }

      // Create form data for API request
      const formData = new FormData()

      // If we have a file, use it, otherwise fetch the image from the URL
      if (file) {
        formData.append("image", file)
      } else if (previews[editingIndex]?.url) {
        // For existing images, we need to fetch them first
        const response = await fetch(previews[editingIndex].url)
        const blob = await response.blob()
        const imageFile = new File([blob], "image.jpg", { type: blob.type })
        formData.append("image", imageFile)
      }

      // Send to server API
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/remove-bg`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      // Check if response has processedImage
      if (response.data && response.data.processedImage) {
        // Set the processed image with base64 data
        setRemovedBgImage(`data:image/png;base64,${response.data.processedImage}`)
        toast.success("Background removed successfully", {
          position: "top-center",
          theme: "dark",
        })
      } else {
        throw new Error(response.data.error || "Failed to process image")
      }
    } catch (error: any) {
      console.error("Error removing background:", error)
      toast.error(error.message || "Failed to remove background", {
        position: "top-center",
        theme: "dark",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const saveEditedImage = async () => {
    if (editingIndex === null || !removedBgImage) return

    try {
      // Convert the edited image to a file
      const response = await fetch(removedBgImage)
      const blob = await response.blob()
      const file = new File([blob], `edited-${previews[editingIndex]?.url?.split("/").pop() || "image.png"}`, {
        type: "image/png",
      })

      // Update the image state
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviews((prev) => {
          const newPreviews = [...prev]
          newPreviews[editingIndex] = { id: null, url: reader.result as string }
          return newPreviews
        })

        setFileNames((prev) => {
          const newFileNames = [...prev]
          newFileNames[editingIndex] = file.name
          return newFileNames
        })

        setImages((prev) => {
          const newImages = [...prev]
          newImages[editingIndex] = file
          return newImages
        })
      }
      reader.readAsDataURL(file)

      // Reset editing state
      setEditingIndex(null)
      setRemovedBgImage(null)
      setOriginalImage(null)

      toast.success("Image updated successfully", {
        position: "top-center",
        theme: "dark",
      })
    } catch (error) {
      console.error("Error saving edited image:", error)
      toast.error("Failed to save edited image", {
        position: "top-center",
        theme: "dark",
      })
    }
  }

  const openImageEditor = (index: number) => {
    if (previews[index]?.url) {
      setEditingIndex(index)
      setOriginalImage(previews[index].url)
      setRemovedBgImage(null)
    }
  }

  const downloadEditedImage = async () => {
    if (!removedBgImage) return

    const link = document.createElement("a")
    link.href = removedBgImage
    link.download = `edited-${editingIndex !== null ? previews[editingIndex]?.url?.split("/").pop() || "image.png" : "image.png"}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const onSubmit = async (data: EditProductSchemaType) => {
    if (!product?.id) {
      toast.error("Product ID is missing", { position: "top-center", theme: "dark" })
      return
    }

    setIsEditting(true)
    const formData = new FormData()

    // Add all form data to formData
    Object.entries(data).forEach(([key, value]) => {
      if (key === "details" && Array.isArray(value)) {
        // Filter out empty details
        const filteredDetails = value.filter((detail) => detail.key.trim() !== "" && detail.value.trim() !== "")
        formData.append(key, JSON.stringify(filteredDetails))
      } else {
        formData.append(key, value.toString())
      }
    })

    // Add images to formData
    let imageCount = 0
    images.forEach((image) => {
      if (image) {
        formData.append("images", image)
        imageCount++
      }
    })

    // Count existing images that aren't being replaced
    const existingImageCount = previews.filter((preview) => preview.id !== null && preview.url).length

    // Check if we have at least 3 images total (existing + new)
    const totalImages = existingImageCount + imageCount
    if (totalImages < 3) {
      toast.error("At least 3 product images are required", { position: "top-center", theme: "dark" })
      setIsEditting(false)
      return
    }

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/seller/products/${product.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      )

      if (response.status === 200) {
        toast.success("Product updated successfully", {
          position: "top-center",
          theme: "dark",
        })

        // Navigate to product view page with updated product
        navigate(`/seller/dashboard/products/view-product/${product.id}`, {
          state: {
            product: response.data.product,
          },
        })
      }
    } catch (error: any) {
      console.error("Error updating product:", error)

      if (error.response?.data?.error) {
        toast.error(error.response.data.error, {
          position: "top-center",
          theme: "dark",
        })
      } else {
        toast.error("Failed to update product. Please try again.", {
          position: "top-center",
          theme: "dark",
        })
      }
    } finally {
      setIsEditting(false)
    }
  }

  const formatFileName = (fileName: string) => {
    if (fileName === "No Selected File") return fileName

    const maxLength = 10 // Limit the name length
    const extension = fileName.split(".").pop() // Get file extension
    const namePart = fileName.slice(0, maxLength) // Get the first characters of the file name

    return `${namePart}...${extension ? "." + extension : ""}`
  }

  // Function to remove the image at a specific index
  const removeImage = async (index: number, imageId: number | null) => {
    try {
      // Count how many images we have (excluding the one being removed)
      const currentImageCount = previews.filter((p, i) => p.url && i !== index).length

      if (currentImageCount < 3) {
        toast.warning("At least 3 product images are required", {
          position: "top-center",
          theme: "dark",
        })
        return
      }

      if (imageId) {
        // This is an existing image in the database
        const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/seller/products/image/${imageId}`)

        if (response.status === 200) {
          setPreviews((prev) => {
            const newPreviews = [...prev]
            newPreviews[index] = { id: null, url: "" }
            return newPreviews
          })

          setFileNames((prev) => {
            const newFileNames = [...prev]
            newFileNames[index] = "No Selected File"
            return newFileNames
          })

          toast.success("Image removed successfully", {
            position: "top-center",
            theme: "dark",
          })
        }
      } else {
        // This is a new image that hasn't been saved to the database yet
        setPreviews((prev) => {
          const newPreviews = [...prev]
          newPreviews[index] = { id: null, url: "" }
          return newPreviews
        })

        setImages((prev) => {
          const newImages = [...prev]
          newImages[index] = null
          return newImages
        })

        setFileNames((prev) => {
          const newFileNames = [...prev]
          newFileNames[index] = "No Selected File"
          return newFileNames
        })
      }
    } catch (error: any) {
      console.error("Error removing image:", error)

      if (error.response?.status === 400 && error.response?.data?.status === "ImageQuantityError") {
        toast.warning(error.response.data.error, {
          position: "top-center",
          theme: "dark",
        })
      } else {
        toast.error(error.response?.data?.error || "Failed to remove image", {
          position: "top-center",
          theme: "dark",
        })
      }
    }
  }

  // Prepare image slots for rendering
  const previewSlots = Array.from({ length: 5 }, (_, index) => previews[index] || { id: null, url: "" })

  // If loading, show skeleton
  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>Edit Product - ElectroHub</title>
          <meta name="description" content="Edit product details and images for your ElectroHub seller account." />
          <meta property="og:title" content="Edit Product - ElectroHub Seller Dashboard" />
          <meta
            property="og:description"
            content="Edit product details and images for your ElectroHub seller account."
          />
          <meta property="og:url" content={`${import.meta.env.VITE_APP_URL}/seller/edit-product/${id}`} />
          <meta property="og:type" content="website" />
        </Helmet>
        <EditProductSkeleton />
      </>
    )
  }

  return (
    <div className="space-y-2">
      <Helmet>
        <title>Edit Product - ElectroHub</title>
        <meta name="description" content="Edit product details and images for your ElectroHub seller account." />
        <meta property="og:title" content="Edit Product - ElectroHub Seller Dashboard" />
        <meta property="og:description" content="Edit product details and images for your ElectroHub seller account." />
        <meta property="og:url" content={`${import.meta.env.VITE_APP_URL}/seller/edit-product/${id}`} />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="mx-auto p-2 rounded-xl animate__animated animate__fadeIn">
        <Button
          variant="outline"
          className="text-sm bg-transparent border-none text-muted-foreground rounded-full hover:bg-accent shadow-none"
          onClick={() => navigate(-1)}
        >
          <MoveLeft className="mr-2" /> Back
        </Button>
        <h1 className="text-xl mt-4 bg-primary/30 text-primary pl-5 p-2 rounded-lg font-semibold mb-2">Edit Product</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-2">
          {/* Image Upload Section */}
          <div className="flex flex-wrap place-content-center gap-5 p-2">
            {previewSlots.map((preview, index) => (
              <div key={index} className="space-y-2 flex flex-col w-fit h-fit items-center">
                <p className="text-sm font-semibold text-center">
                  Upload Product Image
                  <li key={index} className="list-none">
                    {index === 0 ? "(Primary)" : ""}
                    {index === 1 ? "(Secondary)" : ""}
                    {index === 2 ? "(Tertiary)" : ""}
                    {index >= 3 ? "(Optional)" : ""}
                  </li>
                </p>

                <div className="relative w-[21rem] h-64 md:h-48 md:w-48 lg:w-52 lg:h-52 sm:h-64 sm:w-64 p-2 rounded-lg">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, index)}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    required={false}
                    title=""
                  />
                  {preview.url ? (
                    <div className="relative w-full h-full">
                      <img
                        src={preview.url || "/placeholder.svg"}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full rounded-md object-cover"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute top-2 right-2 z-30 bg-background/80 backdrop-blur-sm hover:bg-background/90"
                        onClick={(e) => {
                          e.preventDefault()
                          openImageEditor(index)
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col justify-center shadow-sm border-dashed border-2 rounded-md border-gray-400 items-center w-full h-full">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-24">
                        <path
                          d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15"
                          className="stroke-current"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p className="text-center text-sm">Browse File to upload!</p>
                    </div>
                  )}
                </div>
                <div className="p-1 px-2 w-full flex shadow-sm items-center justify-between rounded-md">
                  <div className="rounded-full p-1">
                    <CloudUpload />
                  </div>
                  <span className="text-sm">
                    {fileNames[index]
                      ? formatFileName(fileNames[index])
                      : preview.url
                        ? preview.url.split("/").pop()?.substring(0, 18) || "Image"
                        : "No Selected File"}
                  </span>

                  <div
                    className="rounded-lg cursor-pointer bg-red-100 text-red-600 p-1"
                    onClick={() => removeImage(index, preview.id)}
                  >
                    <Trash2 />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Basic Product Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 gap-x-8">
            <div className="space-y-1">
              <Label htmlFor="name" className="text-md font-medium">
                Product Name
              </Label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => <Textarea {...field} id="name" className="text-start" placeholder="Type here" />}
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
                render={({ field }) => (
                  <Textarea {...field} id="description" className="align-text-top" placeholder="Type here" />
                )}
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
                  <Select onValueChange={field.onChange} value={field.value || product?.categoryName || ""}>
                    <SelectTrigger className="py-5">
                      <SelectValue placeholder="Select category">
                        {field.value || product?.categoryName || "Select category"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.name} value={category.name}>
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
                  <Select onValueChange={field.onChange} value={field.value || product?.status || ""}>
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
              {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
            </div>
            <div className="grid grid-cols-1 gap-3 gap-x-8">
              <div className="space-y-1">
                <Label htmlFor="brand" className="text-md font-medium">
                  Brand
                </Label>
                <Controller
                  name="brand"
                  control={control}
                  render={({ field }) => <Input {...field} id="brand" className="py-5" placeholder="e.g. MSI" />}
                />
                {errors.brand && <p className="text-red-500 text-sm">{errors.brand.message}</p>}
              </div>
            </div>
          </div>

          {/* Product Specifications */}
          <Separator />
          <h2 className="text-xl font-semibold mb-4 bg-primary/30 text-primary border-border pl-4 p-2 rounded-lg">
            Additional Product Details
          </h2>
          <div className="space-y-4">
            <Label className="text-sm font-medium">Custom Attributes</Label>
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center space-x-2">
                <Input {...register(`details.${index}.key`)} placeholder="Key" className="flex-1 py-5" />
                <Input {...register(`details.${index}.value`)} placeholder="Value" className="flex-1 py-5" />
                <Button type="button" variant="outline" size="icon" onClick={() => remove(index)}>
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
              className="bg-accent hover:bg-primary/5 font-semibold text-lg rounded-lg md:px-32 py-6 shadow-lg text-accent-foreground"
              disabled={isEditting}
            >
              {!isEditting ? "Update Product" : "Updating..."}
            </Button>
          </div>

          {/* Image Editor Dialog */}
          <Dialog open={editingIndex !== null} onOpenChange={(open) => !open && setEditingIndex(null)}>
            <DialogContent className="max-w-4xl w-[90vw]">
              <DialogHeader>
                <DialogTitle>Edit Image</DialogTitle>
              </DialogHeader>

              <Tabs defaultValue="original" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="original">Original</TabsTrigger>
                  <TabsTrigger value="edited" disabled={!removedBgImage}>
                    Edited
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="original" className="flex flex-col items-center">
                  {originalImage && (
                    <div className="relative max-h-[60vh] overflow-auto p-2">
                      <img
                        src={originalImage || "/placeholder.svg"}
                        alt="Original"
                        className="w-96 h-auto object-contain rounded-md"
                      />
                    </div>
                  )}

                  <div className="flex justify-center gap-4 mt-4">
                    <Button
                      variant="outline"
                      onClick={() => {
                        if (editingIndex !== null) {
                          const input = document.createElement("input")
                          input.type = "file"
                          input.accept = "image/*"
                          input.onchange = (e) => handleImageChange(e as any, editingIndex)
                          input.click()
                        }
                      }}
                    >
                      Change Image
                    </Button>
                    <Button onClick={handleRemoveBackground} disabled={isProcessing} className="gap-2">
                      {isProcessing ? "Processing..." : "Remove Background"}
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="edited" className="flex flex-col items-center">
                  {removedBgImage && (
                    <div className="relative max-h-[60vh] overflow-auto p-2" style={{ backgroundColor: bgColor }}>
                      <img
                        src={removedBgImage || "/placeholder.svg"}
                        alt="Edited"
                        className="max-w-full h-auto object-contain rounded-md"
                      />
                    </div>
                  )}

                  <div className="w-full mt-4">
                    <Label htmlFor="bg-color" className="text-sm font-medium">
                      Background Color
                    </Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {bgColors.map((color) => (
                        <button
                          key={color}
                          type="button"
                          className={`w-8 h-8 rounded-full border-2 ${bgColor === color ? "border-primary" : "border-transparent"}`}
                          style={{ backgroundColor: color }}
                          onClick={() => setBgColor(color)}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-center gap-4 mt-4">
                    <Button variant="outline" onClick={downloadEditedImage} className="gap-2">
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                    <Button onClick={saveEditedImage} className="gap-2">
                      <Check className="h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        </form>
      </div>
    </div>
  )
}
