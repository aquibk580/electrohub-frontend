import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit } from "lucide-react";
import axios from "@/lib/axios";
import { toast } from "react-toastify";
import { Switch } from "@/components/ui/switch";
import { SelectValue } from "@/components/ui/select";

interface BannerCarousel {
  id: number;
  title: string;
  imageUrl: string;
  href: string;
  isActive: boolean;
}

const bannerCarouselSchema = z.object({
  title: z.string().optional(),
  href: z.string().optional(),
  image: z.any().optional(),
  isActive: z.boolean().optional(),
});

type BannerCarouselSchemaType = z.infer<typeof bannerCarouselSchema>;

export default function EditBannerCarouselDialog({
  bannerCarousel,
  setBannerCarousels,
}: {
  setBannerCarousels: React.Dispatch<React.SetStateAction<BannerCarousel[]>>;
  bannerCarousel: BannerCarousel;
}) {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(
    bannerCarousel.imageUrl
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<BannerCarouselSchemaType>({
    resolver: zodResolver(bannerCarouselSchema),
    defaultValues: {
      title: bannerCarousel.title,
      href: bannerCarousel.href,
      isActive: bannerCarousel.isActive,
    },
  });

  const imageFile = watch("image");
  const isActive = watch("isActive");

  useEffect(() => {
    if (imageFile && imageFile.length > 0) {
      const file = imageFile[0];
      setPreview(URL.createObjectURL(file));
    }
  }, [imageFile]);

  useEffect(() => {
    if (open) {
      setPreview(bannerCarousel.imageUrl);
    }
  }, [open, bannerCarousel.imageUrl]);

  const handleClose = () => {
    reset();
    setPreview(bannerCarousel.imageUrl);
    setOpen(false);
  };

  const onSubmit = async (data: BannerCarouselSchemaType) => {
    try {
      const formData = new FormData();
      if (data.image?.length) {
        formData.append("image", data.image[0]);
      }
      if (data.title) {
        formData.append("title", data.title);
      }
      if (data.href) {
        formData.append("href", data.href);
      }

      formData.append("isActive", String(data.isActive));

      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/admin/cms/banner-carousels/${
          bannerCarousel.id
        }`,
        formData
      );

      if (response.status === 200) {
        setBannerCarousels((prev) =>
          prev.map((b) =>
            b.id === bannerCarousel.id ? response.data.bannerCarousel : b
          )
        );

        toast.success("Banner Carousel updated successfully", {
          position: "top-center",
          theme: "dark",
        });
      }
    } catch (error: any) {
      console.error("Failed to update banner carousel:", error);
      toast.error(error.message, {
        position: "top-center",
        theme: "dark",
      });
    } finally {
      handleClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-50  dark:border-none dark:bg-blue-300 text-blue-700 border border-blue-400 flex items-center space-x-2 p-1.5 px-2.5 shadow-none rounded-lg focus-visible:right-0 hover:bg-blue-100">
          <Edit className="w-5" />
          <span className="text-sm font-medium"> Edit</span>
        </Button>
      </DialogTrigger>
      <DialogContent onCloseAutoFocus={handleClose}>
        <DialogHeader>
          <DialogTitle>Edit Banner Carousel</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          encType="multipart/form-data"
        >
          <div className="grid w-full items-center gap-1.5">
            <Label>Title</Label>
            <Input type="text" {...register("title")} />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label>Href</Label>
            <Input type="text" {...register("href")} />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label>Current Image</Label>
            {preview && (
              <img
                src={preview}
                alt="Banner Preview"
                className="w-24 h-24 object-cover rounded-lg mb-2"
              />
            )}
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label>Upload New Image</Label>
            <Input type="file" accept="image/*" {...register("image")} />
            {errors.image && (
              <p className="text-red-500 text-sm">
                {String(errors.image.message)}
              </p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Label>Status</Label>
            <Switch
              checked={isActive}
              onCheckedChange={(checked) => setValue("isActive", checked)}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
