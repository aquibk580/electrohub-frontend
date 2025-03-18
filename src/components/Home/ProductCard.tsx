import React, { Dispatch, SetStateAction, useMemo } from "react";
import { Product } from "../../types/entityTypes";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import axios from "@/lib/axios";
import { formatPrice } from "@/utils/FormatPrice";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

type ProductCardProps = {
  product: Product;
  wishlist: Set<number>;
  setWishlist: Dispatch<SetStateAction<Set<number>>>;
};

const ProductCard = ({ product, wishlist, setWishlist }: ProductCardProps) => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const isWishlisted = wishlist.has(product.id);

  const stars = useMemo(() => {
    const totalStars = 5;
    const filledStars = Math.round(product.averageRating);

    return [...Array(totalStars)].map((_, i) => (
      <Star
        key={i}
        className={
          i < filledStars
            ? "fill-primary text-primary"
            : "fill-gray-400 text-gray-400"
        }
        style={{ width: "14px", height: "14px" }}
      />
    ));
  }, [product.averageRating]);

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

  const handleNavigate = async () => {
    navigate(`/product/${product.id}`, {
      state: { product, wishlist },
    });
  };

  return (
    <div className="bg-card text-card-foreground rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-border">
      <div
        className="w-full bg-muted p-2 rounded-lg overflow-hidden aspect-square"
        onClick={handleNavigate}
      >
        <img
          loading="lazy"
          src={product.images[0]?.url || "/placeholder.svg"}
          alt={product.name}
          className="object-contain w-full h-full hover:scale-110 transition-transform duration-300 cursor-pointer"
        />
      </div>

      <div className="p-3">
        <div onClick={handleNavigate} className="cursor-pointer">
          <h2 className="text-lg font-semibold mb-1 hover:text-primary transition-colors duration-300 ease-in-out line-clamp-1">
            {product.name}
          </h2>
        </div>
        <p className="text-muted-foreground mb-2 text-sm line-clamp-1">
          {product.description}
        </p>
        <div className="flex text-amber-500">{stars}</div>
        <span className="text-lg font-bold mt-4 text-foreground">
          ₹
          {formatPrice(
            product.price - (product.price / 100) * product.offerPercentage
          )}
        </span>
        <div className="flex py-2 justify-between items-center mt-1">
          {isAuthenticated && (
            <div className="space-x-2 flex">
              <Button
                onClick={() => handleAddToCart(product.id)}
                className="bg-background hover:bg-primary hover:text-primary-foreground text-foreground text-xs sm:text-sm font-medium border border-input px-3 py-1.5 transition-colors rounded-full"
              >
                Add to Cart
              </Button>
              <Button
                onClick={() => handleToggleWishlist(product.id)}
                className={`rounded-full p-2 bg-background border border-input hover:bg-primary/10 ${
                  isWishlisted ? "text-red-500" : "text-muted-foreground"
                }`}
              >
                <Heart
                  size={18}
                  className={`${isWishlisted ? "fill-current" : ""}`}
                />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
