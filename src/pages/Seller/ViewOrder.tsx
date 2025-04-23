import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MoveLeft, Package, UserIcon, Info } from "lucide-react";
import type { OrderItem, User } from "@/types/entityTypes";
import { formatDate } from "@/lib/utils";
import { formatPrice } from "@/utils/FormatPrice";
import { toast } from "react-toastify";
import axios from "@/lib/axios";
import { ViewOrderSkeleton } from "@/components/Seller/Skeletons";
import { Helmet } from "react-helmet-async";
import Mail from "@/lib/Mail";

const getStatusColor = (status: any) => {
  switch (status) {
    case "OrderConfirmed":
      return "bg-blue-100 text-blue-600";
    case "Shipped":
      return "bg-yellow-100 text-yellow-600";
    case "Delivered":
      return "bg-green-100 text-green-600";
    case "Cancelled":
      return "bg-red-100 text-red-600";
    case "Returned":
      return "bg-gray-100 text-gray-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const ViewOrder = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      {isLoading ? (
        <ViewOrderSkeleton />
      ) : (
        <Suspense fallback={<ViewOrderSkeleton />}>
          <MainViewOrder />
        </Suspense>
      )}
    </div>
  );
};

export default ViewOrder;

const MainViewOrder = () => {
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const user: User = location.state?.user;
  const [orderItem, setOrderItem] = useState<OrderItem>(
    location.state?.orderItem
  );
  const [showDesc, setshowDesc] = useState(false);

  useEffect(() => {
    const getOrderItem = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/seller/orders/${id}`
        );

        if (response.status === 200) {
          const updatedOrder = response.data;
          setOrderItem((prev) => ({ ...prev, status: updatedOrder.status }));
        }
      } catch (error: any) {
        console.log(error);
        toast.error(error.message, {
          position: "top-center",
          theme: "dark",
        });
      }
    };
    if (!orderItem) {
      getOrderItem();
    }
  }, [id, orderItem]);

  const handleOrderStatusUpdate = async (status: string) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/seller/orders/${orderItem.id}`,
        {
          status,
        }
      );
      if (response.status === 200) {
        setOrderItem((prev) => ({ ...prev, status }));
        toast.success("Order status updated", {
          position: "top-center",
          theme: "dark",
        });
        if (status === "Shipped") {
          await Mail.Shipped({
            order: response.data.order,
            user: response.data.user,
          });
        } else if (status === "Delivered") {
          await Mail.Delivered({
            order: response.data.order,
            user: response.data.user,
          });
        } else if (status === "Cancelled") {
          await Mail.Cancelled({
            order: response.data.order,
            user: response.data.user,
          });
        } else if (status === "Returned") {
          await Mail.Returned({
            order: response.data.order,
            user: response.data.user,
          });
        }
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message, {
        position: "top-center",
        theme: "dark",
      });
    }
  };

  if (!orderItem) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold text-foreground">
        Order not found! 😢
      </div>
    );
  }

  const handleShowDescription = () => {
    if (showDesc) {
      setshowDesc(false);
    } else {
      setshowDesc(true);
    }
  };

  return (
    <div className="space-y-4 ">
      <Helmet
        title={`Order Details - ${orderItem.product?.name || "Order"}`}
        meta={[
          {
            name: "description",
            content: `Order details for ${
              orderItem.product?.name || "an order"
            }`,
          },
          {
            property: "og:title",
            content: `Order Details - ${orderItem.product?.name || "Order"}`,
          },
          {
            property: "og:description",
            content: `Order details for ${
              orderItem.product?.name || "an order"
            }`,
          },
        ]}
      />

      {/* Header with back button and title */}
      <div className="flex items-center justify-between">
        <Button
          className="text-sm bg-transparent text-muted-foreground rounded-full hover:bg-accent shadow-none"
          onClick={() => navigate(-1)}
        >
          <MoveLeft className="mr-2 h-4 w-4" /> Back to Orders
        </Button>
        <div className="text-2xl font-semibold text-foreground">
          Order Details
        </div>
      </div>

      {/* Order ID and Status Banner */}
      <div className="flex items-center justify-between bg-primary/5  p-4 rounded-xl border border-primary/75">
        <div className="flex items-center space-x-2">
          <span className="text-primary font-medium">Order ID:</span>
          <span className="font-mono">{orderItem.id}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-accent-foreground/80">Status:</span>
          <span
            className={`${getStatusColor(
              orderItem.status
            )} px-3 py-1 rounded-full text-xs font-medium`}
          >
            {orderItem.status}
          </span>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 gap-4">
        {/* Product details card - takes 2 columns on large screens */}
        <div className="lg:flex grid-cols-1 space-y-4 lg:space-y-0  md:grid-cols-2 md:gap-4 ">
          {orderItem.product ? (
            <div className="lg:col-span-2 md:col-span-1 flex items-center bg-primary/5 dark:bg-gradient-to-br from-primary/10 via-black to-primary/10 rounded-xl border border-primary/75 overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col md:flex-row items-center lg:items-start gap-6">
                  {/* Product image */}
                  <Link
                    to={`product/${orderItem.id}`}
                    className="w-4/5 md:w-3/5 flex items-center  flex-row"
                  >
                    <img
                      src={orderItem.product.images[0].url}
                      alt={orderItem.product.name}
                      className="w-full h-auto object-cover rounded-lg"
                    />
                  </Link>

                  {/* Product info */}
                  <div className="w-full place-self-center space-y-2 md:space-y-4">
                    <h3 className="text-2xl font-semibold text-foreground">
                      {orderItem.product.name}
                    </h3>
                    <p
                      onClick={handleShowDescription}
                      className={`text-muted-foreground line-clamp-1 sm:line-clamp-2 md:line-clamp-3`}
                    >
                      {orderItem.product.description}
                    </p>

                    <div className="flex justify-between px-1 ">
                      <div className="flex items-center">
                        <span className="text-accent-foreground/80 mr-1">
                          Date:
                        </span>
                        <span className="font-medium whitespace-nowrap">
                          {formatDate(orderItem.createdAt)}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-accent-foreground/80 mr-1">
                          Price:
                        </span>
                        <span className="font-medium">
                          ₹{" "}
                          {formatPrice(
                            orderItem.product.price -
                              (orderItem.product.price / 100) *
                                orderItem.product.offerPercentage
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 bg-primary/5 border border-primary/75 rounded-xl text-muted-foreground italic">
              Product information not available
            </div>
          )}

          {/* Right sidebar with status update and customer info */}
          <div className="space-y-4 ">
            {/* Status update card */}
            {orderItem.product &&
            user &&
            !["Returned", "Delivered", "Cancelled"].includes(
              orderItem.status
            ) ? (
              <div className="bg-primary/5  dark:bg-gradient-to-br from-primary/10 via-black to-primary/10 rounded-xl border border-primary/75 p-6">
                <div className="flex items-center mb-4">
                  <Package className="h-6 w-6 mr-2 text-primary" />
                  <h3 className="text-xl whitespace-nowrap font-semibold">
                    Update Order Status
                  </h3>
                </div>
                <Select
                  onValueChange={(value) => handleOrderStatusUpdate(value)}
                  defaultValue={orderItem.status}
                >
                  <SelectTrigger className="w-full border-primary/40 bg-primary/20 rounded-xl px-4 py-2 mt-2">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl dark:border-primary/30">
                    <SelectItem className="rounded-lg" value="OrderConfirmed">
                      Confirmed
                    </SelectItem>
                    <SelectItem className="rounded-lg" value="Shipped">
                      Shipped
                    </SelectItem>
                    <SelectItem className="rounded-lg" value="Delivered">
                      Delivered
                    </SelectItem>
                    <SelectItem className="rounded-lg" value="Cancelled">
                      Cancelled
                    </SelectItem>
                    <SelectItem className="rounded-lg" value="Returned">
                      Returned
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <></>
            )}

            {/* Customer details card */}
            <div
              className={`${
                !user ||
                ["Returned", "Delivered", "Cancelled"].includes(
                  orderItem.status
                )
                  ? "h-full"
                  : ""
              } bg-primary/5 dark:bg-gradient-to-br from-primary/10 via-black to-primary/10 rounded-xl border border-primary/75 p-6`}
            >
              <div className="flex items-center mb-4">
                <UserIcon className="h-6 w-6 mr-2 text-primary" />
                <h3 className="text-xl whitespace-nowrap font-semibold">
                  Customer Details
                </h3>
              </div>
              {user ? (
                <div className="space-y-3">
                  <div className="flex">
                    <span className="font-medium min-w-[80px]">Name:</span>
                    <span className="text-accent-foreground/85">
                      {user.name}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="font-medium min-w-[80px]">Email:</span>
                    <span className="text-accent-foreground/85">
                      {user.email}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="font-medium min-w-[80px]">Phone:</span>
                    <span className="text-accent-foreground/85">
                      {user.phone}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="font-medium min-w-[80px]">Address:</span>
                    <span className="text-accent-foreground/85">
                      {user.address}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-muted-foreground italic">
                  User details not available
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Product specifications */}
        {orderItem.product ? (
          <div className="bg-primary/5 rounded-xl border border-primary/75 p-6">
            <div className="flex items-center mb-4">
              <Info className="h-6 w-6 mr-2 text-primary" />
              <h3 className="text-xl font-semibold">Product Specifications</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-3">
              {orderItem.product.productInfo.details.map((item) => (
                <div key={item.key} className="flex flex-col md:flex-row">
                  <span className="font-medium min-w-[120px]">{item.key}:</span>
                  <span className="text-accent-foreground/80">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-primary/5 rounded-xl border border-primary/75 p-6 text-muted-foreground italic">
            Product specifications not available
          </div>
        )}
      </div>
    </div>
  );
};
