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
import { Plus } from "lucide-react";
import axios from "@/lib/axios";
import { toast } from "react-toastify";

interface Category {
  name: string;
  imageUrl: string;
}
// Define schema using Zod for validation
const categorySchema: z.ZodSchema = z.object({
  name: z.string().min(1, "Category name is required"),
  image: z.any().refine((file) => file instanceof File, "Image is required"),
});

type CategorySchemaType = z.infer<typeof categorySchema>;

export default function AddCategoryDialog({
  setCategories,
}: {
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    clearErrors,
  } = useForm({
    resolver: zodResolver(categorySchema),
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");

  useEffect(() => {
    if (!open) {
      reset();
      setPreviewImage(null);
      setFileName("");
    }
  }, [open]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setFileName(file.name);
      setValue("image", file);
      clearErrors("image");
    }
  };

  const onSubmit = async (data: CategorySchemaType) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("image", data.image);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/admin/cms/categories`,
        formData
      );

      if (response.status === 201) {
        toast.success(
          `Category ${response.data?.category.name} Added Successfully`,
          {
            position: "top-center",
            theme: "dark",
          }
        );
        setCategories((prev) => [
          ...prev,
          {
            name: response.data?.category.name,
            imageUrl: response.data.category.imageUrl,
          },
        ]);
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
        <Button className="rounded-xl shadow-md text-accent-foreground bg-primary/40 font-medium hover:text-white border border-primary">
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          encType="multipart/form-data"
        >
          <div className="grid w-full items-center gap-1.5">
            <Label>Name</Label>
            <Input {...register("name")} placeholder="Enter category name" />
            {errors.name && (
              <p className="text-red-500 text-sm">
                {String(errors.name.message)}
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
            {previewImage && (
              <img
                src={previewImage}
                alt="Selected Preview"
                className="mt-2 w-32 h-32 object-cover rounded-lg shadow"
              />
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Category"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
