import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useMediaQuery } from "react-responsive";

import ProductSkeleton from "@/components/product/Product-Skeleton";
import RelatedProducts from "@/components/product/RelatedProducts";
import FreeDeliveryIcon from "@/components/product/Free-Delivery-Icon";
import SpecialOffers from "@/components/product/Special-Offers";
import ProductSpects from "@/components/product/Product-Spects";
import ProductAddtocart from "@/components/product/Product-Addtocart";
import ProductPrice from "@/components/product/Product-Price";
import ProductTitleRating from "@/components/product/Product-Title-Rating";
import ProductImage from "@/components/product/Product-Image";
import ProductImageTablet from "@/components/product/Product-Image-Tablet";
import { Product } from "@/components/product/productTypes";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Button } from "@/components/ui/button";

export default function ProductPage() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [product, setProduct] = useState<Product>(location.state?.product);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState<Set<number>>(
    location.state?.wishlist
  );
  const [error, setError] = useState<string | null>(null);

  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/user/products/${id}`
        );
        if (response.status === 200) {
          setProduct(response.data);
        }

        window.scrollTo(0, 0);
      } catch (err) {
        setError("An error occurred while fetching the product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (isAuthenticated) {
        const wishlistRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/user/wishlist/wishlistproducts`
        );

        if (wishlistRes.status === 200) {
          setWishlist(new Set(wishlistRes.data.wishlist || []));
        } else [setWishlist(new Set())];
      } else {
        setWishlist(new Set());
      }
    };
    fetchWishlist();
  }, [isAuthenticated]);

  // if (loading) {
  //   return <ProductSkeleton />;
  // }

  const getAverageProductRating = (): number => {
    const totalRating = product?.reviews?.reduce(
      (acc, review) => acc + review.rating,
      0
    );
    return product?.reviews?.length > 0
      ? totalRating / product.reviews.length
      : 0;
  };

  if (error || !product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error || "Product not found"}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="  px-4 py-8 ">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            {/* Product Image - Different for Tablets */}
            {isTablet ? (
              <ProductImageTablet
                images={product.images.map((image) => image.url)}
                title={product.name}
              />
            ) : (
              <ProductImage
                images={product.images.map((image) => image.url)}
                title={product.name}
              />
            )}
          </div>
          <div className="space-y-6">
            {/* Product Details */}
            <ProductTitleRating
              title={product.name}
              description={product.description}
              reviews={product.reviews}
              averageRating={
                !product.averageRating
                  ? getAverageProductRating()
                  : product.averageRating
              }
            />

            <div className="space-y-4">
              <ProductPrice
                price={product.price}
                offer={product.offerPercentage}
              />
              <FreeDeliveryIcon />
              <SpecialOffers />
              {isAuthenticated ? (
                <ProductAddtocart
                  id={product.id}
                  wishlist={wishlist}
                  setWishlist={setWishlist}
                  total={
                    product.price -
                    (product.price / 100) * product.offerPercentage
                  }
                />
              ) : (
                <Button onClick={() => navigate("/user/auth/signin")}>
                  Login to Purchase
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Product Specifications and Related Products */}
        <ProductSpects
          reviews={product.reviews}
          details={product.productInfo.details}
          loading={loading}
        />
        <RelatedProducts
          category={product.categoryName}
          currentProductId={product.id}
        />
      </main>
    </div>
  );
}
