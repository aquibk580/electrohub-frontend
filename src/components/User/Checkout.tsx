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

interface CheckoutProps {
  orderData: OrderInput;
  styles: string;
  text: string;
  flag: string;
}

const Checkout = ({ orderData, styles, text, flag }: CheckoutProps) => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handlePayment = async () => {
    if (!user?.address || !user?.phone) {
      toast.warn("Address and contact details are required", {
        position: "top-center",
        theme: "dark",
      });
      navigate("/user/profile");
      return;
    }
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
          setIsVerifying(true);
          try {
            const verifyRes = await axios.post(
              `${import.meta.env.VITE_API_URL}/api/user/orders/verify-payment`,
              {
                ...response,
                orderData: data.orderData,
                flag,
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
          } catch (error) {
            toast.error("Error verifying payment!", {
              position: "top-center",
              theme: "dark",
            });
          } finally {
            setIsVerifying(false);
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
      className={styles}
      onClick={handlePayment}
      disabled={isLoading || isVerifying}
    >
      {isLoading
        ? "Processing..."
        : isVerifying
        ? "Verifying Payment..."
        : text}
    </Button>
  );
};

export default Checkout;
