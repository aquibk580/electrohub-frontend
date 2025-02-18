import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ProductSkeleton from "@/components/product/Product-Skeleton";
import RelatedProducts from "@/components/product/RelatedProducts";
import FreeDeliveryIcon from "@/components/product/Free-Delivery-Icon";
import SpecialOffers from "@/components/product/Special-Offers";
import ProductSpects from "@/components/product/Product-Spects";
import ProductAddtocart from "@/components/product/Product-Addtocart";
import ProductQuantity from "@/components/product/Product-Quantity";
import ProductPrice from "@/components/product/Product-Price";
import ProductTitleRating from "@/components/product/Product-Title-Rating";
import axios from "axios";
import ProductImage from "@/components/product/Product-Image";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    image: string;
  };
  image: string[];
  rating: {
    rate: number;
    count: number;
  };
}

export default function Product() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0)

  const nextImage = () => {
    if (product) {
      setSelectedImage((prev) => (prev + 1) % product.image.length)
    }
  };

  const prevImage = () => {
    if (product) {
      setSelectedImage((prev) => (prev - 1 + product.image.length) % product.images.length) 
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.in/api/products/${id}`,
          {
            withCredentials: false, // Remove credentials
          }
        );

        setProduct({
          ...response.data.product,
          rating: { rate: 4.5, count: 120 }, // Adding mock rating since API doesn't provide it
        });
        console.log(response);
        setLoading(false);
        console.log(response.data);
        // Scroll to top when product loads
        window.scrollTo(0, 0);
      } catch (err) {
        setError("An error occurred while fetching the product.");
        setLoading(false);
        console.error("Error fetching product:", err);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <ProductSkeleton />;
  }

  if (error || !product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error || "Product not found"}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            {/* MAIN IMAGE  */}
            <ProductImage
              image={product.image.toString()}
              title={product.title}
              prevImage={prevImage}
              nextImage={nextImage}
            />
          </div>
          <div className="space-y-6">
            {/* PRODUCT TITLE, RATINGS STARS & BATCH */}
            <ProductTitleRating
              title={product.title}
              description={product.description}
              rating={product.rating}
            />

            <div className="space-y-4">
              {/* PRICE & DISCOUNT */}
              <ProductPrice price={product.price} />

              {/* FREE DELIVERY ICON */}
              <FreeDeliveryIcon />

              {/* SPECIAL OFFERS */}
              <SpecialOffers />

              {/* QUANTITY COMPONENT  +   - */}
              <ProductQuantity />

              {/* ADD TO CART, BUY NOW BUTTON & ADD TO WISHLIST BUTTON */}
              <ProductAddtocart />
            </div>
          </div>
        </div>

        {/* PRODUCT DETAILS, USER REVIEWS */}
        <ProductSpects />

        {/* RELATED PRODUCTS */}
        <RelatedProducts
          category={product.category.toString()}
          currentProductId={product.id}
        />
      </main>
    </div>
  );
}
