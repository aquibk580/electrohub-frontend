import axios from "axios";
import { Star } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Product {
  description: ReactNode;
  id: number;
  title: string;
  price?: number;
  category: string;
  image: string;
  rating: number;
}

const RelatedProducts = ({
  category,
  currentProductId,
}: {
  category: string;
  currentProductId: number;
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await axios.get(
          "https://fakestoreapi.in/api/products",
          {
            withCredentials: false,
          }
        );
        const allProducts = response.data.products;
        const relatedProducts = allProducts
          .filter(
            (product: Product) =>
              product.category === category && product.id !== currentProductId
          )
          .slice(0, 4);
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

  if (loading) {
    return <div>Loading related products...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
      {products.map((product) => (
        <div key={product.id} className=" bg-accent rounded-lg overflow-hidden">
          <Link to={`/product/${product.id}`}>
            <div className="w-full p-2 rounded-lg overflow-hidden aspect-square">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                className="object-contain w-full  h-full hover:scale-110 transition-transform duration-300 rounded-3xl"
              />
            </div>
          </Link>
          <div className="p-2">
            <Link to={`/product/${product.id}`}>
              <h2 className="text-lg font-semibold mb-1 group-hover:text-blue-600 transition-colors duration-300 ease-in-out line-clamp-1">
                {product.title}
              </h2>
            </Link>
            <p className="text-accent-foreground mb-2 text-sm line-clamp-1">
              {product.description}
            </p>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="fill-primary text-primary text-xs"
                  style={{ width: "14px", height: "14px" }}
                />
              ))}
            </div>
            <div className="flex py-2 justify-between items-center">
              <span className="text-lg font-bold">
                ₹{product.price ? product.price.toFixed(2) : "N/A"}
              </span>
              {/* <span className="text-sm text-gray-500">{product.category}</span> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RelatedProducts;
