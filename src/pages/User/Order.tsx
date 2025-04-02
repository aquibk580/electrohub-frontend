import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Package, Search, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FilterDropDown } from "@/components/User/OrderFilterDropDown";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import axios from "@/lib/axios";
import { Order } from "@/types/entityTypes";
import { formatPrice } from "@/utils/FormatPrice";
import { formatDate } from "@/lib/utils";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { useDebounce } from "@/hooks/use-debounce";

export default function Orders() {
  const [orders, setOrders] = useState<Array<Order>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [filters, setFilters] = useState<{
    status: string[];
    orderTime: string;
  }>({
    status: [],
    orderTime: "",
  });
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/user/auth/signin");
      return;
    }

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
  }, [isAuthenticated]);

  const filteredOrders = useMemo(() => {
    let result = orders.flatMap((order) => order.orderItems);

    if (debouncedSearchTerm) {
      result = result.filter((orderItem) =>
        orderItem.product.name
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase())
      );
    }

    if (filters.status.length > 0) {
      result = result.filter((orderItem) =>
        filters.status.includes(orderItem?.status)
      );
    }

    if (filters.orderTime) {
      result.sort((a, b) =>
        filters.orderTime === "Newest"
          ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    }

    return result;
  }, [orders, filters, debouncedSearchTerm]);

  const getOrderMessage = (status: string): string => {
    let result = "";
    switch (status) {
      case "OrderConfirmed":
        result = "Your Order has been Confirmed";
        break;
      case "Shipped":
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
    <div className="flex flex-col h-full gap-3">
      <Helmet>
        <title>My Orders - Electrohub</title>
        <meta
          name="description"
          content="View and manage your orders. track and return or cancel your orders"
        />
      </Helmet>
      <Card className="grid grid-cols-[1fr_auto] items-center p-[1.35rem] gap-4 rounded-xl shadow-md">
        <div className="flex items-center w-full">
          <Input
            placeholder="Search your orders here"
            className="w-full sm:w-auto flex-1 rounded-l-xl border-accent-foreground/45 focus-visible:ring-0"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button className="flex items-center gap-2 w-fit bg-primary/70 text-white rounded-r-xl rounded-l-none ">
            <Search size={16} />{" "}
          </Button>
        </div>
        <FilterDropDown onFilterChange={setFilters} />
      </Card>

      <Card className="flex-1 flex flex-col overflow-hidden rounded-xl shadow-md">
        <CardHeader>
          <h1 className="font-semibold text-2xl">My Orders</h1>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto">
          <div className="space-y-4">
            {!isLoading ? (
              filteredOrders.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 lg:gap-8 cursor-pointer">
                  {filteredOrders.map((orderItem) => (
                    <div
                      key={orderItem.id} // Adding key for performance
                      className="flex flex-row flex-wrap justify-center sm:justify-start items-center gap-4 cursor-pointer border-b border-gray-300 py-4"
                      onClick={() =>
                        navigate(`/user/orders/${orderItem.id}`, {
                          state: { orderItem },
                        })
                      }
                    >
                      <img
                        src={orderItem.product.images[0].url}
                        alt="Product Image"
                        className="w-32 h-32 md:w-40 md:h-40 object-contain rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="text-sm md:text-lg font-semibold">
                          {orderItem.product.name.substring(0, 50)}
                        </h3>
                        <p className="text-black dark:text-slate-200 font-semibold text-base">
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
                        <p className="text-black dark:text-slate-200 font-semibold text-lg">
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
                              (orderItem.status === "Cancelled" ||
                                orderItem.status === "Returned") &&
                              "bg-red-500"
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
                            on {formatDate(new Date(orderItem.createdAt))}
                          </p>
                        </div>
                        <p>{getOrderMessage(orderItem.status)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // No Orders Found
                <div className="flex flex-col items-center justify-center text-center py-20">
                  <ShoppingBag className="h-16 w-16  mb-3" />

                  <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
                    No Orders Yet
                  </h2>

                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                    You haven’t placed any orders yet. Start shopping now!
                  </p>

                  <Button
                    onClick={() => navigate("/")}
                    className="mt-4 px-6 py-3 bg-primary hover:bg-primary/90 transition-all text-white font-bold rounded-lg shadow-md"
                  >
                    Browse Products
                  </Button>
                </div>
              )
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
