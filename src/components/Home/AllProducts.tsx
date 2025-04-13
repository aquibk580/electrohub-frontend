"use client"

import type React from "react"

import { useState, useCallback, useMemo } from "react"
import { Loader2, Filter } from "lucide-react"
import type { Category, Product } from "../../types/entityTypes"
import ProductCard from "./ProductCard"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

interface AllProductsProps {
  products: Product[]
  categories: Category[]
  wishlist: Set<number>
  setWishlist: React.Dispatch<React.SetStateAction<Set<number>>>
  onLoadMore: (nextPage: number) => Promise<boolean>
  onCategoryChange: (category: string) => Promise<boolean>
  hasMore: boolean
  currentPage: number
}

const AllProducts = ({
  products,
  categories,
  wishlist,
  setWishlist,
  onLoadMore,
  onCategoryChange,
  hasMore,
  currentPage,
}: AllProductsProps) => {
  const [loadingMore, setLoadingMore] = useState(false)
  const [category, setCategory] = useState<string>("All")
  const [categoryLoading, setCategoryLoading] = useState(false)

  const loadMoreProducts = async () => {
    if (!hasMore || loadingMore) return
    setLoadingMore(true)

    try {
      await onLoadMore(currentPage + 1)
    } finally {
      setLoadingMore(false)
    }
  }

  const handleCategoryChange = useCallback(
    async (selectedCategory: string) => {
      if (category === selectedCategory) return

      setCategoryLoading(true)
      setCategory(selectedCategory)

      try {
        await onCategoryChange(selectedCategory)
      } finally {
        setCategoryLoading(false)
      }
    },
    [category, onCategoryChange],
  )

  const filteredProducts = useMemo(() => {
    return products
  }, [products])

  return (
    <>
      <div className="bg-background mb-5">
        <div className="flex flex-col space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl md:text-3xl font-bold">Our Products</h1>

            {/* Mobile filter */}
            <div className="block md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="border-primary rounded-xl" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="dark:bg-black/30 backdrop-blur-3xl">
                  <SheetHeader>
                    <SheetTitle>Categories</SheetTitle>
                    <SheetDescription className="text-accent-foreground/85">
                      Filter products by category
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6 flex flex-col gap-2">
                    <Button
                      variant={category === "All" ? "default" : "outline"}
                      className="justify-start rounded-xl"
                      onClick={() => handleCategoryChange("All")}
                      disabled={categoryLoading}
                    >
                      All
                    </Button>
                    {categories.map((item) => (
                      <Button
                        key={item.name}
                        variant={category === item.name ? "default" : "outline"}
                        className="justify-start rounded-xl"
                        onClick={() => handleCategoryChange(item.name)}
                        disabled={categoryLoading}
                      >
                        {item.name}
                      </Button>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Desktop Categories */}
          <div className="hidden md:flex overflow-x-auto py-2 gap-2 no-scrollbar">
            <Button
              variant={category === "All" ? "default" : "outline"}
              size="sm"
              className="rounded-full"
              onClick={() => handleCategoryChange("All")}
              disabled={categoryLoading}
            >
              All
            </Button>
            {categories.map((item) => (
              <Button
                key={item.name}
                variant={category === item.name ? "default" : "outline"}
                size="sm"
                className="rounded-full whitespace-nowrap"
                onClick={() => handleCategoryChange(item.name)}
                disabled={categoryLoading}
              >
                {item.name}
              </Button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {categoryLoading ? (
              // Loading skeleton for category change
              Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex flex-col space-y-3">
                  <div className="h-[200px] w-full rounded-xl bg-muted animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
                    <div className="h-4 w-1/2 bg-muted animate-pulse rounded" />
                  </div>
                </div>
              ))
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} wishlist={wishlist} setWishlist={setWishlist} />
              ))
            ) : (
              <div className="col-span-full py-12 text-center">
                <h1 className="text-2xl font-semibold text-foreground">No products found for this category</h1>
                <p className="mt-2 text-muted-foreground">Try selecting a different category</p>
              </div>
            )}
          </div>

          {/* Load More Button */}
          {hasMore && filteredProducts.length > 0 && !categoryLoading && (
            <div className="flex justify-center mt-8">
              <Button
                onClick={loadMoreProducts}
                variant="outline"
                size="lg"
                className="min-w-[200px] rounded-xl border-primary/50 bg-none hover:bg-primary/60 hover:text-white"
                disabled={loadingMore}
              >
                {loadingMore ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading...
                  </span>
                ) : (
                  "More Products"
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default AllProducts
