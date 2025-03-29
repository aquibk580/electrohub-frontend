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

interface Category {
  name: string;
  imageUrl: string;
}

// Schema for validating the form (Only image is allowed)
const categorySchema = z.object({
  image: z.any().optional(),
});

type CategorySchemaType = z.infer<typeof categorySchema>;

export default function EditCategoryDialog({
  categoryName,
  setCategories,
  imageUrl,
}: {
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  categoryName: string;
  imageUrl: string;
}) {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(imageUrl);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<CategorySchemaType>({
    resolver: zodResolver(categorySchema),
  });

  const imageFile = watch("image");

  useEffect(() => {
    if (imageFile && imageFile.length > 0) {
      const file = imageFile[0];
      setPreview(URL.createObjectURL(file));
    }
  }, [imageFile]);

  useEffect(() => {
    if (open) {
      setPreview(imageUrl);
    }
  }, [open, imageUrl]);

  const handleClose = () => {
    reset();
    setPreview(imageUrl);
    setOpen(false);
  };

  const onSubmit = async (data: CategorySchemaType) => {
    if (!data.image?.length) {
      toast.warning("Please select a new image", {
        position: "top-center",
        theme: "dark",
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", data.image[0]);

      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/admin/cms/categories/${categoryName}`,
        formData
      );

      if (response.status === 200) {
        setCategories((prev) =>
          prev.map((c) =>
            c.name === categoryName ? response.data?.category : c
          )
        );

        toast.success(`Category image updated successfully`, {
          position: "top-center",
          theme: "dark",
        });
      }
    } catch (error: any) {
      console.error("Failed to update category image:", error);
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
        <Button className="bg-blue-50 dark:border-none dark:bg-blue-300 text-blue-700 border border-blue-400 flex items-center space-x-2 p-1.5 px-2.5 shadow-none rounded-lg focus-visible:right-0 hover:bg-blue-100">
          <Edit className="w-5" />
          <span className="text-sm font-medium">Edit</span>
        </Button>
      </DialogTrigger>
      <DialogContent onCloseAutoFocus={handleClose}>
        <DialogHeader>
          <DialogTitle>Update Category Image</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          encType="multipart/form-data"
        >
          <div className="grid w-full items-center gap-1.5">
            <Label>Current Image</Label>
            {preview && (
              <img
                src={preview}
                alt="Category Preview"
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
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Image"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
