import { useState, useEffect, useMemo } from "react";
import type { Category, Product } from "../../types/entityTypes";
import axios from "@/lib/axios";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import DealsBanner from "./DealsBanner";
import { Separator } from "@radix-ui/react-separator";
import { DealsBannerSkeleton } from "./Skeletons/HomeSkeletons";
import ElectrohubOffers from "./Discount-Offers";
import DiscountOffersSkeleton from "./Skeletons/Offer-Skeleton";
import AllProducts from "./AllProducts";

const PRODUCTS_PER_PAGE = 12;

const MasterProduct = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState<string>("All");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
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

  const loadMoreProducts = async (nextPage: number) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/api/user/products?page=${nextPage}&limit=${PRODUCTS_PER_PAGE}`
      );

      if (response.status === 200) {
        processProducts(response.data.products);
        setPage(nextPage);
        setHasMore(response.data.products.length === PRODUCTS_PER_PAGE);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error loading more products:", error);
      return false;
    }
  };

  const fetchProductsByCategory = async (selectedCategory: string) => {
    try {
      setLoading(true);
      setProducts([]);
      setPage(1);

      const url =
        selectedCategory === "All"
          ? `${
              import.meta.env.VITE_API_URL
            }/api/user/products?page=1&limit=${PRODUCTS_PER_PAGE}`
          : `${
              import.meta.env.VITE_API_URL
            }/api/user/products?page=1&limit=${PRODUCTS_PER_PAGE}&category=${selectedCategory}`;

      const response = await axios.get(url);

      if (response.status === 200) {
        const processedProducts = response.data.products.map(
          (product: Product) => {
            const totalRating = product?.reviews?.reduce(
              (acc, review) => acc + review.rating,
              0
            );
            const averageRating =
              product.reviews.length > 0
                ? totalRating / product.reviews.length
                : 0;
            return { ...product, averageRating };
          }
        );

        setProducts(processedProducts);
        setHasMore(response.data.products.length === PRODUCTS_PER_PAGE);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error fetching products for category:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const bestProducts = useMemo(() => {
    if (!products || products.length === 0) return [];

    const shuffled = [...products].sort(() => 0.5 - Math.random());

    return shuffled.slice(0, 5);
  }, [products]);

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
        <DealsBannerSkeleton />
        <DiscountOffersSkeleton />
      </div>
    );
  }

  return (
    <>
      {/* Our Products */}
      <AllProducts
        products={products}
        categories={categories}
        wishlist={wishlist}
        setWishlist={setWishlist}
        onLoadMore={loadMoreProducts}
        onCategoryChange={fetchProductsByCategory}
        hasMore={hasMore}
        currentPage={page}
        category={category}
        setCategory={setCategory}
      />
      <Separator className="border" />
      {/* Top Deals */}

      <DealsBanner products={bestProducts} />

      <Separator className="border" />
      {/* Top Offers */}

      <ElectrohubOffers products={products} />
    </>
  );
};

export default MasterProduct;
