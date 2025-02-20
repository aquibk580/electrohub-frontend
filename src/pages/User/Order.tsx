import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FilterDropDown } from "@/components/User/OrderFilterDropDown";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "@/lib/axios";
import { Order } from "@/components/product/productTypes";
import { formatPrice } from "@/utils/FormatPrice";
import { formatDate } from "@/lib/utils";

export default function Orders() {
  const [orders, setOrders] = useState<Array<Order>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllOrders = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/user/orders`
        );
        if (response.status === 200) {
          setOrders(response.data);
        }
      } catch (error: any) {
        console.log(error);
        toast.error(error.message, {
          position: "top-center",
          theme: "dark",
        });
      } finally {
        setIsLoading(false);
      }
    };
    getAllOrders();
  }, []);

  const getOrderMessage = (status: string): string => {
    let result = "";
    switch (status) {
      case "OrderConfirmed":
        result = "Your Order has been Confirmed";
        break;
      case "Shopped":
        result = "Your Order has been Shipped";
        break;
      case "Delivered":
        result = "Your Order has been Delivered";
        break;
      case "Cancelled":
        result = "Your Order has been Cancelled";
        break;
      case "Returned":
        result = "Your Order has been Returned";
    }
    return result;
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <Card className="grid grid-cols-[1fr_auto] items-center p-[1.35rem] gap-4 rounded-lg shadow-md">
        <div className="flex items-center w-full">
          <Input
            placeholder="Search your orders here"
            className="w-full sm:w-auto flex-1 focus-visible:ring-0"
          />
          <Button className="flex items-center gap-2 w-fit bg-green-900 text-white rounded-r-md rounded-l-none ">
            <Search size={16} />{" "}
            <span className="hidden sm:block">Search Orders</span>
          </Button>
        </div>
        <FilterDropDown />
      </Card>

      <Card className="flex-1 flex flex-col overflow-hidden rounded-lg shadow-md">
        <CardHeader>
          <h1 className="font-semibold text-2xl">My Orders</h1>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto">
          <div className="space-y-4">
            {!isLoading ? (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="grid grid-cols-1 border-b p-4 gap-4 lg:gap-0 cursor-pointer"
                >
                  {order.orderItems.map((orderItem) => (
                    <div
                      className="flex flex-row flex-wrap justify-center sm:justify-start items-center gap-4 cursor-pointer"
                      onClick={() =>
                        navigate(`/user/orders/${orderItem.id}`, {
                          state: {
                            orderItem,
                          },
                        })
                      }
                    >
                      <img
                        src={orderItem.product.images[0].url}
                        alt="Product Image"
                        className="w-32 h-32 md:w-40 md:h-40 object-contain rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">
                          {orderItem.product.name.substring(0, 50)}
                        </h3>
                        <p className="text-black font-semibold text-base">
                          ₹
                          {formatPrice(
                            orderItem.product.price -
                              (orderItem.product.price / 100) *
                                orderItem.product.offerPercentage
                          )}
                        </p>
                        <p className="text-gray-500">
                          Quantity: {orderItem.quantity}
                        </p>
                        <p className="text-black font-semibold text-lg">
                          Total: ₹
                          {formatPrice(
                            orderItem.quantity *
                              (orderItem.product.price -
                                (orderItem.product.price / 100) *
                                  orderItem.product.offerPercentage)
                          )}
                        </p>
                      </div>
                      <div className="flex flex-col items-start sm:items-center gap-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-3 h-3 rounded-full ${
                              orderItem.status === "Delivered" && "bg-green-500"
                            } ${
                             ( orderItem.status === "Cancelled" ||
                              orderItem.status === "Returned") && "bg-red-500"
                            }  ${
                              orderItem.status === "Shipped" && "bg-yellow-500"
                            } ${
                              orderItem.status === "OrderConfirmed" &&
                              "bg-blue-500"
                            }`}
                          ></span>
                          <p className="text-sm font-medium">
                            {orderItem.status === "OrderConfirmed"
                              ? "Order Confirmed"
                              : orderItem.status}{" "}
                            on {formatDate(new Date(order.createdAt))}
                          </p>
                        </div>
                        <p>{getOrderMessage(orderItem.status)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
