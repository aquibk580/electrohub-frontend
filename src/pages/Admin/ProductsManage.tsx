import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Star, Edit2, Save, X, User, Calendar, ArrowLeft } from "lucide-react";
import { mockData } from "@/data/mock-data";

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

interface Product {
  id: string;
  image: string;
  title: string;
  seller: string;
  price: string;
  quantity: number;
  category: string;
  status: string;
  details: ProductDetails;
}

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation()
  const [product, setProduct] = useState<Product | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState<Product | null>(null);

  const breadcrumbs = [
    { href: "/admin/productmanage", label: "Products Management" },
    { href: "#", label: "Product Details" },
  ];

  useEffect(() => {
    if (id) {
      console.log(id)
      const foundProduct = mockData.products.find((p) => p.id === id);
      if (foundProduct) {
        setProduct(foundProduct as Product);
        setEditedProduct(foundProduct as Product);
      }
    }
  }, [id]);
  const handleBackClick = () => {
    const searchParams = new URLSearchParams(location.search);
    const returnPage = searchParams.get('returnPage');
    if (returnPage) {
      navigate(`/admin/productsmanage?page=${returnPage}`);
    } else {
      navigate('/admin/ordersmanage');
    }
  };

  if (!product) return null;

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setProduct(editedProduct);
    setIsEditing(false);
    // Here you would typically make an API call to update the product
  };

  const handleCancel = () => {
    setEditedProduct(product);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    if (editedProduct) {
      setEditedProduct({ ...editedProduct, [field]: value });
    }
  };

  const getStockStatusColor = (status: string) => {
    return status === "In Stock" ? "bg-green-500" : "bg-red-500";
  };

  return (
    <div className="w-full px-4 py-6 space-y-6">
      <button
        onClick={handleBackClick}
        className="flex items-center gap-2 group text-primary hover:text-primary/60 w-fit transition-colors"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back to Orders</span>
      </button>
      {/* Product Summary */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Product Details #{product.id}</CardTitle>
          <div className="flex space-x-2">
            {isEditing ? (
              <>
                <Button onClick={handleSave} size="sm" className="flex items-center">
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button onClick={handleCancel} variant="outline" size="sm" className="flex items-center">
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </>
            ) : (
              <Button onClick={handleEdit} size="sm" className="flex items-center">
                <Edit2 className="w-4 h-4 mr-2" />
                Edit
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <img
                src={product.image}
                alt={product.title}
                className="w-32 h-32 rounded-lg object-cover"
              />
              <div className="space-y-2 flex-1">
                {isEditing && editedProduct ? (
                  <Input
                    value={editedProduct.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="font-medium"
                  />
                ) : (
                  <h3 className="font-medium">{product.title}</h3>
                )}
                <div className="flex items-center space-x-2">
                  {isEditing && editedProduct ? (
                    <Input
                      value={editedProduct.price}
                      onChange={(e) => handleInputChange("price", e.target.value)}
                      className="w-32"
                    />
                  ) : (
                    <p className="text-lg font-semibold">{product.price}</p>
                  )}
                </div>
                <Badge
                  className={`${getStockStatusColor(product.status)} text-white`}
                >
                  {product.status}
                </Badge>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Inventory Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Quantity</p>
                {isEditing && editedProduct ? (
                  <Input
                    type="number"
                    value={editedProduct.quantity}
                    onChange={(e) => handleInputChange("quantity", e.target.value)}
                    className="w-32"
                  />
                ) : (
                  <p className="font-medium">{product.quantity}</p>
                )}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Category</p>
                <p className="font-medium">{product.category}</p>
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
          {Object.entries(product.details.specifications).map(([key, value]) => (
            <div key={key} className="flex justify-between border-b py-2">
              <span className="font-medium">{key}</span>
              <span>{value as string}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Product Variants */}
      <Card>
        <CardHeader>
          <CardTitle>Product Variants</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.details.variants.map((variant: ProductVariant, index: number) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Color</span>
                      <span>{variant.color}</span>
                    </div>
                    {variant.storage && (
                      <div className="flex justify-between">
                        <span>Storage</span>
                        <span>{variant.storage}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Price</span>
                      <span>{variant.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Quantity</span>
                      <span>{variant.quantity}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Reviews */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {product.details.reviews.map((review: ProductReview, index: number) => (
              <div key={index} className="border-b last:border-0 pb-4">
                <div className="flex items-center space-x-2">
                  <User className="w-6 h-6" />
                  <span className="font-medium">{review.userName}</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1">{review.rating}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
                  <Calendar className="w-4 h-4" />
                  <span>{review.date}</span>
                </div>
                <p className="mt-2">{review.comment}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Additional Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Warranty Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{product.details.warranty}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Return Policy</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{product.details.returnPolicy}</p>
          </CardContent>
        </Card>
      </div>
    </div>

  );
};

export default ProductDetails;