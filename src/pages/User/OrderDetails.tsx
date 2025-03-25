import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import OrderProgress from "@/components/User/ProgressBar";
import { useLocation, useParams } from "react-router-dom";
import { OrderItem } from "@/types/entityTypes";
import { formatPrice } from "@/utils/FormatPrice";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toast } from "react-toastify";
import axios from "@/lib/axios";
import ReviewForm from "@/components/User/ReviewForm";
import { Helmet } from "react-helmet-async";

const OrderDetails = () => {
  const { id } = useParams();
  const user = useSelector((state: RootState) => state.user.user);
  const location = useLocation();
  const [orderItem, setOrderItem] = useState<OrderItem>(
    location.state?.orderItem
  );

  useEffect(() => {
    const getAllOrders = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/user/orders/${id}`
        );
        if (response.status === 200) {
          setOrderItem(response.data);
        }
      } catch (error: any) {
        console.log(error);
        toast.error(error.message, {
          position: "top-center",
          theme: "dark",
        });
      }
    };
    getAllOrders();
  }, []);
  const steps: Array<{ title: string; description: string }> = [
    { title: "Order Confirmed", description: "Your order has been placed" },
    { title: "Shipped", description: "Your order has been shipped" },
    {
      title: "Out for Delivery",
      description: "Your order is out for delivery",
    },
    { title: "Delivered", description: "Your order has been delivered" },
  ];

  const getorderTrackingSteps = (
    orderItem: OrderItem
  ): {
    steps: Array<{ title: string; description: string }>;
    step: number;
    date: Date;
  } => {
    let result: {
      steps: Array<{ title: string; description: string }>;
      step: number;
      date: Date;
    };
    switch (orderItem.status) {
      case "OrderConfirmed":
        result = {
          steps,
          step: 0,
          date: orderItem.createdAt || new Date(),
        };
        break;
      case "Shipped":
        result = {
          steps,
          step: 1,
          date: orderItem.updatedAt || new Date(),
        };
        break;
      case "Delivered":
        result = {
          steps,
          step: 3,
          date: orderItem.updatedAt || new Date(),
        };
        break;
      case "Cancelled":
        result = {
          steps: [
            {
              title: "Order Confirmed",
              description: "Your order has been placed",
            },
            {
              title: "Order Cancelled",
              description: "Your Order has been Cancelled",
            },
          ],
          step: 1,
          date: orderItem.updatedAt || new Date(),
        };
        break;
      case "Returned":
        result = {
          steps: steps,
          step: 4,
          date: orderItem.updatedAt || new Date(),
        };
        result.steps.push({
          title: "Order Returned",
          description: "Your Order has been Returned",
        });
        break;
      default:
        result = {
          steps,
          step: 0,
          date: orderItem.updatedAt || new Date(),
        };
    }

    return result;
  };

  const handleOrderStatusUpdate = async (status: string) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/user/orders/${orderItem.id}`,
        { status: status }
      );
      if (response.status === 200) {
        setOrderItem((prev) => ({ ...prev, status }));
        toast.success("Order status updated", {
          position: "top-center",
          theme: "dark",
        });
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message, {
        position: "top-center",
        theme: "dark",
      });
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6 ">
      <Helmet>
        <title>Order- {orderItem.product.name.substring(0, 100) + "..."}</title>
        <meta
          name="description"
          content="View detailed information about your order, including tracking, items purchased, and estimated delivery time."
        />
      </Helmet>

      {/* Order Details */}
      <Card className="max-h-screen overflow-y-auto">
        <CardContent className="pt-6 grid grid-cols-2">
          <div>
            <h2 className="text-base md:text-lg font-semibold mb-4">
              {orderItem.product.name.substring(0, 100) + "..."}
            </h2>

            <div className="text-sm mb-4">
              Seller: {orderItem.product.seller.name}
            </div>
            <div className="text-xl font-bold mb-6">
              ₹
              {formatPrice(
                orderItem.product.price -
                (orderItem.product.price / 100) *
                orderItem.product.offerPercentage
              )}
            </div>
          </div>
          <img
            src={orderItem.product.images[0].url}
            alt=""
            className="object-contain w-52 xl:place-self-end"
          />
        </CardContent>
        <CardFooter className="grid grid-rows-1 gap-4 border-t border-border pt-4">
          <OrderProgress trackingSteps={getorderTrackingSteps(orderItem)} />
          {orderItem.status === "Delivered" && (
            <div className="flex flex-col gap-4">
              <ReviewForm productId={orderItem.productId} />
              <Button
                variant="outline"
                className="bg-background text-foreground hover:bg-destructive/10 hover:text-destructive border border-input transition-colors"
                onClick={() => handleOrderStatusUpdate("Returned")}
              >
                Return Order
              </Button>
            </div>
          )}
          {(orderItem.status === "OrderConfirmed" ||
            orderItem.status === "Shipped") && (
              <Button
                variant="outline"
                className="bg-background text-foreground hover:bg-destructive/10 hover:text-destructive border border-input transition-colors"
                onClick={() => handleOrderStatusUpdate("Cancelled")}
              >
                Cancel Order
              </Button>
            )}
        </CardFooter>
      </Card>

      {/* Right Column */}
      <div className="space-y-6">
        {/* Shipping Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Shipping Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="font-medium">{user?.name}</p>
              <p>{user?.address}</p>
              <p className="mt-4">Phone number: {user?.phone}</p>
            </div>
          </CardContent>
        </Card>

        {/* Price Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Price Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Quantity</span>
                <span>{orderItem.quantity}</span>
              </div>
              <div className="flex justify-between">
                <span>List Price</span>
                <span className="line-through text-gray-500">
                  ₹{orderItem.product.price}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Selling Price</span>
                <span>
                  ₹
                  {formatPrice(
                    orderItem.product.price -
                    (orderItem.product.price / 100) *
                    orderItem.product.offerPercentage
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span className="text-green-500">Free</span>
              </div>
              <div className="flex justify-between pt-3 border-t font-semibold">
                <span>Total Amount</span>
                <span>
                  ₹
                  {formatPrice(
                    (orderItem.product.price -
                      (orderItem.product.price / 100) *
                      orderItem.product.offerPercentage) *
                    orderItem.quantity
                  )}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderDetails;
