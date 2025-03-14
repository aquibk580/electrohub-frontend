import { useState, useEffect, useCallback, useMemo } from "react";
import { Loader2 } from "lucide-react";
import { Category, Product } from "../product/productTypes";
import axios from "@/lib/axios";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const PRODUCTS_PER_PAGE = 16;

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
          axios.get(`${import.meta.env.VITE_API_URL}/api/categories`),
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
    if (category === "All") return products
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
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="sm:px-5 md:px-10 py-8 bg-background">
      <h1 className="text-3xl font-bold mb-6 text-center sm:text-left text-foreground">
        Our Products
      </h1>
      {/* Categories List */}
      <ul className="mt-2 flex p-2 gap-2 justify-center sm:justify-start flex-wrap">
        <li
          onClick={() => handleCategoryChange("All")}
          className={`px-3 py-1.5 cursor-pointer border border-border rounded-full w-fit text-center transition-colors duration-200 ${
            category === "All" 
              ? "bg-primary text-primary-foreground" 
              : "hover:bg-accent/10 text-foreground"
          }`}
        >
          All
        </li>
        {categories.map((item) => (
          <li
            onClick={() => handleCategoryChange(item.name)}
            className={`px-2 py-1.5 cursor-pointer border rounded-full w-fit text-center hover:bg-accent ${
              category === item.name
                ? "bg-primary  text-primary-foreground"
                : ""
            }`}
            key={item.name}
          >
            {item.name}
          </li>
        ))}
      </ul>
  
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
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
      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMoreProducts}
            className={`px-5 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md transition-colors duration-200 ${
              loadingMore ? "opacity-70 cursor-not-allowed" : ""
            }`}
            disabled={loadingMore}
          >
            {loadingMore ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></span>
                Loading...
              </span>
            ) : (
              "Load More"
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
