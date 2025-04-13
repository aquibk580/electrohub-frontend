import type React from "react"
import { type Dispatch, type SetStateAction, useMemo } from "react"
import type { Product } from "../../types/entityTypes"
import { useNavigate } from "react-router-dom"
import { Heart, Star, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "react-toastify"
import axios from "@/lib/axios"
import { formatPrice } from "@/utils/FormatPrice"
import { useSelector } from "react-redux"
import type { RootState } from "@/redux/store"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type ProductCardProps = {
  product: Product
  wishlist: Set<number>
  setWishlist: Dispatch<SetStateAction<Set<number>>>
}

const ProductCard = ({ product, wishlist, setWishlist }: ProductCardProps) => {
  const navigate = useNavigate()
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated)
  const isWishlisted = wishlist.has(product.id)

  const hasDiscount = product.offerPercentage > 0
  const discountedPrice = product.price - (product.price / 100) * product.offerPercentage

  const stars = useMemo(() => {
    const totalStars = 5
    const filledStars = Math.round(product.averageRating)

    return [...Array(totalStars)].map((_, i) => (
      <Star
        key={i}
        className={i < filledStars ? "fill-primary text-primary" : "fill-muted text-muted"}
        style={{ width: "14px", height: "14px" }}
      />
    ))
  }, [product.averageRating])

  const handleAddToCart = async (e: React.MouseEvent, productId: number) => {
    e.stopPropagation()

    if (!isAuthenticated) {
      toast.info("Please login to add items to cart", {
        position: "top-center",
        theme: "dark",
      })
      return
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/cart/add/${productId}`, {
        quantity: "1",
      })
      if (response.status === 200) {
        toast.success(response.data?.message, {
          position: "top-center",
          theme: "dark",
        })
      }
    } catch (error: any) {
      toast.error(error.message, {
        position: "top-center",
        theme: "dark",
      })
    }
  }

  const handleToggleWishlist = async (e: React.MouseEvent, productId: number) => {
    e.stopPropagation()

    if (!isAuthenticated) {
      toast.info("Please login to add items to wishlist", {
        position: "top-center",
        theme: "dark",
      })
      return
    }

    setWishlist((prev) => {
      const newWishlist = new Set(prev)
      if (newWishlist.has(productId)) {
        newWishlist.delete(productId)
      } else {
        newWishlist.add(productId)
      }
      return newWishlist
    })

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/wishlist/${productId}`)

      if (response.status === 200) {
        toast.success(response.data.message, {
          position: "bottom-center",
          theme: "dark",
        })
      } else {
        toast.error("Error updating wishlist", {
          position: "bottom-center",
          theme: "dark",
        })
      }
    } catch (error: any) {
      setWishlist((prev) => {
        const newWishlist = new Set(prev)
        if (newWishlist.has(productId)) {
          newWishlist.delete(productId)
        } else {
          newWishlist.add(productId)
        }
        return newWishlist
      })

      toast.error(error.message || "Error updating wishlist", {
        position: "top-center",
        theme: "dark",
      })
    }
  }

  const handleNavigate = () => {
    navigate(`/product/${product.id}`, {
      state: { product, wishlist },
    })
  }

  return (
    <div
      className="group  text-card-foreground   overflow-hidden "
      onClick={handleNavigate}
    >
      <div className="relative">
        {/* Product image */}
        <div className="w-full bg-muted p-2   overflow-hidden aspect-square rounded-[10px] ">
          <img
            loading="lazy"
            src={product.images[0]?.url || "/placeholder.svg"}
            alt={product.name}
            className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        {/* Discount badge */}
        {hasDiscount && (
          <Badge variant="destructive" className="absolute top-2 rounded-lg left-2">
            {product.offerPercentage}% OFF
          </Badge>
        )}

        {/* Wishlist button */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm hover:bg-white/30 rounded-full h-10 w-10 p-1.5 shadow-sm"
                onClick={(e) => handleToggleWishlist(e, product.id)}
              >
                <Heart
                  size={25}
                  className={`${isWishlisted ? "fill-red-500 text-red-500" : "text-muted-foreground"}`}
                />
                <span className="sr-only">Add to wishlist</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isWishlisted ? "Remove from wishlist" : "Add to wishlist"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="px-2.5 md:-px-6 py-3">
        {/* Product details */}
        <div>
          <h2 className="text-base font-medium mb-1 line-clamp-1 group-hover:text-primary transition-colors duration-300">
            {product.name}
          </h2>
          <p className="text-muted-foreground text-sm mb-2 line-clamp-1">{product.description}</p>
          <div className="flex items-center gap-1 mb-2">
            {stars}
            {product.reviews.length > 0 && (
              <span className="text-xs text-muted-foreground ml-1">({product.reviews.length})</span>
            )}
          </div>
        </div>

        {/* Price and actions */}
        <div className="flex items-center justify-between mt-2 ">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-foreground">₹{formatPrice(discountedPrice)}</span>
            {hasDiscount && (
              <span className="text-xs text-muted-foreground line-through">₹{formatPrice(product.price)}</span>
            )}
          </div>

          {isAuthenticated && product?.status !== "OutOfStock" ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full h-9 w-9 bg-primary/10 hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                    onClick={(e) => handleAddToCart(e, product.id)}
                  >
                    <ShoppingCart size={16} />
                    <span className="sr-only">Add to cart</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add to cart</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            product?.status === "OutOfStock" && (
              <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50 text-[4px] text-center md:text-sm  rounded-lg">
                Out of Stock
              </Badge>
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCard

