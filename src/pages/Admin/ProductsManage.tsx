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
    const searchParams = new URLSearchParams(location.search);
    const returnPage = searchParams.get("returnPage");
    if (returnPage) {
      navigate(`/admin/productmanage?page=${returnPage}`);
    } else {
      navigate("/admin/productmanage");
    }
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
      <Card className="border-primary/75 bg-primary/5 ">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl">Product Details #{product?.id}</CardTitle>
          <div>
            <Select
              onValueChange={handleProductStatusChange}
              value={product?.status || ""}
            >
              <SelectTrigger className="py-5 rounded-xl border-primary bg-primary/15">
                <SelectValue placeholder="Select status">
                  {product?.status || "Select status"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem className="rounded-lg" value="Active">Active</SelectItem>
                <SelectItem className="rounded-lg" value="Inactive">Inactive</SelectItem>
                <SelectItem className="rounded-lg" value="OutOfStock">Out Of Stock</SelectItem>
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
      <Card className="border-primary/75 bg-primary/5 ">
        <CardHeader>
          <CardTitle className="text-xl">Product Specifications</CardTitle>
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
      <Card className="border-primary/45 bg-primary/5 ">
        <CardHeader>
          <CardTitle className="text-xl">Customer Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {product!.reviews?.length > 0 ? (
              product?.reviews.map((review, index: number) => (
                <div key={index}
                // onClick={() => navigate(`/admin/buyer/${review.user.userId}`)} 
                 className="bg-primary/10  border  hover:border-primary px-6 py-4 rounded-xl  pb-4">
                  <div className="flex items-center justify-between space-x-2">
                    {/* <User className="w-6 h-6" /> */}
                   <div className="space-x-3">
                   <span className=" text-white  font-semibold bg-gradient-to-br from-primary to-blue-600 px-2.5 py-1.5  rounded-full ">{review.user.name[0]}</span>
                   <span className="font-semibold  hover:text-primary">{review.user.name}</span>
                   </div>
                    <div className="flex items-center space-x-1">
  {[...Array(5)].map((_, i) => {
    const starValue = i + 1;
    return (
      <Star
        key={i}
        className={`w-4 h-4 ${
          review.rating >= starValue
            ? "text-primary fill-current" // Full star
            : " dark:fill-current text-white fill-current " // Empty star
        }`}
      />
    );
  })}
  <span className="ml-2 text-accent-foreground text-xs">{review.rating.toFixed(1)}/5</span>
</div>

                  </div>
                 
                  <p className="mt-2 text-sm">{review.content}</p>

                  <div className="flex items-center space-x-2 text-xs text-accent-foreground/85 mt-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(review.createdAt)}</span>
                  </div>
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
