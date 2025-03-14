"use client"

import axios from "axios"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import type { Product } from "./productTypes"
import { formatPrice } from "@/utils/FormatPrice"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

const RelatedProducts = ({
  category,
  currentProductId,
}: {
  category: string
  currentProductId: number
}) => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/user/products/relatedproducts/${category}`,
        )
        const allProducts = response.data.products
        const relatedProducts = allProducts
          .filter((product: Product) => product.categoryName === category && product.id !== currentProductId)
          .slice(0, 8) // Increased to 8 for better carousel experience
        setProducts(relatedProducts)
        setLoading(false)
      } catch (err) {
        setError("An error occurred while fetching related products.")
        setLoading(false)
        console.error("Error fetching related products:", err)
      }
    }

    if (category) {
      fetchRelatedProducts()
    }
  }, [category, currentProductId])

  const getAverageRating = (product: Product) => {
    const totalRating = product?.reviews?.reduce((acc, review) => acc + review.rating, 0)

    return product.reviews.length > 0 ? totalRating / product.reviews.length : 0
  }

  const stars = useCallback((product: Product) => {
    const totalStars = 5
    const filledStars = Math.round(getAverageRating(product))

    return [...Array(totalStars)].map((_, i) => (
      <Star
        key={i}
        className={i < filledStars ? "fill-primary text-primary" : "fill-gray-400 text-gray-400"}
        style={{ width: "14px", height: "14px" }}
      />
    ))
  }, [])

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      // Scroll by the width of one product card (280px) plus gap (16px)
      const scrollAmount = direction === "left" ? -296 : 296

      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      })
    }
  }

  if (loading) {
    return (
      <div className="w-full py-8">
        <h2 className="text-2xl font-bold mb-6">Similar Products</h2>
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full py-8">
        <h2 className="text-2xl font-bold mb-6">Similar Products</h2>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">Error: {error}</div>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="w-full py-8">
        <h2 className="text-2xl font-bold mb-6">Similar Products</h2>
        <p className="text-muted-foreground">No similar products found.</p>
      </div>
    )
  }

  return (
    <div className="w-full py-8 relative ">
      <div className="relative mb-6">
        <h2 className="text-2xl font-bold">Similar Products</h2>
      </div>

      <div
        ref={carouselRef}
        className="flex overflow-x-auto gap-4 pb-4 px-12 scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <Button
          variant="outline"
          size="icon"
          onClick={() => scrollCarousel("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm shadow-md h-24 w-10"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => scrollCarousel("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm shadow-md h-24 w-10"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        {products.map((product) => (
          <Card
            key={product.id}
            className={cn(
              "flex-shrink-0 w-[280px] snap-start rounded-lg overflow-hidden border border-border bg-accent",
              "transition-all duration-300 hover:shadow-md",
            )}
          >
            <Link to={`/product/${product.id}`} className="block">
              <div className="w-full p-2 aspect-square overflow-hidden">
                <img
                  src={product.images[0]?.url || "/placeholder.svg"}
                  alt={product.name}
                  className="object-contain w-full h-full rounded-md hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>

            <CardContent className="p-4">
              <Link to={`/product/${product.id}`}>
                <h3 className="font-semibold text-lg mb-1 line-clamp-1 hover:text-primary transition-colors">
                  {product.name}
                </h3>
              </Link>
              <p className="text-muted-foreground text-sm mb-2 line-clamp-2">{product.description}</p>
              <div className="flex mb-2">{stars(product)}</div>
            </CardContent>

            <CardFooter className="p-4 pt-0 flex justify-between items-center">
              <span className="text-lg font-bold">₹{formatPrice(product.price)}</span>
              <Button variant="secondary" size="sm" asChild className="rounded-full">
                <Link to={`/product/${product.id}`}>View</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default RelatedProducts

