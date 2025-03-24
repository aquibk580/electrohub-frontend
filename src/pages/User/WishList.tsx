import { Loader2, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { assets } from "@/assets/assets";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Product } from "@/types/entityTypes";
import { Helmet } from "react-helmet-async";

export function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState<Array<Product>>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const getAllWishlistItems = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/user/wishlist`
        );
        if (response.status === 200) {
          setWishlistItems(response.data.products);
        }
      } catch (error: any) {
        toast.error(error.message, {
          position: "top-center",
          theme: "dark",
        });
      } finally {
        setIsLoading(false);
      }
    };
    getAllWishlistItems();
  }, []);

  const handleAddToCart = async (productId: number) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/cart/add/${productId}`,
        { quantity: "1" }
      );
      if (response.status === 200) {
        toast.success(response.data?.message, {
          position: "top-center",
          theme: "dark",
        });
      }
    } catch (error: any) {
      toast.error(error.message, {
        position: "top-center",
        theme: "dark",
      });
    }
  };

  const handleDelete = async (productId: number) => {
    setWishlistItems((prev) => prev?.filter((item) => item.id !== productId));
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
      toast.error(error.message || "Error updating wishlist", {
        position: "top-center",
        theme: "dark",
      });
    }
  };

  return (
    <Card className="h-full flex flex-col rounded-cl shadow-md">
      <Helmet>
        <title>My Wishlist - Electrohub</title>
        <meta
          name="description"
          content="Save your favorite electronics for later! Easily manage and purchase your wishlist items anytime."
        />
      </Helmet>

      <CardHeader>
        <div className="flex items-center gap-4 mb-6">
          <img
            src={assets.wishList || "/placeholder.svg"}
            alt="Wishlist Icon"
            className="w-16 h-16"
          />
          <h1 className="text-2xl font-bold">Your Wishlist</h1>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto">
        <div className="space-y-4">
          {!isLoading ? (
            wishlistItems?.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center gap-4 p-4 border rounded-lg bg-primary/5 hover:bg-primary/10 shadow-sm"
              >
                {/* Product Image */}
                <img
                  src={item.images[0].url || "/placeholder.svg"}
                  alt={item.name}
                  className="w-24 h-24 sm:w-32 sm:h-32 object-contain rounded-lg"
                />

                {/* Product Details */}
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-medium text-lg mb-1">{item.name}</h3>
                  <span className="text-lg font-bold">₹{item.price}</span>
                  <div
                    className={`text-sm font-medium ${item.status !== "OutOfStock"
                        ? "text-green-600"
                        : "text-red-600"
                      }`}
                  >
                    {item.status !== "OutOfStock" ? "In Stock" : "Out of Stock"}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {item.status !== "OutOfStock" && (
                    <Button
                      size="icon"
                      variant="outline"
                      className="p-2 hover:bg-green-100"
                      aria-label="Add to Cart"
                      onClick={() => handleAddToCart(item.id)}
                    >
                      <ShoppingCart className="h-5 w-5 text-green-600" />
                    </Button>
                  )}
                  <Button
                    size="icon"
                    variant="outline"
                    className="p-2 hover:bg-red-100"
                    aria-label="Remove from Wishlist"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="h-5 w-5 text-red-600" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center min-h-screen">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
