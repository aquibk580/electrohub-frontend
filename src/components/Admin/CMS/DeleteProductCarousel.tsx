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
import { BannerCrousel, ProductCrousel } from "@/pages/Admin/ContentManagement";

interface DeleteBannerCarouselButtonProps {
  id: number;
  setProductCarousels: React.Dispatch<React.SetStateAction<ProductCrousel[]>>;
}

export default function DeleteProductCarouselButton({
  id,
  setProductCarousels,
}: DeleteBannerCarouselButtonProps) {
  const [deletingProductCarosuelId, setDeletingProductCarosuelId] = useState<
    number | null
  >(null);
  const handleDelete = async (id: number) => {
    setDeletingProductCarosuelId(id);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/admin/cms/product-carousels/${id}`
      );

      if (response.status === 200) {
        setProductCarousels((prev) =>
          prev.filter(
            (productCarousel: ProductCrousel) => productCarousel.id !== id
          )
        );
        toast.success(`Product Slider item Deleted Successfully`, {
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
      setDeletingProductCarosuelId(null);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-red-50 dark:border-none dark:bg-red-200 text-red-700 border border-red-400 flex items-center space-x-2 p-1.5 px-2.5 shadow-none rounded-lg hover:bg-red-100">
          <div className=" w-4 h-4  flex items-center  justify-center rounded-lg">
            <img src={assets.del} className="w-6" />
          </div>
          {deletingProductCarosuelId === id ? "Deleting..." : "Delete"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Deleting this Slider item will
            permanently remove it from our system, and it cannot be restored.
            Are you sure you want to continue?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={() => handleDelete(id)}
          >
            {deletingProductCarosuelId !== id ? "Continue" : "Deleting..."}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
