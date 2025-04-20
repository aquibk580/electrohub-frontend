import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { useEffect, useState } from "react";
import ProductCard from "@/components/Home/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/entityTypes";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import axios from "@/lib/axios";
export default function CategoryPage() {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState("Filters");
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/api/user/products/relatedproducts/${categoryName}`
        );
        setProducts(response.data.products);
        setLoading(false);
      } catch (err) {
        setError("An error occurred while fetching related products.");
        setLoading(false);
        console.error("Error fetching related products:", err);
      }
    };

    if (categoryName) {
      fetchRelatedProducts();
    }
  }, [categoryName]);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!isAuthenticated) {
        setWishlist(new Set());
        return;
      }

      try {
        const wishlistRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/user/wishlist/wishlistproducts`
        );

        if (wishlistRes.status === 200) {
          setWishlist(new Set(wishlistRes.data.wishlist || []));
        } else {
          setWishlist(new Set());
        }
      } catch (err) {
        console.error("Error fetching wishlist:", err);
        setWishlist(new Set());
      }
    };

    fetchWishlist();
  }, [isAuthenticated]);

  // Sort products based on selected option
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "newest":
        return a.id > b.id ? -1 : 1;
      default:
        return a.id - b.id;
    }
  });

  // Render error state
  if (error) {
    return (
      <div className="container flex flex-col items-center justify-center min-h-[70vh] px-4 py-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Oops!</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-md">{error}</p>
        <Button className="mt-8" onClick={() => window.history.back()}>
          Go back
        </Button>
      </div>
    );
  }

  return (
    <div className="container px-4 pt-20 md:py-8 mx-auto">
       <Helmet
              title={categoryName}
              meta={[
                {
                  name: "description",
                  content: "Category Of Electrohub Products",
                },
              ]}
            />
      {/* Category Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="border-l-[6px] border-primary pl-6">
          <h1 className="text-3xl font-bold tracking-tight">{categoryName}</h1>
          <p className="text-accent-foreground/85 mt-1">
            Discover our collection of {categoryName?.toLowerCase()}
          </p>
        </div>

        <Select  value={sortOption} onValueChange={setSortOption}>
          <SelectTrigger className="w-[180px] rounded-xl border-gray-400">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="rounded-lg">
            <SelectItem className="rounded-lg" value="Filters">
              <span className="flex flex-row  items-center justify-center">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters
              </span>
            </SelectItem>
            <SelectItem className="rounded-lg" value="newest">Newest</SelectItem>
            <SelectItem className="rounded-lg" value="price-low">Price: Low to High</SelectItem>
            <SelectItem className="rounded-lg" value="price-high">Price: High to Low</SelectItem>
            <SelectItem className="rounded-lg" value="rating">Top Rated</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* Products Grid */}
      {loading ? (
        <ProductsLoadingSkeleton />
      ) : sortedProducts.length === 0 ? (
        
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No products found</h3>
          <p className="text-muted-foreground mt-2">
            We couldn't find any products in this category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 mt-8">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              wishlist={wishlist}
              setWishlist={setWishlist}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ProductsLoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="border rounded-lg overflow-hidden">
          <Skeleton className="h-[200px] w-full" />
          <div className="p-4">
            <Skeleton className="h-4 w-2/3 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-4" />
            <Skeleton className="h-6 w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
