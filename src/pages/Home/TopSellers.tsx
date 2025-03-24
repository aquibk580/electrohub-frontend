import type React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Package, Star, ShoppingCart, Loader2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { Seller, Product } from "@/types/entityTypes";
import { formatPrice } from "@/utils/FormatPrice";
import { Helmet } from "react-helmet-async";

const TopSellerPage: React.FC = () => {
  const { sellerId } = useParams();
  const [seller, setSeller] = useState<Seller | null>(null);
  const [averageRating, setAverageRating] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSellerData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/user/sellers/${sellerId}`
        );
        if (response.status === 200) {
          setSeller(response.data.seller);
          setAverageRating(response.data.averageRating);
          setTotalSales(response.data.totalSales);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getSellerData();
  }, []);

  const getAverageProductRating = (product: Product): number => {
    if (!product || !product.reviews) return 0;

    const totalRating = product.reviews.reduce(
      (acc, review) => acc + review.rating,
      0
    );
    return product.reviews.length > 0
      ? totalRating / product.reviews.length
      : 0;
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading seller details...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
              <title>{seller?.name || "Seller"}</title>
            </Helmet>
      <Card className="p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="relative">
            <img
              src={seller?.pfp || "/placeholder.svg"}
              alt={seller?.name}
              className="w-32 h-32 rounded-full object-contain border-4 border-primary/20"
            />
            <Badge className="absolute bottom-0 right-0 px-2 py-1">
              Top Seller
            </Badge>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h1 className="text-3xl font-bold">{seller?.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <Package className="w-5 h-5 text-muted-foreground" />
              <span className="text-lg text-muted-foreground">
                {seller?.products.length} Products
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <span className="text-lg">{averageRating} Average Rating</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <ShoppingCart className="w-5 h-5 text-muted-foreground" />
              <span className="text-lg text-muted-foreground">
                {totalSales} Total Sales
              </span>
            </div>
          </div>
        </div>
      </Card>

      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Products</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 cursor-pointer">
        {seller!.products.length > 0 ? (
          seller?.products.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.images[0].url || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-48 object-contain"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">
                      ₹
                      {formatPrice(
                        product.price -
                          (product.offerPercentage / 100) * product.price
                      )}
                    </span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                      <span>{getAverageProductRating(product)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </Card>
          ))
        ) : (
          <h1 className="font-bold text-2xl">No Products Available</h1>
        )}
      </div>
    </div>
  );
};

export default TopSellerPage;
