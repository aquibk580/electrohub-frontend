import React, { Dispatch, SetStateAction, useMemo } from "react";
import { Product } from "../product/productTypes";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import axios from "@/lib/axios";

type ProductCardProps = {
  product: Product;
  wishlist: Set<number>;
  setWishlist: Dispatch<SetStateAction<Set<number>>>;
};

const ProductCard = ({ product, wishlist, setWishlist }: ProductCardProps) => {
  const navigate = useNavigate();
  const isWishlisted = wishlist.has(product.id);

  const stars = useMemo(() => {
    const totalStars = 5;
    const filledStars = Math.round(product.averageRating);

    return [...Array(totalStars)].map((_, i) => (
      <Star
        key={i}
        className={
          i < filledStars
            ? "fill-green-700 text-green-700"
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
    navigate(`/product/${product.id}`, { state: { product } }); 
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <div
        className="w-full bg-[#9797970f] p-2 rounded-lg overflow-hidden aspect-square"
        onClick={handleNavigate}
      >
        <img
          loading="lazy"
          src={product.images[0]?.url || "/placeholder.svg"}
          alt={product.name}
          className="object-contain w-full mix-blend-multiply h-full hover:scale-110 transition-transform duration-300"
        />
      </div>

      <div className="sm:p-2">
        <Link to={`/product/${product.id}`}>
          <h2 className="text-lg font-semibold mb-1 group-hover:text-blue-600 transition-colors duration-300 ease-in-out line-clamp-1">
            {product.name}
          </h2>
        </Link>
        <p className="text-gray-600 mb-2 text-sm line-clamp-1">
          {product.description}
        </p>
        <div className="flex">{stars}</div>
        <div className="flex py-2 justify-between items-center flex-wrap-reverse">
          <div className="sm:space-x-4 space-x-2 flex">
            <Button
              onClick={() => handleAddToCart(product.id)}
              className="bg-white text-black text-xs sm:text-base font-medium border-black border px-3 py-1.5 hover:bg-green-900 hover:border-green-900 hover:text-white transition-all rounded-full"
            >
              Add to Cart
            </Button>
            <Button
              onClick={() => handleToggleWishlist(product.id)}
              className={`rounded-full p-3 ${
                isWishlisted ? "text-red-500" : "text-gray-500"
              }`}
            >
              <Heart className={`${isWishlisted ? "fill-current" : ""}`} />
            </Button>
          </div>
          <span className="text-lg font-bold">₹{product.price}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
