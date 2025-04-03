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
import { Edit, ImagePlus, Loader2 } from "lucide-react"
import axios from "@/lib/axios"
import { toast } from "react-toastify"
import { Switch } from "@/components/ui/switch"
import  { BannerCrousel } from "@/pages/Admin/ContentManagement"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { cn } from "@/lib/utils"

const bannerCarouselSchema = z.object({
  title: z.string().optional(),
  href: z.string().optional(),
  image: z.custom<FileList>().optional(),
  isActive: z.boolean().optional(),
})

type BannerCarouselSchemaType = z.infer<typeof bannerCarouselSchema>

export default function EditBannerCarouselDialog({
  bannerCarousel,
  setBannerCarousels,
}: {
  setBannerCarousels: React.Dispatch<React.SetStateAction<BannerCrousel[]>>
  bannerCarousel: BannerCrousel
}) {
  const [open, setOpen] = useState(false)
  const [preview, setPreview] = useState<string | null>(bannerCarousel.imageUrl)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<BannerCarouselSchemaType>({
    resolver: zodResolver(bannerCarouselSchema),
    defaultValues: {
      title: bannerCarousel.title,
      href: bannerCarousel.href,
      isActive: bannerCarousel.isActive,
    },
  })

  const imageFile = form.watch("image")
  const isActive = form.watch("isActive")

  useEffect(() => {
    if (imageFile && imageFile.length > 0) {
      const file = imageFile[0]
      setPreview(URL.createObjectURL(file))
    }
  }, [imageFile])

  useEffect(() => {
    if (open) {
      setPreview(bannerCarousel.imageUrl)
      form.reset({
        title: bannerCarousel.title,
        href: bannerCarousel.href,
        isActive: bannerCarousel.isActive,
      })
    }
  }, [open, bannerCarousel, form])

  const handleClose = () => {
    form.reset()
    setPreview(bannerCarousel.imageUrl)
    setOpen(false)
  }

  const onSubmit = async (data: BannerCarouselSchemaType) => {
    setIsSubmitting(true)
    try {
      const formData = new FormData()
      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0])
      }
      if (data.title) {
        formData.append("title", data.title)
      }
      if (data.href) {
        formData.append("href", data.href)
      }
      formData.append("isActive", String(data.isActive))

      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/admin/cms/banner-carousels/${bannerCarousel.id}`,
        formData,
      )

      if (response.status === 200) {
        setBannerCarousels((prev) => prev.map((b) => (b.id === bannerCarousel.id ? response.data.bannerCarousel : b)))

        toast.success("Banner updated successfully", {
          position: "top-center",
          theme: "dark",
        })
        handleClose()
      }
    } catch (error: any) {
      console.error("Failed to update banner:", error)
      toast.error(error.message || "Failed to update banner", {
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
          className="flex items-center gap-1 text-primary hover:text-primary hover:bg-primary/10"
        >
          <Edit className="h-4 w-4" />
          <span className="hidden sm:inline">Edit</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Banner</DialogTitle>
          <DialogDescription>Update the banner details for the carousel slider</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter banner title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="href"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter link URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Current Image</h3>
              <div className="relative h-40 w-full overflow-hidden rounded-md border bg-muted/30 flex items-center justify-center">
                {preview ? (
                  <img
                    src={preview || "/placeholder.svg"}
                    alt="Banner Preview"
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <ImagePlus className="h-10 w-10 mb-2" />
                    <span>No image available</span>
                  </div>
                )}
              </div>
            </div>

            <FormField
              control={form.control}
              name="image"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>Upload New Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        onChange(e.target.files)
                      }}
                      {...fieldProps}
                      className={cn("cursor-pointer file:cursor-pointer", !value && "text-muted-foreground")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Active Status</FormLabel>
                    <FormDescription>Enable or disable this banner in the carousel</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter className="gap-2 sm:gap-0 mt-6">
              <Button type="button" variant="outline" onClick={handleClose} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

