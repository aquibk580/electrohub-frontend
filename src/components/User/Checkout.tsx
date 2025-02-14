import { useSelector } from "react-redux";
import axios from "../../lib/axios";
import { Button } from "../ui/button";
import { useState } from "react";
import { RootState } from "@/redux/store";

interface OrderInput {
  total: number;
  items: { productId: number; quantity: number }[];
}

const Checkout = ({ orderData }: { orderData: OrderInput }) => {
  const user = useSelector((state: RootState) => state.user.user);
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/order/place-order`,
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
            `${import.meta.env.VITE_API_URL}/api/user/order/verify-payment`,
            {
              ...response,
              orderData: data.orderData,
            }
          );

          if (verifyRes.data.success) {
            alert("Payment Successful!");
          } else {
            alert("Payment Verification Failed!");
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
    <div className="my-7 text-white">
      <Button
        className="w-full bg-green-800 hover:bg-green-700"
        onClick={handlePayment}
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Place Order"}
      </Button>
    </div>
  );
};

export default Checkout;
