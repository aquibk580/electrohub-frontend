import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "../ui/tooltip";
import { Heart } from "lucide-react";
import { Button } from "../ui/button";
import { Dispatch, SetStateAction } from "react";
import axios from "@/lib/axios";
import { toast } from "react-toastify";

type ProductAddtocartProps = {
  id: number;
  wishlist: Set<number>;
  setWishlist: Dispatch<SetStateAction<Set<number>>>;
};

const ProductAddtocart = ({
  id,
  wishlist,
  setWishlist,
}: ProductAddtocartProps) => {
  const isWishlisted = wishlist.has(id);
  const handleAddToCart = async (productId: number) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/cart/add/${productId}`,
        { quantity: "1" }
      );
      if (response.status === 200) {
        toast.success(response.data?.message, {
          position: "bottom-center",
          theme: "dark",
        });
      }
    } catch (error: any) {
      toast.error(error.message, {
        position: "bottom-center",
        theme: "dark",
      });
    }
  };

  const handleToggleWishlist = async (productId: number) => {
    setWishlist((prev) => {
      const newWishlist = new Set(prev);
      if (newWishlist.has(productId)) {
        newWishlist.delete(productId);
      } else {
        newWishlist.add(productId);
      }
      return newWishlist;
    });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/wishlist/${productId}`
      );

      if (response.status === 200) {
        toast.success(response.data.message, {
          position: "bottom-center",
          theme: "dark",
        });
      } else {
        toast.error("Error updating wishlist", {
          position: "bottom-center",
          theme: "dark",
        });
      }
    } catch (error: any) {
      setWishlist((prev) => {
        const newWishlist = new Set(prev);
        if (newWishlist.has(productId)) {
          newWishlist.delete(productId);
        } else {
          newWishlist.add(productId);
        }
        return newWishlist;
      });

      toast.error(error.message || "Error updating wishlist", {
        position: "top-center",
        theme: "dark",
      });
    }
  };

  return (
    <div>
      <div className="flex space-x-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="flex-1 bg-green-500 hover:bg-green-600  cursor-pointer"
                onClick={() => handleAddToCart(id)}
              >
                Add to Cart
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add this item to your cart</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="flex-1 hover:bg-amber-600 bg-amber-500 cursor-pointer ">
                Buy Now
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Buy This Item Now</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleToggleWishlist(id)}
                className={` hidden md:block lg:block${
                  isWishlisted
                    ? "text-red-500 cursor-pointer"
                    : "cursor-pointer"
                }`}
              >
                <Heart
                  className={`h-7 w-7 ${
                    isWishlisted ? "fill-red-500 text-red-500" : "fill-none"
                  }`}
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add to wishlist</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ProductAddtocart;
