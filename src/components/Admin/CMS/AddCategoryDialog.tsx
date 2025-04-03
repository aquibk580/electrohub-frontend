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
import { Loader2, Plus, Upload } from 'lucide-react'
import axios from "@/lib/axios"
import { toast } from "react-toastify"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"

interface Category {
  name: string
  imageUrl: string
}

// Define schema using Zod for validation
const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  image: z.instanceof(File, { message: "Image is required" }),
})

type CategorySchemaType = z.infer<typeof categorySchema>

export default function AddCategoryDialog({
  setCategories,
}: {
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>
}) {
  const [open, setOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<CategorySchemaType>({
    resolver: zodResolver(categorySchema),
  })

  useEffect(() => {
    if (!open) {
      form.reset()
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

  const onSubmit = async (data: CategorySchemaType) => {
    setIsSubmitting(true)
    try {
      const formData = new FormData()
      formData.append("name", data.name)
      formData.append("image", data.image)

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/cms/categories`, formData)

      if (response.status === 201) {
        toast.success(`Category "${response.data?.category.name}" added successfully`, {
          position: "top-center",
          theme: "dark",
        })
        setCategories((prev) => [
          ...prev,
          {
            name: response.data?.category.name,
            imageUrl: response.data.category.imageUrl,
          },
        ])
        setOpen(false)
      }
    } catch (error: any) {
      console.error("Failed to add category:", error)
      toast.error(error.message || "Failed to add category", {
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
          <span>Add Category</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Add New Category</DialogTitle>
          <DialogDescription>Create a new category with name and image</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 py-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">Category Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter category name" 
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
              name="image"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">Category Image</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      {previewImage ? (
                        <Card className="relative h-48 w-full overflow-hidden rounded-md border-2 border-dashed border-muted-foreground/25 bg-muted/10 flex items-center justify-center p-2">
                          <img
                            src={previewImage || "/placeholder.svg"}
                            alt="Category Preview"
                            className="h-full w-full object-contain"
                          />
                        </Card>
                      ) : (
                        <Card className="relative h-48 w-full overflow-hidden rounded-md border-2 border-dashed border-muted-foreground/25 bg-muted/10 flex flex-col items-center justify-center p-2 gap-2">
                          <Upload className="h-10 w-10 text-muted-foreground/70" />
                          <p className="text-sm text-muted-foreground">Upload category image</p>
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
                  "Save Category"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
