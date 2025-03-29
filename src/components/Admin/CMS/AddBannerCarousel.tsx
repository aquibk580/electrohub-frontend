import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "@/lib/axios";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus } from "lucide-react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import { BannerCrousel } from "@/pages/Admin/ContentManagement";

const bannerCarouselSchema = z.object({
  title: z.string().min(1, "Banner title is required"),
  image: z.any().refine((file) => file instanceof File, "Image is required"),
  href: z.string().min(1, "Link URL is required"),
  status: z.boolean().optional().default(true),
});

type BannerCarouselSchemaType = z.infer<typeof bannerCarouselSchema>;

export default function AddBannerCarousel({
  setBannerCarousels,
}: {
  setBannerCarousels: React.Dispatch<React.SetStateAction<BannerCrousel[]>>;
}) {
  const [open, setOpen] = useState(false);
  const methods = useForm({
    resolver: zodResolver(bannerCarouselSchema),
    defaultValues: {
      status: true,
    },
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = methods;

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");

  useEffect(() => {
    if (!open) {
      methods.reset();
      setPreviewImage(null);
      setFileName("");
    }
  }, [open]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setFileName(file.name);
      methods.setValue("image", file); // Set image manually
      methods.clearErrors("image"); // Clear previous errors
    }
  };

  const onSubmit = async (data: BannerCarouselSchemaType) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("image", data.image);
      formData.append("href", data.href);
      formData.append("isActive", String(data.status));

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/admin/cms/banner-carousels`,
        formData
      );

      if (response.status === 201) {
        setBannerCarousels((prev) => [
          ...prev,
          {
            id: response.data?.bannerCarousel?.id,
            title: response.data?.bannerCarousel?.title,
            href: response.data?.bannerCarousel?.href,
            imageUrl: response.data?.bannerCarousel?.imageUrl,
            isActive: response.data?.bannerCarousel?.isActive,
          },
        ]);
        toast.success(
          `Banner Carousel ${response.data?.bannerCarousel?.title} Added Successfully`,
          {
            position: "top-center",
            theme: "dark",
          }
        );
      }
    } catch (error: any) {
      console.error("Failed to add category:", error);
      toast.error(error.message, {
        position: "top-center",
        theme: "dark",
      });
    } finally {
      reset();
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="text-accent-foreground border border-primary bg-primary/40 hover:text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Banner
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Banner</DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
            encType="multipart/form-data"
          >
            <div className="grid w-full items-center gap-1.5">
              <Label>Title</Label>
              <Input
                {...methods.register("title")}
                placeholder="Enter banner title"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">
                  {String(errors.title.message)}
                </p>
              )}
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label>Image</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    handleImageChange(e);
                  }}
                  className="hidden"
                  id="fileInput"
                />
                <label
                  htmlFor="fileInput"
                  className="cursor-pointer px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md"
                >
                  Choose File
                </label>
                <span className="text-gray-600 dark:text-gray-300">
                  {fileName || "No file chosen"}
                </span>
                {errors.image && (
                  <p className="text-red-500 text-sm">
                    {String(errors.image.message)}
                  </p>
                )}
              </div>

              {/* Image Preview */}
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Selected Preview"
                  className="mt-2 w-32 h-32 object-cover rounded-lg shadow"
                />
              )}
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label>Link URL</Label>
              <Input
                {...methods.register("href")}
                placeholder="Enter Link URL"
              />
              {errors.href && (
                <p className="text-red-500 text-sm">
                  {String(errors.href.message)}
                </p>
              )}
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label>Status</Label>
              <FormField
                control={methods.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Enable Banner</FormLabel>
                      <FormDescription>
                        Toggle to enable or disable the banner.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Banner"}
            </Button>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
