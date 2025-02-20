import { useSelector } from "react-redux";
import axios from "../../lib/axios";
import { Button } from "../ui/button";
import { useState } from "react";
import { RootState } from "@/redux/store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface OrderInput {
  total: number;
  items: { productId: number; quantity: number }[];
}

const Checkout = ({ orderData }: { orderData: OrderInput }) => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    if (orderData.total <= 0) {
      toast.warn("Your cart is empty", {
        position: "top-center",
        theme: "dark",
      });
      return;
    }
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/orders/place-order`,
        orderData
      );

      const options: any = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID!,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Electrohub",
        description: "Order Payment",
        order_id: data.order.id,
        handler: async function (response: any) {
          const verifyRes = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/user/orders/verify-payment`,
            {
              ...response,
              orderData: data.orderData,
            }
          );

          if (verifyRes.data.success) {
            toast.success("Order Placed Successfully", {
              position: "top-center",
              theme: "dark",
            });
            navigate("/user/orders");
          } else {
            toast.error("Payment Verification Failed!", {
              position: "top-center",
              theme: "dark",
            });
          }
        },
        prefill: {
          name: user?.name,
          email: user?.email,
          contact: user?.phone,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razor = new (window as any).Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Error in processing payment");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      className="w-full bg-green-800 hover:bg-green-700"
      onClick={handlePayment}
      disabled={isLoading}
    >
      {isLoading ? "Processing..." : "Proceed to Checkout"}
    </Button>
  );
};

export default Checkout;
