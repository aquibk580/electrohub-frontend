import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Loader2, Star } from "lucide-react";
import axios from "@/lib/axios";

interface Review {
  rating: number;
  content: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  offerPercentage: number;
  stock: number;
  categoryName: string;
  status: string;
  brand: string;
  productInfo: { brand: string; details: { key: string; value: string }[] };
  images: { id: number; url: string }[];
  reviews: Array<Review> | [];
  averageRating: number;
}
interface Category {
  name: string;
}

const AllProducts = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<string>("All");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, productsRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/api/categories`),
          axios.get(`${import.meta.env.VITE_API_URL}/api/user/products`),
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
          setFilteredProducts(productsWithRatings);
        }
      } catch (error: any) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (category === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter(
          (p) => p.categoryName.toLowerCase() === category.toLowerCase()
        )
      );
    }
  }, [category, products]);

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
          onClick={() => setCategory("All")}
          className={`px-2 py-1.5 cursor-pointer border rounded-full w-fit text-center ${
            category === "All" ? "bg-green-900 text-white" : ""
          }`}
        >
          All
        </li>
        {categories.map((item) => (
          <li
            onClick={() => setCategory(item.name)}
            className={`px-2 py-1.5 cursor-pointer border rounded-full w-fit text-center ${
              category === item.name ? "bg-green-900 text-white" : ""
            }`}
            key={item.name}
          >
            {item.name}
          </li>
        ))}
      </ul>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
         filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg overflow-hidden">
            <Link to={`/product/${product.id}`}>
              <div className="w-full bg-[#9797970f] p-2 rounded-lg overflow-hidden aspect-square">
                <img
                  src={product.images[0].url || "/placeholder.svg"}
                  alt={product.name}
                  className="object-contain w-full mix-blend-multiply h-full hover:scale-110 transition-transform duration-300"
                />
              </div>
            </Link>
            <div className="p-2">
              <Link to={`/product/${product.id}`}>
                <h2 className="text-lg font-semibold mb-1 group-hover:text-blue-600 transition-colors duration-300 ease-in-out line-clamp-1">
                  {product.name}
                </h2>
              </Link>
              <p className="text-gray-600 mb-2 text-sm line-clamp-1">
                {product.description}
              </p>
              <div className="flex">
                {[...Array(product.averageRating.toFixed(1))].map((_, i) => (
                  <Star
                    key={i}
                    className="fill-green-700 text-green-700 text-xs"
                    style={{ width: "14px", height: "14px" }}
                  />
                ))}
              </div>
              <div className="flex py-2 justify-between items-center flex-wrap-reverse">
                <button className="bg-white text-md font-medium border-black border px-3 py-1.5 hover:bg-green-900 hover:border-green-900 hover:text-white transition-all rounded-full">
                  Add to Cart
                </button>
                <span className="text-lg font-bold">₹{product.price}</span>
                {/* <span className="text-sm text-gray-500">{product.category}</span> */}
              </div>
            </div>
          </div>
        ))
        ): (
          <h1 className="text-2xl font-semibold">No products found for this category</h1>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
