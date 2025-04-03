import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "../ui/tooltip";
import { AlertCircle, Heart } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from "@/lib/axios";
import { toast } from "react-toastify";
import Checkout from "../User/Checkout";
import { Card, CardContent } from "../ui/card";

type ProductAddtocartProps = {
  id: number;
  wishlist: Set<number>;
  setWishlist: Dispatch<SetStateAction<Set<number>>>;
  total: number;
  status: string;
};

interface OrderInput {
  total: number;
  items: Array<{ productId: number; quantity: number }>;
}

const ProductAddtocart = ({
  id,
  wishlist,
  setWishlist,
  total,
  status,
}: ProductAddtocartProps) => {
  const [orderData, setOrderData] = useState<OrderInput>({
    total: 0,
    items: [],
  });

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

  useEffect(() => {
    setOrderData({
      total: total,
      items: [{ productId: id, quantity: 1 }],
    });
  }, []);

  return (
    <div>
      <div
        className={`flex space-x-4 ${
          status === "OutOfStock" && "justify-between"
        }`}
      >
        {status !== "OutOfStock" ? (
          <>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className="flex-1 bg-green-500 hover:bg-green-600  rounded-lg cursor-pointer"
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
                  <Checkout
                    orderData={orderData}
                    flag="buy"
                    styles="flex-1 hover:bg-amber-600 bg-amber-500 cursor-pointer"
                    text="Buy now"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Buy This Item Now</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
        ) : (
          <Card className="overflow-hidden border-0 shadow-lg">
            <div className="bg-gradient-to-r" />
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center">
                    <AlertCircle className="h-6 w-6 text-rose-500" />
                  </div>
                </div>

                <div className="flex-grow space-y-3 text-center md:text-left">
                  <div className="space-y-1">
                    <Badge
                      variant="outline"
                      className="bg-rose-50 text-rose-700 border-rose-200 mb-2"
                    >
                      Currently Unavailable
                    </Badge>
                    <h3 className="text-xl font-semibold tracking-tight">
                      This product is currently out of stock
                    </h3>
                    <p className="text-muted-foreground">
                      We're working hard to restock this item. Sign up to be
                      notified when it becomes available.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleToggleWishlist(id)}
                className={` rounded-lg hidden md:block lg:block${
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
