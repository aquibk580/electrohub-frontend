import { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { Loader2, Star } from "lucide-react";
import { Category, Review, Product } from "../product/productTypes";
import axios from "@/lib/axios";
import ProductCard from "./ProductCard";

const AllProducts = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<string>("All");
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, productsRes, wishlistRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/api/categories`),
          axios.get(`${import.meta.env.VITE_API_URL}/api/user/products`),
          axios.get(
            `${import.meta.env.VITE_API_URL}/api/user/wishlist/wishlistproducts`
          ),
        ]);

        if (categoriesRes.status === 200) setCategories(categoriesRes.data);
        if (productsRes.status === 200) {
          const productsWithRatings = productsRes.data.products.map(
            (product: Product) => {
              const totalRating =
                product?.reviews?.length > 0
                  ? product.reviews.reduce(
                      (acc, review) => acc + review.rating,
                      0
                    )
                  : 0;
              const averageRating =
                product.reviews.length > 0
                  ? totalRating / product.reviews.length
                  : 0;
              return { ...product, averageRating };
            }
          );
          setProducts(productsWithRatings);
        }
        if (wishlistRes.status === 200)
          setWishlist(new Set(wishlistRes.data.wishlist || []));
      } catch (error: any) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = useMemo(() => {
    if (category === "All") {
      return products;
    }
    return products.filter(
      (p) => p.categoryName.toLowerCase() === category.toLowerCase()
    );
  }, [category, products]);

  const handleCategoryChange = useCallback((category: string) => {
    setCategory(category);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="sm:px-5 md:px-10 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center sm:text-left">
        Our Products
      </h1>
      {/* Categories List */}
      <ul className="mt-2 flex p-2 gap-2 justify-center sm:justify-start flex-wrap">
        <li
          onClick={() => handleCategoryChange("All")}
          className={`px-2 py-1.5 cursor-pointer border rounded-full w-fit text-center ${
            category === "All" ? "bg-green-900 text-white" : ""
          }`}
        >
          All
        </li>
        {categories.map((item) => (
          <li
            onClick={() => handleCategoryChange(item.name)}
            className={`px-2 py-1.5 cursor-pointer border rounded-full w-fit text-center ${
              category === item.name ? "bg-green-900 text-white" : ""
            }`}
            key={item.name}
          >
            {item.name}
          </li>
        ))}
      </ul>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              product={product}
              wishlist={wishlist}
              setWishlist={setWishlist}
            />
          ))
        ) : (
          <h1 className="text-2xl font-semibold">
            No products found for this category
          </h1>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
