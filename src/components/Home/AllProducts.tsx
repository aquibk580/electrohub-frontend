"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Loader2, Filter } from "lucide-react";
import type { Category, Product } from "../../types/entityTypes";
import axios from "@/lib/axios";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
const PRODUCTS_PER_PAGE = 12;

const AllProducts = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [category, setCategory] = useState<string>("All");
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [categoriesRes, productsRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/api/categories/all`),
          axios.get(
            `${
              import.meta.env.VITE_API_URL
            }/api/user/products?page=1&limit=${PRODUCTS_PER_PAGE}`
          ),
        ]);

        if (categoriesRes.status === 200) setCategories(categoriesRes.data);
        if (productsRes.status === 200) {
          processProducts(productsRes.data.products);
          setHasMore(productsRes.data.products.length === PRODUCTS_PER_PAGE);
        }
      } catch (error: any) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchWishlist = async () => {
      try {
        const wishlistRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/user/wishlist/wishlistproducts`
        );

        if (wishlistRes.status === 200 && wishlistRes.data?.wishlist) {
          setWishlist(new Set(wishlistRes.data.wishlist));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchWishlist();
  }, [isAuthenticated]);

  const processProducts = (newProducts: Product[]) => {
    const updatedProducts = newProducts.map((product) => {
      const totalRating = product?.reviews?.reduce(
        (acc, review) => acc + review.rating,
        0
      );
      const averageRating =
        product.reviews.length > 0 ? totalRating / product.reviews.length : 0;
      return { ...product, averageRating };
    });

    setProducts((prevProducts) => [...prevProducts, ...updatedProducts]);
  };

  const loadMoreProducts = async () => {
    if (!hasMore) return;
    setLoadingMore(true);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/user/products?page=${
          page + 1
        }&limit=${PRODUCTS_PER_PAGE}`
      );

      if (response.status === 200) {
        processProducts(response.data.products);
        setPage((prevPage) => prevPage + 1);
        setHasMore(response.data.products.length === PRODUCTS_PER_PAGE);
      }
    } catch (error) {
      console.error("Error loading more products:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  const filteredProducts = useMemo(() => {
    if (category === "All") return products;
    return products.filter(
      (p) => p.categoryName.toLowerCase() === category.toLowerCase()
    );
  }, [category, products]);

  const [categoryProductsCache, setCategoryProductsCache] = useState<
    Record<string, Product[]>
  >({});

  const handleCategoryChange = useCallback(
    async (selectedCategory: string) => {
      setCategory(selectedCategory);
      setProducts([]);
      setPage(1);
      setHasMore(true);
      setLoading(true);

      // If category data is already cached, use it
      if (categoryProductsCache[selectedCategory]) {
        setProducts(categoryProductsCache[selectedCategory]);
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/api/user/products?page=1&limit=${PRODUCTS_PER_PAGE}&category=${selectedCategory}`
        );

        if (response.status === 200) {
          processProducts(response.data.products);
          setCategoryProductsCache((prevCache) => ({
            ...prevCache,
            [selectedCategory]: response.data.products,
          }));
          setHasMore(response.data.products.length === PRODUCTS_PER_PAGE);
        }
      } catch (error) {
        console.error("Error fetching products for category:", error);
      } finally {
        setLoading(false);
      }
    },
    [categoryProductsCache]
  );

  if (loading) {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Our Products</h1>
          <Button variant="outline" size="sm" disabled>
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex flex-col space-y-3">
              <Skeleton className="h-[200px] w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background">
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold">Our Products</h1>

          {/* Mobile filter */}
          <div className="block md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Categories</SheetTitle>
                  <SheetDescription>
                    Filter products by category
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 flex flex-col gap-2">
                  <Button
                    variant={category === "All" ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => handleCategoryChange("All")}
                  >
                    All
                  </Button>
                  {categories.map((item) => (
                    <Button
                      key={item.name}
                      variant={category === item.name ? "default" : "outline"}
                      className="justify-start"
                      onClick={() => handleCategoryChange(item.name)}
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
            >
              {item.name}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                wishlist={wishlist}
                setWishlist={setWishlist}
              />
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <h1 className="text-2xl font-semibold text-foreground">
                No products found for this category
              </h1>
              <p className="mt-2 text-muted-foreground">
                Try selecting a different category
              </p>
            </div>
          )}
        </div>

        {/* Load More Button */}
        {hasMore && filteredProducts.length > 0 && (
          <div className="flex justify-center mt-8">
            <Button
              onClick={loadMoreProducts}
              variant="outline"
              size="lg"
              className="min-w-[200px] rounded-lg bg-none hover:bg-primary/60 hover:text-white"
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
  );
};

export default AllProducts;
