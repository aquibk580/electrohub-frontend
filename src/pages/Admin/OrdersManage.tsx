import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Check, Package, Star, Truck, X } from "lucide-react";
import type { OrderItem, User } from "@/types/entityTypes";
import axios from "@/lib/axios";
import { formatPrice } from "@/utils/FormatPrice";
import { cn, formatDate } from "@/lib/utils";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { DetailPageSkeleton } from "@/components/Admin/Skeletons";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [orderItem, setOrderItem] = useState<
    | (OrderItem & {
        user: User;
        sellerAverageRating: number;
        totalSellerOrders: number;
      })
    | null
  >(null);

  useEffect(() => {
    const getOrdersData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/admin/orders/${id}`
        );
        if (response.status === 200) {
          setOrderItem(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getOrdersData();
  }, [id]);

  const handleBackClick = () => {
    const searchParams = new URLSearchParams(location.search);
    const returnPage = searchParams.get("returnPage");
    if (returnPage) {
      navigate(`/admin/ordersmanage?page=${returnPage}`);
    } else {
      navigate("/admin/ordersmanage");
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      OrderConfiremed: "bg-green-500",
      Shipped: "bg-blue-500",
      Delivered: "bg-green-500",
      Cancelled: "bg-red-500",
      Returned: "bg-gray-500",
    };
    return colors[status as keyof typeof colors] || "bg-gray-500";
  };

  const timelineSteps = useMemo(() => {
    if (!orderItem) return [];

    const steps = [
      {
        id: "OrderConfirmed",
        label: "Order Placed",
        icon: <Check className="w-5 h-5" />,
        isCompleted: true,
        date: formatDate(orderItem!.createdAt),
      },
      {
        id: "Shipped",
        label: "Shipped",
        icon: <Truck className="w-5 h-5" />,
        isCompleted: ["Shipped", "Delivered", "Cancelled", "Returned"].includes(
          orderItem?.status || ""
        ),
        date: ["Shipped", "Delivered", "Cancelled", "Returned"].includes(
          orderItem?.status || ""
        )
          ? formatDate(orderItem!.updatedAt)
          : null,
      },
      {
        id: "Delivered",
        label: "Delivered",
        icon: <Check className="w-5 h-5" />,
        isCompleted: ["Delivered", "Returned"].includes(
          orderItem?.status || ""
        ),
        date: ["Delivered", "Returned"].includes(orderItem?.status || "")
          ? formatDate(orderItem!.updatedAt)
          : null,
      },
    ];

    // Add Cancelled or Returned status if applicable
    if (orderItem?.status === "Cancelled") {
      steps.push({
        id: "Cancelled",
        label: "Cancelled",
        icon: <X className="w-5 h-5" />,
        date: formatDate(orderItem.updatedAt),
        isCompleted: true,
      });
      return steps.filter((step) => step.id !== "Delivered");
    } else if (orderItem?.status === "Returned") {
      steps.push({
        id: "Returned",
        label: "Returned",
        icon: <Package className="w-5 h-5" />,
        date: formatDate(orderItem.updatedAt),
        isCompleted: true,
      });
    }

    return steps;
  }, [orderItem]);

  if (loading) {
    return <DetailPageSkeleton type="order" />;
  }

  return (
    <div className="w-full px-4 py-6 space-y-6">
      <Helmet
        title={orderItem?.product?.name || "Order"}
        meta={[
          {
            name: "description",
            content: "Order Management",
          },
        ]}
      />
      <button
        onClick={handleBackClick}
        className="flex items-center gap-2 group text-primary hover:text-primary/60 w-fit transition-colors"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back to Orders</span>
      </button>

      {/* Order Summary */}
      <Card className="border-primary/75 bg-primary/5 dark:bg-gradient-to-br from-primary/10 via-black to-primary/5">
        <CardHeader>
          <CardTitle>Order Details #{orderItem?.id}</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              {orderItem?.product ? (
                <img
                  src={orderItem?.product?.images[0]?.url}
                  alt={orderItem?.product?.name}
                  className="w-32 h-32 rounded-lg object-cover"
                />
              ) : (
                <div className="w-24 h-24 md:w-20 md:h-20 flex items-center justify-center bg-gray-200 dark:bg-gray-800 rounded-lg text-center text-xs text-gray-600 dark:text-gray-400">
                  N/A
                </div>
              )}

              <div>
                {orderItem?.product ? (
                  <>
                    <h3 className="font-medium">{orderItem?.product?.name}</h3>
                    <p className="text-base text-muted-foreground">
                      {"₹" +
                        formatPrice(
                          orderItem!.product.price -
                            (orderItem!.product.offerPercentage / 100) *
                              orderItem!.product.price
                        )}
                    </p>
                  </>
                ) : (
                  <h1>Product not available</h1>
                )}
                <Badge
                  className={`${getStatusColor(
                    orderItem!.status
                  )} text-white mt-2`}
                >
                  {orderItem?.status}
                </Badge>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Seller Information</h3>
            <div className="flex items-center space-x-2">
              <span>{orderItem?.product?.seller?.name}</span>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="ml-1">{orderItem?.sellerAverageRating || 0}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Total Orders: {orderItem?.totalSellerOrders}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col w-full h-full gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
          <Card className="lg:col-span-1 border-primary/75 bg-primary/5 dark:bg-gradient-to-br from-primary/10 via-black to-primary/5 w-full h-full">
            <CardHeader>
              <CardTitle>Order Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {/* Vertical line connecting timeline steps */}
                <div className="absolute left-[22px] top-6 bottom-6 w-[2px] bg-muted-foreground/20" />

                {timelineSteps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative pl-12 pb-8 last:pb-0"
                  >
                    {/* Timeline dot/icon */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                      className={cn(
                        "absolute left-0 w-11 h-11 rounded-full flex items-center justify-center z-10",
                        step.isCompleted
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {step.icon}
                    </motion.div>

                    {/* Timeline content */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <h4
                          className={cn(
                            "font-medium text-base",
                            step.isCompleted
                              ? "text-foreground"
                              : "text-muted-foreground"
                          )}
                        >
                          {step.label}
                        </h4>
                        <span className="text-sm text-muted-foreground">
                          {step.date}
                        </span>
                      </div>

                      {/* Progress indicator */}
                      {step.isCompleted && (
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{
                            delay: index * 0.1 + 0.3,
                            duration: 0.5,
                          }}
                          className="h-1 bg-primary rounded-full mt-2"
                        />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="lg:col-span-2 w-full">
            <Card className="h-full border-primary/75 bg-primary/5 dark:bg-gradient-to-br from-primary/10 via-black to-primary/5">
              <CardHeader>
                <CardTitle>Shipping Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="font-medium">{orderItem?.user?.name}</p>
                <p>{orderItem?.user?.address}</p>
                <p>{orderItem?.user?.phone}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
