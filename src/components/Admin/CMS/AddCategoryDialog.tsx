import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
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
const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  image: z.any().refine((file) => file.length > 0, "Image is required"),
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
    handleSubmit, // ✅ Correct way to handle form submission
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(categorySchema),
  });

  const onSubmit = async (data: CategorySchemaType) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("image", data.image[0]);

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
        <Button>
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
            <Input type="file" accept="image/*" {...register("image")} />
            {errors.image && (
              <p className="text-red-500 text-sm">
                {String(errors.image.message)}
              </p>
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
