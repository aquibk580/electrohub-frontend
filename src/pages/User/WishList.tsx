import { ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { assets } from "@/assets/assets";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function Wishlist() {
  const wishlistItems = [
    {
      id: 1,
      name: "Samsung S24 Ultra 64GB 256GB Storage Purple",
      price: "$24",
      image: assets.mobile,
      inStock: true,
    },
    {
      id: 2,
      name: "Samsung S24 Ultra 64GB 256GB Storage Purple",
      price: "$24",
      image: assets.mobile,
      inStock: true,
    },
    {
      id: 3,
      name: "Samsung S24 Ultra 64GB 256GB Storage Purple",
      price: "$24",
      image: assets.mobile,
      inStock: true,
    },
    {
      id: 4,
      name: "Samsung S24 Ultra 64GB 256GB Storage Purple",
      price: "$24",
      image: assets.mobile,
      inStock: true,
    },
    {
      id: 5,
      name: "Samsung S24 Ultra 64GB 256GB Storage Purple",
      price: "$24",
      image: assets.mobile,
      inStock: true,
    },
  ];

  return (
    <Card className="h-full flex flex-col rounded-lg shadow-md">
      <CardHeader>
        <div className="flex items-center gap-4 mb-6">
          <img
            src={assets.wishList || "/placeholder.svg"}
            alt="Wishlist Icon"
            className="w-16 h-16"
          />
          <h1 className="text-2xl font-bold">Your Wishlist</h1>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto">
        <div className="space-y-4">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center gap-4 p-4 border rounded-lg bg-gray-50 shadow-sm"
            >
              {/* Product Image */}
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg"
              />

              {/* Product Details */}
              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-medium text-lg mb-1">{item.name}</h3>
                <div className="text-lg font-bold text-gray-800">
                  {item.price}
                </div>
                <div
                  className={`text-sm font-medium ${
                    item.inStock ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {item.inStock ? "In Stock" : "Out of Stock"}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  className="p-2 hover:bg-green-100"
                  aria-label="Add to Cart"
                >
                  <ShoppingCart className="h-5 w-5 text-green-600" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="p-2 hover:bg-red-100"
                  aria-label="Remove from Wishlist"
                >
                  <Trash2 className="h-5 w-5 text-red-600" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
