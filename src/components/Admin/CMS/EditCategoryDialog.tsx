"use client"

import type React from "react"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useEffect, useState } from "react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Edit, ImagePlus, Loader2, Upload } from 'lucide-react'
import axios from "@/lib/axios"
import { toast } from "react-toastify"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Category {
  name: string
  imageUrl: string
}

// Schema for validating the form (Only image is allowed)
const categorySchema = z.object({
  image: z.instanceof(File, { message: "Image is required" }),
})

type CategorySchemaType = z.infer<typeof categorySchema>

export default function EditCategoryDialog({
  categoryName,
  setCategories,
  imageUrl,
}: {
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>
  categoryName: string
  imageUrl: string
}) {
  const [open, setOpen] = useState(false)
  const [preview, setPreview] = useState<string | null>(imageUrl)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<CategorySchemaType>({
    resolver: zodResolver(categorySchema),
  })

  useEffect(() => {
    if (open) {
      setPreview(imageUrl)
      form.reset()
    }
  }, [open, imageUrl, form])

  const handleImageChange = (file: File | null) => {
    if (file) {
      setPreview(URL.createObjectURL(file))
    } else {
      setPreview(imageUrl)
    }
  }

  const handleClose = () => {
    form.reset()
    setPreview(imageUrl)
    setOpen(false)
  }

  const onSubmit = async (data: CategorySchemaType) => {
    setIsSubmitting(true)
    try {
      const formData = new FormData()
      formData.append("image", data.image)

      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/admin/cms/categories/${categoryName}`,
        formData,
      )

      if (response.status === 200) {
        setCategories((prev) => prev.map((c) => (c.name === categoryName ? response.data?.category : c)))

        toast.success(`Category image updated successfully`, {
          position: "top-center",
          theme: "dark",
        })
        handleClose()
      }
    } catch (error: any) {
      console.error("Failed to update category image:", error)
      toast.error(error.message || "Failed to update category image", {
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
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1.5 text-primary hover:text-primary hover:bg-primary/10 rounded-lg border-primary/20"
        >
          <Edit className="h-4 w-4" />
          <span className="hidden sm:inline">Edit</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Update Category Image</DialogTitle>
          <DialogDescription className="flex items-center gap-2">
            Change the image for category 
            <Badge variant="outline" className="font-semibold text-xs px-2 py-0.5">
              {categoryName}
            </Badge>
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 py-2">
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Current Image</h3>
              <Card className="relative h-48 w-full overflow-hidden rounded-md border-2 border-dashed border-muted-foreground/25 bg-muted/10 flex items-center justify-center p-2">
                {preview ? (
                  <img
                    src={preview || "/placeholder.svg"}
                    alt="Category Preview"
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-muted-foreground gap-2">
                    <ImagePlus className="h-10 w-10" />
                    <span>No image available</span>
                  </div>
                )}
              </Card>
            </div>

            <FormField
              control={form.control}
              name="image"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">Upload New Image</FormLabel>
                  <FormControl>
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
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="gap-2 sm:gap-0 pt-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleClose} 
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
                  "Save Image"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
