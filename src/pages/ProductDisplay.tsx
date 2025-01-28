import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Heart, Star, Truck, Plus, Minus, RotateCcw, Gift, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "../components/ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Input } from "../components/ui/input"
import { Skeleton } from "../components/ui/skeleton"
import RelatedProducts from "../components/RelatedProducts"
import axios from "axios"
import { faqs, offers, reviews, specifications } from "@/assets/assets"


interface Product {
  id: number
  title: string
  price: number
  description: string
  category: {
    id: number
    name: string
    image: string
  }
  image: string[]
  rating: {
    rate: number
    count: number
  }
}


export default function ProductDisplay() {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  // const [selectedImage, setSelectedImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const increment = () => {
    setQuantity((prev) => prev + 1)
  }
  const decrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (!isNaN(value) && value >= 1) {
      setQuantity(value)
    }
  }

  const nextImage = () => {
    if (product) {
      // setSelectedImage((prev) => (prev + 1) % product.image.length)
    }
  }

  const prevImage = () => {
    if (product) {
      // setSelectedImage((prev) => (prev - 1 + product.image.length) % product.images.length)
    }
  }

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.in/api/products/${id}`)
        setProduct({
          ...response.data.product,
          rating: { rate: 4.5, count: 120 }, // Adding mock rating since API doesn't provide it
        })
        console.log(response)
        setLoading(false)
        console.log(response.data);
        // Scroll to top when product loads
        window.scrollTo(0, 0)
      } catch (err) {
        setError("An error occurred while fetching the product.")
        setLoading(false)
        console.error("Error fetching product:", err)
      }
    }

    fetchProduct()
  }, [id])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 mt-16">

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Image Section */}
          <div className="space-y-4">
            {/* Main Image */}
            <Skeleton className="aspect-[4/3] w-full h-[500px] rounded-lg" />
            {/* Thumbnail Images */}
            <div className="flex gap-4 mt-4">
              {[...Array(3)].map((_, index) => (
                <Skeleton key={index} className="w-20 h-20 rounded-lg flex-shrink-0" />
              ))}
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="space-y-6">
            {/* Deal Badge */}
            <Skeleton className="h-6 w-24 rounded-full" />

            {/* Title */}
            <Skeleton className="h-8 w-3/4" />

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="w-4 h-4" />
                ))}
              </div>
              <Skeleton className="h-4 w-24" />
            </div>

            {/* Price Section */}
            <div className="flex items-baseline space-x-2">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-16" />
            </div>

            {/* Delivery Info */}
            <div className="flex space-x-4">
              <Skeleton className="h-6 w-28" />
              <Skeleton className="h-6 w-28" />
            </div>

            {/* Available Offers */}
            <div className="space-y-4 border rounded-lg p-4">
              <Skeleton className="h-6 w-32" />
              {[...Array(3)].map((_, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <Skeleton className="h-5 w-20" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              ))}
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-16" />
              <div className="flex items-center space-x-3">
                <Skeleton className="h-10 w-10" />
                <Skeleton className="h-10 w-14" />
                <Skeleton className="h-10 w-10" />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <Skeleton className="h-12 flex-1" />
              <Skeleton className="h-12 flex-1" />
              <Skeleton className="h-12 w-12" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error || "Product not found"}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen  bg-background">

      <main className="container  mx-auto px-4 py-8 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            {/* MAIN IMAGE  */}
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={product.image}
                  alt={product.title}
                  className="object-contain w-full h-full cursor-pointer hover:cursor-pointer"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white cursor-pointer hover:cursor-pointer"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white cursor-pointer hover:cursor-pointer"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>

              {/* Thumbnail images
              // <div className="flex gap-2 overflow-x-auto pb-2">
              //   {product.image.map((image, index) => (
              //     <button
              //       key={index}
              //       onMouseEnter={() => setSelectedImage(index)}
              //       className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 cursor-pointer hover:cursor-pointer ${selectedImage === index ? "border-primary" : "border-transparent"
              //         }`}
              //     >
              //       <img
              //         src={image || "/placeholder.svg"}
              //         alt={`${product.title} thumbnail ${index + 1}`}
              //         className="w-full h-full object-cover cursor-pointer hover:cursor-pointer"
              //       />
              //     </button>
              //   ))}
              // </div> */}
            </div> 

            {/* Thumbnail images */}
            {/* <div className="flex justify-center mt-4 space-x-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? "border-blue-500" : "border-transparent"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.title} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div> */}
          </div>

          <div className="space-y-6">
            {/* PRODUCT TITLE, RATINGS STARS & BATCH */}
            <div>
              <Badge variant="destructive" className="mb-2">
                Limited time deal
              </Badge>
              <h1 className="text-3xl font-bold text-foreground">{product.title}</h1>
              <h3 className="text-sm font-medium text-gray-600 line-clamp-2">
                {product.description}
              </h3>
              <div className="mt-3 flex items-center space-x-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < Math.round(product.rating.rate)
                          ? "fill-green-700 text-green-700"
                          : "fill-gray-200 text-gray-200"
                        }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  ({product.rating.rate} rating, {product.rating.count} reviews)
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {/* PRICE & DISCOUNT */}
              <div className="flex items-center space-x-4">
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold text-foreground">₹{(product.price * 0.43).toFixed(2)}</span>
                  <span className="text-lg text-muted-foreground line-through">₹{product.price.toFixed(2)}</span>
                  <Badge variant="secondary" className="font-semibold">57% OFF</Badge>
                </div>
              </div>

              {/* FREE DELIVERY ICON */}
              <div className="flex items-center text-muted-foreground space-x-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="flex items-center text-gray-700">
                      <Truck className="h-5 w-5 mr-2" />
                      <span className="text-sm ">Free Delivery</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Free delivery on orders above ₹499</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="flex items-center text-gray-700">
                      <RotateCcw className="h-5 w-5 mr-2" />
                      <span className="text-sm">7 Days Return</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Easy 7 days return and exchange</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              {/* SPECIAL OFFERS */}
              <div className="border rounded-lg p-4 space-y-4">
                <h3 className="font-semibold flex items-center">
                  <Gift className="h-5 w-5 mr-2" />
                  Available Offers
                </h3>
                <div className="space-y-3">
                  {offers.map((offer, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <Badge variant="outline" className="">{offer.type}</Badge>
                      <div>
                        <p className="text-sm text-foreground">{offer.description}</p>
                        {offer.code && <p className="text-sm text-muted-foreground">Use code: {offer.code}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* QUANTITY COMPONENT  +   - */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Quantity</label>
                  <div className="flex items-center gap-3">
                    <Button variant="outline" size="icon" onClick={decrement} className="h-10 w-10 rounded-lg  cursor-pointer">
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      value={quantity}
                      onChange={handleChange}
                      className="h-10 w-14 rounded-lg text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <Button variant="outline" size="icon" onClick={increment} className="h-10 w-10 rounded-lg cursor-pointer">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* ADD TO CART, BUY NOW BUTTON & ADD TO WISHLIST BUTTON */}
              <div className="flex space-x-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button className="flex-1 hover:bg-green-950 cursor-pointer" size="lg">
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
                      <Button className="flex-1 bg-green-600 hover:bg-green-700 cursor-pointer" size="lg">
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
                        onClick={() => setIsWishlisted(!isWishlisted)}
                        className={isWishlisted ? "text-red-500 cursor-pointer" : "cursor-pointer"}
                      >
                        <Heart className={`h-7 w-7 ${isWishlisted ? "fill-current" : ""}`} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Add to wishlist</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        </div>

        {/* PRODUCT DETAILS, USER REVIEWS & FAQs */}
        <div className="mt-12 h-[500px] overflow-hidden">
  <Tabs defaultValue="details">
    <TabsList className="grid w-full grid-cols-3">
      <TabsTrigger value="details">Specifications</TabsTrigger>
      <TabsTrigger value="reviews">Reviews</TabsTrigger>
      <TabsTrigger value="faq">FAQs</TabsTrigger>
    </TabsList>

    <TabsContent
      value="details"
      className="mt-6 h-[400px] overflow-y-auto overflow-x-hidden"
    >
      <div className="prose max-w-none dark:prose-invert">
        <div className="grid gap-4">
          {specifications.map((spec, idx) => (
            <div
              key={idx}
              className="grid grid-cols-2 gap-4 py-2 border-b"
            >
              <span className="font-medium">{spec.label}</span>
              <span>{spec.value}</span>
            </div>
          ))}
        </div>
      </div>
    </TabsContent>

    <TabsContent
      value="reviews"
      className="mt-6 h-[400px] px-6 overflow-y-auto overflow-x-hidden"
    >
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="font-medium">{review.author}</span>
                {review.verified && (
                  <Badge variant="secondary">Verified Purchase</Badge>
                )}
              </div>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="mt-2 text-gray-600">{review.content}</p>
          </div>
        ))}
      </div>
    </TabsContent>

    <TabsContent
      value="faq"
      className="mt-6 h-[400px] overflow-y-auto overflow-x-hidden"
    >
      <div className="space-y-6">
        {faqs.map((faq, idx) => (
          <div key={idx} className="border-b pb-4">
            <h3 className="font-medium text-foreground mb-2">
              {faq.question}
            </h3>
            <p className="text-muted-foreground">{faq.answer}</p>
          </div>
        ))}
      </div>
    </TabsContent>
  </Tabs>
</div>


        <RelatedProducts category={product.category} currentProductId={product.id} />
      </main>

    </div>
  )
}
