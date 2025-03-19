import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Star,
  Edit2,
  Save,
  X,
  User,
  Calendar,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { mockData } from "@/data/mock-data";
import axios from "@/lib/axios";
import { Product } from "@/types/entityTypes";
import { formatDate } from "@/lib/utils";
import { formatPrice } from "@/utils/FormatPrice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductVariant {
  color: string;
  storage?: string;
  price: string;
  quantity: number;
}

interface ProductReview {
  rating: number;
  comment: string;
  userName: string;
  date: string;
}

interface ProductDetails {
  description: string;
  specifications: Record<string, string>;
  variants: ProductVariant[];
  reviews: ProductReview[];
  warranty: string;
  returnPolicy: string;
}

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProductData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/admin/products/${id}`
        );
        if (response.status === 200) {
          setProduct(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getProductData();
  }, [id]);
  const handleBackClick = () => {
    navigate("/admin/productmanage");
  };

  const handleProductStatusChange = async (newStatus: string) => {
    if (!product) return;
    setLoading(true);
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/admin/products/updateStatus/${
          product!.id
        }`,
        { status: newStatus }
      );
      if (response.status === 200) {
        setProduct((prev) => ({ ...prev!, status: newStatus }));
      }
    } catch (error) {
      console.error("Failed to update product status", error);
    } finally {
      setLoading(false);
    }
  };

  const getStockStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500";
      case "Inactive":
        return "bg-yello-500";
      case "OutOfStock":
        return "bg-red-500";
      case "Discontinued":
        return "bg-red-500";
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading Product Details...</p>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-6 space-y-6">
      <button
        onClick={handleBackClick}
        className="flex items-center gap-2 group text-primary hover:text-primary/60 w-fit transition-colors"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back to Products</span>
      </button>
      {/* Product Summary */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Product Details #{product?.id}</CardTitle>
          <div>
            <Select
              onValueChange={handleProductStatusChange}
              value={product?.status || ""}
            >
              <SelectTrigger className="py-5">
                <SelectValue placeholder="Select status">
                  {product?.status || "Select status"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="OutOfStock">Out Of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <img
                src={product?.images[0].url}
                alt={product?.name}
                className="w-32 h-32 rounded-lg object-cover"
              />
              <div className="space-y-2 flex-1">
                <h3 className="font-medium">{product!.name}</h3>

                <div className="flex items-center space-x-2">
                  <p className="text-lg font-semibold">
                    ₹{formatPrice(product!.price)}
                  </p>
                </div>
                <Badge
                  className={`${getStockStatusColor(
                    product!.status
                  )} text-white`}
                >
                  {product?.status}
                </Badge>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Inventory Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Stock</p>

                <p className="font-medium">{product?.stock}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Category</p>
                <p className="font-medium">{product?.categoryName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Discount</p>
                <p className="font-medium">{product?.offerPercentage}%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Brand</p>
                <p className="font-medium">{product?.productInfo.brand}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Product Specifications */}
      <Card>
        <CardHeader>
          <CardTitle>Product Specifications</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {product!.productInfo.details.map(({ key, value }) => (
            <div key={key} className="flex justify-between border-b py-2">
              <span className="font-medium">{key}</span>
              <span>{value as string}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Reviews */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {product!.reviews?.length > 0 ? (
              product?.reviews.map((review, index: number) => (
                <div key={index} className="border-b last:border-0 pb-4">
                  <div className="flex items-center space-x-2">
                    <User className="w-6 h-6" />
                    <span className="font-medium">{review.user.name}</span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1">{review.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(review.createdAt)}</span>
                  </div>
                  <p className="mt-2">{review.content}</p>
                </div>
              ))
            ) : (
              <h1>No reveiws yet!</h1>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductDetails;
