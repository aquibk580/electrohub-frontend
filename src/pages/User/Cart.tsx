import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2 } from "lucide-react";
import { assets } from "@/assets/assets";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  inStock: boolean;
}

const Cart = () => {
  const cartItems: Array<CartItem> = [
    {
      id: 1,
      name: "Samsung s24 ultra 64GB 256 GB Storage Purple",
      price: 24,
      quantity: 1,
      inStock: true,
    },
    {
      id: 2,
      name: "Samsung s24 ultra 64GB 256 GB Storage Purple",
      price: 24,
      quantity: 1,
      inStock: true,
    },
    {
      id: 3,
      name: "Samsung s24 ultra 64GB 256 GB Storage Purple",
      price: 24,
      quantity: 1,
      inStock: true,
    },
    {
      id: 4,
      name: "Samsung s24 ultra 64GB 256 GB Storage Purple",
      price: 24,
      quantity: 1,
      inStock: true,
    },
    {
      id: 5,
      name: "Samsung s24 ultra 64GB 256 GB Storage Purple",
      price: 24,
      quantity: 1,
      inStock: true,
    },
    {
      id: 6,
      name: "Samsung s24 ultra 64GB 256 GB Storage Purple",
      price: 24,
      quantity: 1,
      inStock: true,
    },
  ];
  // const cartItems: Array<CartItem> = [];

  return (
    <div className="flex flex-col xl:flex-row gap-6 h-full">
      <Card className="flex-1 flex flex-col overflow-hidden rounded-lg shadow-md">
        <CardContent className="p-6 flex flex-col h-full">
          <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
          <div className="space-y-6 overflow-y-auto flex-1">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center justify-between border-b pb-4 gap-4"
                >
                  <div className="flex flex-col sm:flex-row items-center">
                    <img
                      src={assets.mobile}
                      alt={item.name}
                      className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain rounded-lg"
                    />
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <div className="text-xl mt-1">${item.price}</div>
                      {item.inStock && (
                        <div className="text-green-600 text-sm">In Stock</div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border rounded">
                      <Button variant="ghost" size="sm">
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        value={item.quantity}
                        className="w-12 text-center border-0"
                        onChange={() => {}}
                      />
                      <Button variant="ghost" size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col justify-center items-center h-full">
                <img src={assets.CartEmpty} alt="Empty_Cart" />
                <h1 className="font-semibold text-2xl">Your Cart is empty</h1>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="w-full lg:w-auto shrink-0">
        <CardContent className="p-6 ">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between  w-full lg:space-x-40">
              <span>SubTotal</span>
              <span>$234</span>
            </div>
            <div className="flex justify-between text-red-500">
              <span>Discount</span>
              <span>-$20</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>Delivery Charges</span>
              <span>+$5</span>
            </div>
            <div className="flex justify-between items-center font-bold text-lg py-2 px-1 border-t bg-gray-100 rounded-md">
              <span>Grand Total</span>
              <span>$214</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Cart;
