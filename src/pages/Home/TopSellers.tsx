import type React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Package, Star, ShoppingCart, Loader2, BadgeCheck, CheckCircle } from "lucide-react";
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
    <div className="container mx-auto px-4 py-4">
      <Card className="p-8 mb-10  rounded-xl relative overflow-hidden">
        <div className="absolute "></div>
        <div className="relative flex flex-col md:flex-row items-center gap-8">
          <div className="relative">
            <img
              src={seller?.pfp || "/placeholder.svg"}
              alt={seller?.name}
              className="w-40 h-40 rounded-full object-cover border-4 border-primary p-1 shadow-xl hover:scale-110 transition-transform"
            />
            <Badge className="absolute bottom-1 left-5 px-3 py-1 bg-green-500 text-white flex items-center gap-1 shadow-md text-sm font-semibold">
              <CheckCircle className="w-5 h-5" /> Top Seller
            </Badge>
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-5xl font-extrabold drop-shadow-md">{seller?.name}</h1>
            <p className="text-lg mt-2 font-medium opacity-90">Premium Quality & Express Delivery</p>
            <div className="flex items-center gap-6 mt-6">
              <div className="flex items-center gap-3 bg-white border  p-2 rounded-xl ">
                <Package className="w-7 h-7 text-yellow-300" />
                <span className="text-xl font-bold">{seller?.products.length} Products</span>
              </div>
              <div className="flex items-center gap-3 bg-white border p-2 rounded-xl">
                <Star className="w-7 h-7 text-yellow-400" />
                <span className="text-xl font-bold">{averageRating} Avg Rating</span>
              </div>
              <div className="flex items-center gap-3 bg-white border p-2 rounded-xl">
                <ShoppingCart className="w-7 h-7 text-green-300" />
                <span className="text-xl font-bold">{totalSales} Sales</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
<hr />
      <div className="mb-6 mt-3 px-1">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">All Products</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 cursor-pointer px-2">
        {seller!.products.length > 0 ? (
          seller?.products.map((product) => (
            <Card key={product.id} className="border-none shadow-none overflow-hidden">
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.images[0].url || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full bg-muted rounded-xl object-contain"
                />
                <div className="p-2">
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
