import { assets } from "@/assets/assets";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import axios from "@/lib/axios";
import { useState } from "react";
import { toast } from "react-toastify";

interface DeleteButtonDialogProps {
  categoryName: string;
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

interface Category {
  name: string;
  imageUrl: string;
}

export default function DeleteCategoryButton({
  categoryName,
  setCategories,
}: DeleteButtonDialogProps) {
  const [deletingCategory, setDeletingCategory] = useState<string | null>(null);
  const handleDelete = async (categoryName: string) => {
    setDeletingCategory(categoryName);
    try {
      const response = await axios.delete(
        `${
          import.meta.env.VITE_API_URL
        }/api/admin/cms/categories/${categoryName}`
      );

      if (response.status === 200) {
        setCategories((prev) =>
          prev.filter((category: Category) => category.name !== categoryName)
        );
        toast.success(`Category ${categoryName} Deleted Successfully`, {
          position: "top-center",
          theme: "dark",
        });
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message, {
        position: "top-center",
        theme: "dark",
      });
    } finally {
      setDeletingCategory(null);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-red-50  dark:border-none dark:bg-red-200 text-red-700 border  border-red-400/50 flex items-center space-x-2 p-1.5 px-2.5 shadow-none rounded-lg hover:bg-red-100">
          <div className=" w-4 h-4  flex items-center  justify-center rounded-lg">
            <img src={assets.del} className="w-6" />
          </div>
          {deletingCategory === categoryName ? "Deleting..." : "Delete"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Deleting this category will
            permanently remove it from our system, and it cannot be restored.
            Are you sure you want to continue?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={() => handleDelete(categoryName)}
          >
            {deletingCategory !== categoryName ? "Continue" : "Deleting..."}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
