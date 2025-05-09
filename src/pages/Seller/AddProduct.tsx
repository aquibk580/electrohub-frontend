import { useEffect, useState, useRef, Suspense } from "react"
import type React from "react"
import { useForm, useFieldArray, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CloudUpload, Plus, Trash2, X, Edit, Check, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import axios from "../../lib/axios"
import { Label } from "@/components/ui/label"
import { AddProductSchema, type AddProductSchematype } from "@/components/Seller/FormSchema"
import { Separator } from "@/components/ui/separator"
import { useSelector } from "react-redux"
import type { RootState } from "@/redux/store"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AddProductSkeleton } from "@/components/Seller/Skeletons"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Helmet } from "react-helmet-async"

interface Category {
  name: string
}

export default function AddProductForm(){
  return (
    <Suspense fallback={<AddProductSkeleton />}>
      <Helmet>
        <title>Add Product</title>
        <meta name="description" content="Add a new product to your store" />
        <link rel="canonical" href={`${import.meta.env.VITE_APP_URL}/seller/add-product`} />
        <meta property="og:title" content="Add Product" />
        <meta property="og:description" content="Add a new product to your store" />
        <meta name="og:url" property="og:url" content={`${import.meta.env.VITE_APP_URL}/seller/add-product`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/logo.png" />
      </Helmet>
      <MainAddProductForm />
    </Suspense>
  )
}



function MainAddProductForm() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const navigate = useNavigate()
  const [categories, setCategories] = useState<Category[]>([])
  const seller = useSelector((state: RootState) => state.seller.seller)
  const [images, setImages] = useState<(File | null)[]>([null, null, null, null, null])
  const [previews, setPreviews] = useState<string[]>(["", "", "", "", ""])
  const [fileNames, setFileNames] = useState<string[]>(Array(5).fill("No Selected File"))
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [bgColor, setBgColor] = useState<string>("#ffffff")
  const [removedBgImage, setRemovedBgImage] = useState<string | null>(null)
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>(Array(5).fill(null))
  const bgColors = ["#ffffff", "#f0f0f0", "#000000", "#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"]

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<AddProductSchematype>({
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

  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>,
    index: number,
  ) => {
    let file: File | null = null

    if ("dataTransfer" in e) {
      e.preventDefault()
      const items = e.dataTransfer.items

      for (const item of items) {
        if (item.kind === "file") {
          file = item.getAsFile()
        } else if (item.kind === "string") {
          // Handle image dragged from a website (URL)
          item.getAsString(async (url) => {
            if (url.startsWith("http")) {
              try {
                const downloadedFile = await urlToFile(url)
                updateImageState(downloadedFile, index)
              } catch (error) {
                console.error("Failed to download image:", error)
              }
            }
          })
          return // Exit early as URL fetching is async
        }
      }
    } else {
      file = e.target.files?.[0] || null
    }

    if (file) {
      updateImageState(file, index)
    }
  }

  const urlToFile = async (imageUrl: string) => {
    const response = await fetch(imageUrl)
    const blob = await response.blob()
    return new File([blob], "dropped-image.jpg", { type: blob.type })
  }

  const updateImageState = (file: File | null, index: number) => {
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviews((prevPreviews) => {
        const newPreviews = [...prevPreviews]
        newPreviews[index] = reader.result as string
        return newPreviews
      })

      setFileNames((prevFileNames) => {
        const newFileNames = [...prevFileNames]
        newFileNames[index] = file.name
        return newFileNames
      })

      setImages((prevImages) => {
        const newImages = [...prevImages]
        newImages[index] = file
        return newImages
      })
    }
    reader.readAsDataURL(file)
  }

  // Server-side background removal function
  const handleRemoveBackground = async () => {
    if (!originalImage || editingIndex === null) return
  
    setIsProcessing(true)
    try {
      // Get the current image file
      const file = images[editingIndex]
      if (!file) {
        toast.error("No image to process", {
          position: "top-center",
          theme: "dark",
        })
        setIsProcessing(false)
        return
      }
  
      // Create form data for API request
      const formData = new FormData()
      formData.append("image", file)
  
      // Send to server API
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/remove-bg`, 
        formData, 
        {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        }
      )
  
      // Check if response has processedImage (matches your server response)
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
      const file = new File([blob], `edited-${fileNames[editingIndex]}`, { type: "image/png" })

      // Update the image state
      updateImageState(file, editingIndex)

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
    if (previews[index]) {
      setEditingIndex(index)
      setOriginalImage(previews[index])
      setRemovedBgImage(null)
    }
  }

  const downloadEditedImage = async () => {
    if (!removedBgImage) return

    const link = document.createElement("a")
    link.href = removedBgImage
    link.download = `edited-${editingIndex !== null ? fileNames[editingIndex] : "image"}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

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
    const newImages = [...images]
    const newFileNames = [...fileNames]
    const newPreviews = [...previews]

    // Reset the specific index to initial values
    newImages[index] = null
    newFileNames[index] = "No Selected File"
    newPreviews[index] = "" // Clear the preview

    setImages(newImages)
    setFileNames(newFileNames)
    setPreviews(newPreviews)
  }

  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/categories/all`)
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
    <div className="mx-auto p-2 animate__animated animate__fadeIn">
      <Helmet>
        <title>Add Product</title>
        <meta name="description" content="Add a new product to your store" />
        <link rel="canonical" href={`${import.meta.env.VITE_APP_URL}/seller/add-product`} />
        <meta property="og:title" content="Add Product" />
        <meta property="og:description" content="Add a new product to your store" />
        <meta name="og:url" property="og:url" content={`${import.meta.env.VITE_APP_URL}/seller/add-product`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/logo.png" />
      </Helmet>

      <h1 className="text-xl text-primary bg-primary/30 pl-5 p-2 rounded-lg font-semibold mb-2">Add Product</h1>

      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-4 p-2">
        {/* Image Upload Section */}
        <div className="flex flex-wrap place-content-center gap-5 p-2">
          {previews.map((preview, index) => (
            <div key={index} className="space-y-2 flex flex-col w-fit h-fit items-center">
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
                  required={index < 3 && !previews[index]} // Only require if there's no preview
                  title=""
                  ref={(el) => (fileInputRefs.current[index] = el)}
                />
                {previews[index] ? (
                  <div className="relative w-full h-full">
                    <img
                      src={previews[index] || "/placeholder.svg"}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full rounded-md object-cover"
                    />
                    <Button
                      variant="secondary"
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

              <div className="p-1 px-2 w-full flex shadow-sm items-center justify-between rounded-md bg-card">
                <div className="rounded-full bg-muted p-1">
                  <CloudUpload className="h-4 w-4" />
                </div>
                <span className="text-sm">
                  {fileNames[index] ? formatFileName(fileNames[index]) : "No Selected File"}
                </span>

                <div
                  className="rounded-lg cursor-pointer bg-destructive/10 text-destructive p-1"
                  onClick={() => removeImage(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </div>
              </div>
            </div>
          ))}
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
                        fileInputRefs.current[editingIndex]?.click()
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

        {/* Basic Product Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 gap-x-8">
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
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-1">
              <Label htmlFor="brand" className="text-sm font-medium">
                Brand
              </Label>
              <Controller
                name="brand"
                control={control}
                render={({ field }) => <Input {...field} id="brand" className="py-5" placeholder="e.g. MSI" />}
              />
              {errors.brand && <p className="text-sm text-destructive">{errors.brand.message}</p>}
            </div>
          </div>
        </div>

        {/* Product Specifications */}
        <Separator />
        <h2 className="text-xl font-semibold mb-4 bg-primary/30 text-primary pl-4 p-2 rounded-lg">
          Additional Product Details
        </h2>
        <div className="space-y-4">
          <Label className="text-sm font-medium">Custom Attributes</Label>
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-2">
              <Input {...register(`details.${index}.key`)} placeholder="Key" className="flex-1 py-5" />
              <Input {...register(`details.${index}.value`)} placeholder="Value" className="flex-1 py-5" />
              <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}>
                <X className="h-5 w-5" strokeWidth={4} />
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
            className="bg-primary font-semibold text-lg rounded-lg md:px-32 py-6 hover:bg-primary/90 shadow-lg"
            disabled={isSubmitting}
          >
            {!isSubmitting ? "Add Product" : "Adding..."}
          </Button>
        </div>
      </form>
    </div>
  )
}

