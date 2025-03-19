import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2, MapPin, Minus, Phone, Plus, Trash2 } from "lucide-react";
import { assets } from "@/assets/assets";
import Checkout from "@/components/User/Checkout";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { toast } from "react-toastify";
import { Product } from "@/types/entityTypes";
import { formatPrice } from "@/utils/FormatPrice";
import { Separator } from "@radix-ui/react-select";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Link } from "react-router-dom";

interface OrderInput {
  total: number;
  items: Array<{ productId: number; quantity: number }>;
}

const Cart = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const [orderData, setOrderData] = useState<OrderInput>({
    total: 0,
    items: [],
  });
  const [isLoading, setIsLoading] = useState(true);
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
        console.warn(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getAllCartItems();
  }, []);

  useEffect(() => {
    const newTotal = cartItems.reduce(
      (acc, item) =>
        acc +
        (item.price - (item.price / 100) * item.offerPercentage) *
          item.quantity,
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
      <Card className="flex flex-col overflow-hidden rounded-lg shadow-md w-full">
        <CardContent className="p-6 flex flex-col h-full">
          <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
          <div className="space-y-6 overflow-y-auto flex-1">
            {isLoading ? (
              <div className="flex justify-center items-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : cartItems.length > 0 ? (
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
                        ₹
                        {formatPrice(
                          item.price - (item.price / 100) * item.offerPercentage
                        )}
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
              <div className="flex flex-col justify-center items-center h-full gap-2  ">
                <img src={assets.CartEmpty} className="h-44" alt="Empty_Cart" />
                <h1 className="font-semibold text-2xl">Your Cart is empty</h1>
                <Link
                  to="/"
                  className="bg-green-700 p-2 px-3 rounded-md text-white"
                >
                  Shop Now
                </Link>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="w-full xl:max-w-sm overflow-y-auto">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-3">
            {cartItems.length > 0 && (
              <div className="flex flex-col space-y-3">
                {cartItems.map((item) => (
                  <div className="flex justify-between">
                    <span>{item.productInfo.brand}</span>
                    <span>
                      ₹
                      {formatPrice(
                        item.price - (item.price / 100) * item.offerPercentage
                      )}
                    </span>
                  </div>
                ))}
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>₹{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>Delivery Charges</span>
              <span>Free</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between items-center font-bold text-lg">
              <span>Grand Total</span>
              <span>₹{formatPrice(total)}</span>
            </div>
          </div>

          <Separator className="my-6" />

          <img
            src={assets.paymentOptions}
            className="hidden xl:block"
            alt="Payment-Options"
          />

          <Separator className="my-6" />

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">Shipping Address</h3>
                <p className="text-sm text-muted-foreground">{user?.address}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-muted-foreground" />
              <div>
                <h3 className="font-semibold mb-1">Contact Number</h3>
                <p className="text-sm text-muted-foreground">
                  +91 {user?.phone}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Checkout
            orderData={orderData}
            flag="cart"
            text="Proceed to Checkout"
            styles="w-full bg-primary/80 hover:bg-primary text-primary-foreground text-sm"
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default Cart;
