import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MoveLeft } from "lucide-react";
import { OrderItem, User } from "@/types/entityTypes";
import { formatDate } from "@/lib/utils";
import { formatPrice } from "@/utils/FormatPrice";
import { toast } from "react-toastify";
import axios from "@/lib/axios";

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
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const user: User = location.state?.user;
  const [orderItem, setOrderItem] = useState<OrderItem>(
    location.state?.orderItem
  );

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
  }, [id]);

  const handleOrderStatusUpdate = async (status: string) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/seller/orders/${orderItem.id}`,
        { status }
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

  if (!orderItem) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold text-foreground">
        Order not found! 😢
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Button
        className="text-sm bg-transparent text-muted-foreground rounded-full hover:bg-accent shadow-none"
        onClick={() => navigate(-1)}
      >
        <MoveLeft /> Back to Orders
      </Button>

      <div className="space-y-3">
        <div>
          <div className="text-2xl font-semibold text-foreground">
            Order Details
          </div>
        </div>

        <div className="space-y-4 w-full">
          <div className="flex flex-col lg:flex-row gap-2 lg:items-center border border-primary/50 bg-primary/5 dark:bg-gradient-to-br from-black via-primary/10 to-black   p-3 md:p-1 rounded-xl shadow-sm">
            <Link to={`product/${orderItem.id}`}>
              <p className="text-primary ml-2 mt-1 text-sm">
                Order ID: {orderItem.id}
              </p>
              <img
                src={orderItem.product.images[0].url}
                alt="Product"
                className="w-full lg:w-48 object-cover"
              />
            </Link>
            <div className="flex-1 p-3 space-y-2">
              <h3 className="text-xl font-semibold text-foreground">
                {orderItem.product.name}
              </h3>
              <p className="text-foreground text-sm">
                {orderItem.product.description}
              </p>
              <label
                className={`${getStatusColor(
                  orderItem.status
                )} text-xs p-1 px-3 rounded-md`}
              >
                {orderItem.status}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 mt-2">
                <p className="text-sm">
                  <strong>Date:</strong> {formatDate(orderItem.createdAt)}
                </p>
                <p className="text-sm">
                  <strong>Total:</strong>{" "}
                  {formatPrice(
                    orderItem.product.price -
                    (orderItem.product.price / 100) *
                    orderItem.product.offerPercentage
                  )}
                </p>
              </div>
            </div>
            <div className="w-full lg:w-[400px] p-4 md:p-6">
              <h3 className="text-md font-semibold ">
                Update Order Status
              </h3>
              <Select
                onValueChange={(value) => handleOrderStatusUpdate(value)}
                defaultValue={orderItem.status}
              >
                <SelectTrigger className="w-full border-primary/40  bg-primary/20 rounded-xl px-4 py-2 mt-2">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent className="rounded-xl dark:border-primary/30">
                  <SelectItem className="rounded-lg" value="OrderConfirmed">Confirmed</SelectItem>
                  <SelectItem className="rounded-lg" value="Shipped">Shipped</SelectItem>
                  <SelectItem className="rounded-lg" value="Delivered">Delivered</SelectItem>
                  <SelectItem className="rounded-lg" value="Cancelled">Cancelled</SelectItem>
                  <SelectItem className="rounded-lg" value="Returned">Returned</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 md:p-6 rounded-xl border-primary/50 border bg-primary/5 dark:bg-gradient-to-br from-black via-primary/10 to-black   shadow-sm">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Customer Details
              </h3>
              {user ? (
                <div className="space-y-2 text-muted-foreground text-[15px]">
                  <p>
                    <strong>Name:</strong> {user.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {user.phone}
                  </p>
                  <p>
                    <strong>Address:</strong> {user.address}
                  </p>
                </div>
              ) : (<h1 className="text-xl">User Details not available</h1>)}
            </div>

            <div className="p-4 md:p-6 rounded-xl border border-primary/50 bg-primary/5 dark:bg-gradient-to-br from-black via-primary/10 to-black   shadow-sm">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Product Details
              </h3>
              <div className="space-y-2 text-muted-foreground text-[15px]">
                {orderItem.product.productInfo.details.map((item) => (
                  <p key={item.key}>
                    <strong>{item.key}</strong> : {item.value}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrder;
