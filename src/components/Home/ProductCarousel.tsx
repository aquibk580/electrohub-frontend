"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { useEffect, useState } from "react"
import type { ProductCrousel } from "@/pages/Admin/ContentManagement"
import axios from "@/lib/axios"
import { useNavigate } from "react-router-dom"
import { formatPrice } from "@/utils/FormatPrice"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProductCarousel() {
  const navigate = useNavigate()
  const [productCarousels, setProductCarousels] = useState<Array<ProductCrousel>>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getAllProductCarousels = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/product-carousels`)
        if (response.status === 200) {
          setProductCarousels(response.data)
        }
      } catch (error: any) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    getAllProductCarousels()
  }, [])

  if (isLoading) {
    return (
      <div className="w-full">
        <div className="flex gap-4 overflow-hidden">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="min-w-[200px] md:min-w-[250px]">
              <Skeleton className="h-[250px] w-full rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (productCarousels.length === 0) {
    return null
  }

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent>
        {productCarousels.map((productCarousel) => (
          <CarouselItem key={productCarousel.id} className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 ">
            <Card
              className="overflow-hidden shadow-sm border-2  dark:border-none dark:bg-gradient-to-br from-gray-900 via-primary/10 to-black cursor-pointer"
              onClick={() => navigate(productCarousel.href)}
            >
              <div className="relative pt-4 px-4">
                <Badge variant="secondary" className="absolute dark:bg-primary/70 top-2 rounded-lg right-2 z-10">
                  Featured
                </Badge>
                <div className="aspect-square rounded-md overflow-hidden  flex items-center justify-center">
                  <img
                    src={productCarousel.imageUrl || "/placeholder.svg"}
                    alt={productCarousel.name}
                    className="h-full w-full object-contain "
                  />
                </div>
              </div>
              <CardContent className="p-4 text-center">
                <h3 className="font-semibold p-1 border-b-2 dark:border-b-gray-500  text-foreground line-clamp-1 mb-1">{productCarousel.name}</h3>
                <p className="text-primary dark:text-primary/80 font-semibold text-sm"> Starting From ₹{formatPrice(productCarousel.price)}</p>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="hidden sm:block">
        <CarouselPrevious className="left-0 -translate-x-1/2" />
        <CarouselNext className="right-0 translate-x-1/2" />
      </div>
    </Carousel>
  )
}

