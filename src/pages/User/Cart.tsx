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
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

interface OrderInput {
  total: number;
  items: Array<{ productId: number; quantity: number }>;
}

const Cart = () => {
  const navigate = useNavigate();
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
    <div className="flex flex-col xl:flex-row gap-4 h-full">
       <Helmet
              title="Cart | Electrohub"
              meta={[
                {
                  name: "description",
                  content: "Cart Products",
                },
              ]}
            />
      <Card className="flex flex-col overflow-hidden rounded-xl shadow-md w-full">
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
                      onClick={() => navigate(`/product/${item.id}`)}
                      src={item.images[0].url}
                      alt={item.name}
                      className="w-36 h-36 sm:w-32 sm:h-32 cursor-pointer md:w-44 md:h-44 object-cover rounded-lg"
                    />
                    <div  onClick={() => navigate(`/product/${item.id}`)} className="space-y-1  cursor-pointer">
                      <h3 className="font-medium cursor-pointer">{item.name}</h3>
                      <h3 className="font-medium text-gray-700 dark:text-gray-300 text-sm">Seller: {item.productInfo.brand}</h3>
                      <div className="text-xl font-semibold mt-1">
                        ₹ 
                        {formatPrice(
                          item.price - (item.price / 100) * item.offerPercentage
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border px-[2px] rounded-xl">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-[10px] hover:bg-red-200/90 dark:hover:bg-red-700/55"
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
                        className="w-12 text-center  font-semibold border-none shadow-none"
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
                        className="rounded-[10px] hover:bg-green-200/90 dark:hover:bg-green-700/55"
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
                      className="hover:bg-red-200/90 py-5 rounded-xl dark:hover:bg-red-900/30"
                      onClick={() => handleDelete(item.cartItemId)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col justify-center items-center h-full gap-1 text-center">
              <img src={assets.CartEmpty} className="h-36 object-contain" alt="Empty Cart" />
              <h1 className="font-semibold text-2xl text-gray-800 dark:text-white">
                Oops! Your Cart is Empty 🛒
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Looks like you haven’t added anything yet.
              </p>
              <Link
                to="/"
                className="bg-primary/80 hover:bg-primary/90 transition-all p-2 px-5 rounded-lg text-white font-semibold shadow-md"
              >
                Start Shopping
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
            <Separator className="my-2 border" />
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
            styles="w-full bg-primary hover:bg-primary text-primary-foreground text-sm rounded-lg"
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default Cart;
