import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import type { Product } from "../../types/entityTypes";
import { Button } from "@/components/ui/button";
import ProductCard from "../Home/ProductCard";
import { RelatedProductsSkeleton } from "./productSkeletons";

const RelatedProducts = ({
  category,
  currentProductId,
  wishlist,
  setWishlist,
}: {
  category: string;
  currentProductId: number;
  wishlist: Set<number>;
  setWishlist: Dispatch<SetStateAction<Set<number>>>;
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/api/user/products/relatedproducts/${category}`
        );
        const allProducts = response.data.products;
        const relatedProducts = allProducts
          .filter(
            (product: Product) =>
              product.categoryName === category &&
              product.id !== currentProductId
          )
          .slice(0, 8); // Increased to 8 for better carousel experience
        setProducts(relatedProducts);
        setLoading(false);
      } catch (err) {
        setError("An error occurred while fetching related products.");
        setLoading(false);
        console.error("Error fetching related products:", err);
      }
    };

    if (category) {
      fetchRelatedProducts();
    }
  }, [category, currentProductId]);

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      // Scroll by the width of one product card (280px) plus gap (16px)
      const scrollAmount = direction === "left" ? -390 : 390;

      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (loading) {
    return (
      <div className="w-full py-8">
        <RelatedProductsSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Similar Products</h2>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: {error}
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="w-full py-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Similar Products</h2>
        <p className="text-muted-foreground">No similar products found.</p>
      </div>
    );
  }

  return (
    <div className="w-full py-4 relative overflow-x-hidden ">
      <div className="relative mb-6">
        <h2 className="text-2xl md:text-3xl font-bold ">Similar Products</h2>
      </div>

      <div
        ref={carouselRef}
        className="flex  overflow-x-auto gap-4 pb-4 snap-start snap-mandatory scrollbar-hide"
      >
        <Button
          variant="outline"
          size="icon"
          onClick={() => scrollCarousel("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 border-none rounded-r-xl bg-background/30 backdrop-blur-sm  hover:bg-background/80 shadow-md h-16 w-10"
          aria-label="Scroll left"
        >
          <ChevronLeft className="  text-black dark:text-white" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => scrollCarousel("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 border-none rounded-l-xl bg-background/30 backdrop-blur-sm hover:bg-background/80 shadow-md h-16 w-10"
          aria-label="Scroll right"
        >
          <ChevronRight className=" text-black dark:text-white" />
        </Button>
        {products.map((product) => (
          <div
            key={product.id}
            className="flex-shrink-0 lg:w-1/4 md:w-2/4 sm:w-5/6 w-7/12 snap-start"
          >
            <ProductCard
              product={product}
              wishlist={wishlist}
              setWishlist={setWishlist}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
