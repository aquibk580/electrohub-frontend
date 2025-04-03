"use client"

import type React from "react"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import axios from "@/lib/axios"
import { toast } from "react-toastify"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { DollarSign, ExternalLink, Loader2, Plus, Upload } from 'lucide-react'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useEffect, useState } from "react"
import { ProductCrousel } from "@/pages/Admin/ContentManagement"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const productCarouselSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  image: z.instanceof(File, { message: "Image is required" }),
  href: z.string().min(1, "Link URL is required"),
  price: z
    .string()
    .min(1, "Price is required")
    .regex(/^\d+(\.\d{1,2})?$/, "Price must be a valid number")
    .transform((val) => Number(val)),
  status: z.boolean().default(true),
})

type ProductCarouselSchemaType = z.infer<typeof productCarouselSchema>

export default function AddProductCarousel({
  setProductCarousels,
}: {
  setProductCarousels: React.Dispatch<React.SetStateAction<ProductCarousel[]>>
}) {
  const [open, setOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<ProductCarouselSchemaType>({
    resolver: zodResolver(productCarouselSchema),
    defaultValues: {
      status: true,
    },
  })

  useEffect(() => {
    if (!open) {
      form.reset({
        name: "",
        href: "",
        price: undefined,
        status: true,
      })
      setPreviewImage(null)
    }
  }, [open, form])

  const handleImageChange = (file: File | null) => {
    if (file) {
      setPreviewImage(URL.createObjectURL(file))
    } else {
      setPreviewImage(null)
    }
  }

  const onSubmit = async (data: ProductCarouselSchemaType) => {
    setIsSubmitting(true)
    try {
      const formData = new FormData()
      formData.append("name", data.name)
      formData.append("image", data.image)
      formData.append("href", data.href)
      formData.append("price", String(data.price))
      formData.append("isActive", String(data.status))

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/cms/product-carousels`, formData)

      if (response.status === 201) {
        setProductCarousels((prev) => [
          ...prev,
          {
            id: response.data?.productCarousel?.id,
            name: response.data?.productCarousel?.name,
            price: response.data?.productCarousel?.price,
            href: response.data?.productCarousel?.href,
            imageUrl: response.data?.productCarousel?.imageUrl,
            isActive: response.data?.productCarousel?.isActive,
          },
        ])
        toast.success(`Product "${response.data?.productCarousel?.name}" added successfully`, {
          position: "top-center",
          theme: "dark",
        })
        setOpen(false)
      }
    } catch (error: any) {
      console.error("Failed to add product:", error)
      toast.error(error.message || "Failed to add product", {
        position: "top-center",
        theme: "dark",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="flex items-center gap-2 rounded-lg">
          <Plus className="h-4 w-4" />
          <span>Add Product</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Add New Product</DialogTitle>
          <DialogDescription>Create a new product for the carousel slider</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 py-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">Product Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter product name" 
                        {...field} 
                        className="h-10 focus-visible:ring-offset-1"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium flex items-center gap-1.5">
                      <DollarSign className="h-4 w-4" />
                      Price
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter price" 
                        {...field} 
                        className="h-10 focus-visible:ring-offset-1"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="href"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium flex items-center gap-1.5">
                    <ExternalLink className="h-4 w-4" />
                    Link URL
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter product URL" 
                      {...field} 
                      className="h-10 focus-visible:ring-offset-1"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            <FormField
              control={form.control}
              name="image"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">Product Image</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      {previewImage ? (
                        <Card className="relative h-48 w-full overflow-hidden rounded-md border-2 border-dashed border-muted-foreground/25 bg-muted/10 flex items-center justify-center p-2">
                          <img
                            src={previewImage || "/placeholder.svg"}
                            alt="Product Preview"
                            className="h-full w-full object-contain"
                          />
                        </Card>
                      ) : (
                        <Card className="relative h-48 w-full overflow-hidden rounded-md border-2 border-dashed border-muted-foreground/25 bg-muted/10 flex flex-col items-center justify-center p-2 gap-2">
                          <Upload className="h-10 w-10 text-muted-foreground/70" />
                          <p className="text-sm text-muted-foreground">Upload product image</p>
                        </Card>
                      )}
                      <div className="relative">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0] || null
                            onChange(file)
                            handleImageChange(file)
                          }}
                          {...fieldProps}
                          className={cn(
                            "cursor-pointer file:cursor-pointer file:rounded file:border-0 file:bg-primary file:px-2 file:py-1 file:text-primary-foreground file:font-medium hover:file:bg-primary/90",
                            !value && "text-muted-foreground"
                          )}
                        />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Active Status</FormLabel>
                    <FormDescription>Enable or disable this product in the carousel</FormDescription>
                  </div>
                  <FormControl>
                    <Switch 
                      checked={field.value} 
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-green-600"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter className="gap-2 sm:gap-0 pt-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setOpen(false)} 
                disabled={isSubmitting}
                className="rounded-lg"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="rounded-lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Product"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
