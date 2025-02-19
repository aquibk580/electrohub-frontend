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
import { ProductCrousel } from "@/pages/Admin/ContentManagement";

const productCarouselSchema = z.object({
  name: z.string().min(1, "Banner name is required").optional(),
  image: z.custom<FileList>().optional(),

  href: z.string().min(1, "Link URL is required").optional(),
  price: z
    .string()
    .min(1, "Price is required")
    .regex(/^\d+(\.\d{1,2})?$/, "Price must be a valid number")
    .transform((val) => Number(val))
    .optional(),

  isActive: z.boolean().optional().default(true),
});
type ProductCarouselSchemaType = z.infer<typeof productCarouselSchema>;

export default function EditProductCarouselButton({
  productCarousel,
  setProductCarousels,
}: {
  setProductCarousels: React.Dispatch<React.SetStateAction<ProductCrousel[]>>;
  productCarousel: ProductCrousel;
}) {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(
    productCarousel.imageUrl
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<ProductCarouselSchemaType>({
    resolver: zodResolver(productCarouselSchema),
    defaultValues: {
      name: productCarousel.name,
      href: productCarousel.href,
      price: productCarousel.price,
      isActive: productCarousel.isActive,
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
      setPreview(productCarousel.imageUrl);
    }
  }, [open, productCarousel.imageUrl]);

  const handleClose = () => {
    reset();
    setPreview(productCarousel.imageUrl);
    setOpen(false);
  };

  const onSubmit = async (data: ProductCarouselSchemaType) => {
    try {
      const formData = new FormData();
      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0]);
      }
      if (data.name) {
        formData.append("name", data.name);
      }
      if (data.price) {
        formData.append("price", String(data.price));
      }

      if (data.href) {
        formData.append("href", data.href);
      }

      formData.append("isActive", String(data.isActive));

      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/admin/cms/product-carousels/${
          productCarousel.id
        }`,
        formData
      );

      if (response.status === 200) {
        setProductCarousels((prev) =>
          prev.map((b) =>
            b.id === productCarousel.id ? response.data.productCarousel : b
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
        <Button className="bg-blue-50 text-blue-700 flex items-center space-x-2 p-1.5 px-2.5 shadow-none rounded-lg focus-visible:right-0 hover:bg-blue-100">
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
            <Label>Name</Label>
            <Input type="text" {...register("name")} />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label>Price</Label>
            <Input type="text" {...register("price")} />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label>Link URL</Label>
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
              checked={!!isActive}
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
