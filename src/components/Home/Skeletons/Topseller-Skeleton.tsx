import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Package, Star, ShoppingCart } from "lucide-react"

const TopSellerSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen dark:bg-black">
      {/* Hero Section Skeleton */}
      <div className="dark:bg-black">
        <div className="container mx-auto px-4 pt-16 md:py-6">
          <div className="flex flex-col lg:flex-row gap-10 py-6 bg-slate-50/30 border dark:border-slate-700 dark:bg-gradient-to-tl from-slate-700 via-slate-900 to-black shadow-md rounded-xl items-center px-6 md:px-16">
            <div className="flex flex-col items-center justify-center">
              <div className="relative">
                <Skeleton className="w-36 h-36 md:w-44 md:h-44 rounded-full" />
                <Skeleton className="absolute bottom-0 left-12 w-20 h-6 rounded-lg" />
              </div>
            </div>
            <div className="md:w-11/12 lg:w-4/5">
              <Skeleton className="h-10 w-3/4 mx-auto lg:mx-0 rounded-lg mb-2" />
              <Skeleton className="h-5 w-full md:w-2/3 mx-auto lg:mx-0 rounded-lg" />

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 bg-gray-50 border dark:border-slate-700 shadow-md dark:bg-gray-800/50 p-3 md:p-4 rounded-xl">
                  <div className="p-2">
                    <Package className="w-8 h-8 text-gray-300 dark:text-gray-600" />
                  </div>
                  <div className="w-full">
                    <Skeleton className="h-4 w-20 rounded-lg mb-2" />
                    <Skeleton className="h-5 w-10 rounded-lg" />
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-gray-50 border dark:border-slate-700 shadow-md dark:bg-gray-800/50 p-3 md:p-4 rounded-xl">
                  <div className="p-2">
                    <Star className="w-8 h-8 text-gray-300 dark:text-gray-600" />
                  </div>
                  <div className="w-full">
                    <Skeleton className="h-4 w-20 rounded-lg mb-2" />
                    <Skeleton className="h-5 w-16 rounded-lg" />
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-gray-50 border dark:border-slate-700 shadow-md dark:bg-gray-800/50 p-3 md:p-4 rounded-xl">
                  <div className="p-2">
                    <ShoppingCart className="w-8 h-8 text-gray-300 dark:text-gray-600" />
                  </div>
                  <div className="w-full">
                    <Skeleton className="h-4 w-20 rounded-lg mb-2" />
                    <Skeleton className="h-5 w-12 rounded-lg" />
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4">
                <Skeleton className="h-5 w-40 rounded-lg" />
                <Skeleton className="h-5 w-40 rounded-lg" />
                <Skeleton className="h-5 w-40 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section Skeleton */}
      <div className="container mx-auto px-4 py-3 lg:py-1">
        <div className="flex flex-row sm:items-center justify-between gap-4 mb-6">
          <Skeleton className="h-8 w-64 rounded-lg" />
          <Skeleton className="h-8 w-40 rounded-full" />
        </div>

        <Separator className="mb-8" />

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {Array(8).fill(0).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

// Product Card Skeleton
const ProductCardSkeleton: React.FC = () => {
  return (
    <Card className="overflow-hidden border hover:border-primary/50 transition-all h-full">
      <CardContent className="p-0">
        <Skeleton className="w-full aspect-square rounded-t-lg" />
        <div className="p-4">
          <Skeleton className="h-4 w-3/4 rounded-lg mb-2" />
          <Skeleton className="h-6 w-1/2 rounded-lg mb-3" />
          <div className="flex justify-between items-center mt-4">
            <Skeleton className="h-5 w-20 rounded-lg" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default TopSellerSkeleton