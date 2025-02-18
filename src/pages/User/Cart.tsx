import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2 } from "lucide-react";
import { assets } from "@/assets/assets";
import Checkout from "@/components/User/Checkout";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { toast } from "react-toastify";
import { Product } from "@/components/product/productTypes";

interface OrderInput {
  total: number;
  items: Array<{ productId: number; quantity: number }>;
}

const Cart = () => {
  const [orderData, setOrderData] = useState<OrderInput>({
    total: 0,
    items: [],
  });
  const [total, setTotal] = useState(0);
  const [cartItems, setCartItems] = useState<
    Array<Product & { cartItemId: number; quantity: number }>
  >([]);

  useEffect(() => {
    const getAllCartItems = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/user/cart`
        );
        if (response.status === 200) {
          setCartItems(response.data?.products);
        }
      } catch (error: any) {
        toast.error(error.message, {
          position: "top-center",
          theme: "dark",
        });
      }
    };

    getAllCartItems();
  }, []);

  useEffect(() => {
    const newTotal = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(newTotal);
  }, [cartItems]);

  useEffect(() => {
    setOrderData({
      total: total,
      items: cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    });
  }, [total]);

  const handleQuantityChange = async (
    cartItemId: number,
    newQuantity: number
  ) => {
    try {
      if (newQuantity < 1) return;

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/user/cart/update/${cartItemId}`,
        { quantity: newQuantity }
      );

      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    } catch (error: any) {
      toast.error(error.message, {
        position: "top-center",
        theme: "dark",
      });
    }
  };

  const handleDelete = async (cartItemId: number) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/user/cart/remove/${cartItemId}`
      );

      setCartItems(cartItems.filter((item) => item.cartItemId !== cartItemId));
    } catch (error: any) {
      toast.error(error.message, {
        position: "top-center",
        theme: "dark",
      });
    }
  };

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
                  <div className="flex flex-col sm:flex-row sm:gap-6 items-center">
                    <img
                      src={item.images[0].url}
                      alt={item.name}
                      className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-cover rounded-lg"
                    />
                    <div className="space-y-4">
                      <h3 className="font-medium">{item.name}</h3>
                      <h3 className="font-medium">{item.productInfo.brand}</h3>
                      <div className="text-xl font-semibold mt-1">
                        ₹{item.price}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border rounded">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const newQuantity =
                            item.quantity > 1 ? item.quantity - 1 : 1; // Prevent going below 1
                          handleQuantityChange(item.cartItemId, newQuantity);
                        }}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>

                      <Input
                        type="number"
                        value={item.quantity}
                        className="w-12 text-center border-0"
                        onChange={(e) => {
                          const newQuantity = parseInt(e.target.value, 10);
                          if (newQuantity > 0) {
                            handleQuantityChange(item.cartItemId, newQuantity);
                          }
                        }}
                      />

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const newQuantity = item.quantity + 1;
                          handleQuantityChange(item.cartItemId, newQuantity);
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(item.cartItemId)}
                    >
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
        <CardContent className="p-6 flex flex-col w-full">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-3 w-full lg:w-64">
            <div className="flex justify-between">
              <span>SubTotal</span>
              <span>₹{total}</span>
            </div>
            <div className="flex justify-between text-red-500 ">
              <span>Discount</span>
              <span>-₹20</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>Delivery Charges</span>
              <span>+₹20</span>
            </div>
            <div className="flex justify-between items-center font-bold text-lg py-2 px-1 border-t bg-gray-100 rounded-md">
              <span>Grand Total</span>
              <span>₹{total}</span>
            </div>
          </div>
          <Checkout orderData={orderData} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Cart;
