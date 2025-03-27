import { useEffect, useState } from "react";
import {
  Search,
  LayoutGrid,
  List,
  Filter,
  CalendarCheck,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Order, OrderItem } from "@/types/entityTypes";
import { assets } from "@/assets/assets";
import axios from "@/lib/axios";
import { formatDate } from "@/lib/utils";
import { formatPrice } from "@/utils/FormatPrice";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Array<Order>>([]);
  const [selectedTab, setSelectedTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  useEffect(() => {
    const getAllOrders = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/seller/orders`
        );
        if (response.status === 200) {
          setOrders(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };
    getAllOrders();
  }, []);

  const stats = [
    { label: "Total Orders", value: orders?.length },
    {
      label: "Order Items overtime",
      value: orders?.reduce((acc, order) => acc + order.orderItems.length, 0),
    },
    {
      label: "Returns",
      value: orders?.reduce(
        (acc, order) =>
          acc +
          order.orderItems.filter(
            (item: OrderItem) => item.status === "Returned"
          ).length,
        0
      ),
    },
    {
      label: "Fulfilled orders? overtime",
      value: orders?.reduce(
        (acc, order) =>
          acc +
          order.orderItems.filter(
            (item: OrderItem) => item.status === "Delivered"
          ).length,
        0
      ),
    },
  ];

  const filteredOrders =
    selectedTab === "All"
      ? orders?.flatMap((order) => order.orderItems)
      : orders?.flatMap((order) =>
          order.orderItems.filter(
            (item: OrderItem) => item.status === selectedTab
          )
        );
  const totalPages = Math.ceil(filteredOrders?.length / ordersPerPage);
  const paginatedOrders = filteredOrders?.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  return (
    <div className="space-y-5">
      <div className="bg-[#FFC444] border rounded-xl">
        <img
          className="w-full h-full object-cover animate__animated animate__fadeIn"
          src={assets.bannerdash}
          alt="Dashboard Banner"
          width={1200}
          height={300}
        />
      </div>

      <div className="border border-primary/30 bg-primary/5  dark:bg-gradient-to-br from-black via-primary/10 to-black rounded-xl p-4 space-y-4 animate__animated animate__fadeIn shadow-sm">
        <h2 className="text-2xl text-primary font-semibold">
          Orders
        </h2>

        <Card className="w-full lg:w-[95%] flex flex-nowrap gap-4 text-secondary-foreground bg-primary/10 border-primary shadow-none rounded-lg overflow-x-auto whitespace-nowrap scrollbar-x mx-auto">
          <div className="flex items-center pl-6 space-x-2 text-primary">
            <CalendarCheck className="w-6 h-6" />
            <span className="font-semibold text-lg">Today</span>
          </div>
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="p-3 px-4 pr-10 border-l-2 border-primary/50 min-w-[200px] flex flex-col"
            >
              <div className="text-sm  ">
                {stat.label}
              </div>
              <div className="text-xl font-semibold truncate text-primary">
                {stat.value}
              </div>
            </div>
          ))}
        </Card>

        <Tabs
          defaultValue="All"
          onValueChange={setSelectedTab}
          className="w-full lg:w-[85%]"
        >
          <div className="w-full overflow-x-auto scrollbar-x">
            <TabsList className="flex min-w-max items-center justify-start bg-transparent rounded-none overflow-y-hidden whitespace-nowrap">
              {[
                "All",
                "OrderConfirmed",
                "Shipped",
                "Delivered",
                "Cancelled",
                "Returned",
              ].map((item) => (
                <TabsTrigger
                  key={item}
                  className="px-4 py-2 border-b-8 text-sm w-[140px] rounded-none shadow-none border-transparent 
                    data-[state=active]:shadow-none data-[state=active]:bg-transparent hover:border-primary/20 
                    data-[state=active]:border-primary data-[state=active]:text-primary"
                  value={item}
                >
                  {item === "OrderConfirmed" ? "Confirmed" : item}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </Tabs>
      </div>

      <div className="space-y-3 border border-primary/30 bg-primary/5 dark:bg-gradient-to-br from-black via-primary/10 to-black  p-3 rounded-xl shadow-sm  animate__animated animate__fadeIn">
        <h2 className="text-xl pl-2 text-primary font-semibold">
          Orders Management
        </h2>
        <div className="flex flex-nowrap gap-2 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-secondary-foreground" />
            <Input
              placeholder="Search Order..."
              className="pl-8 bg-transparent border-primary/30 rounded-full transition-colors"
            />
          </div>

          <div className="flex gap-2">
            <Button className="bg-primary text-primary-foreground shadow-md border rounded-lg px-5 py-3 hover:bg-primary/50 flex items-center gap-2">
              <Filter size={24} />
              <span className="hidden sm:block font-medium">Filter</span>
            </Button>
          </div>
        </div>

        {paginatedOrders?.length === 0 ? (
          <h2 className="text-muted font-bold text-center text-xl p-16">
            No Orders!
          </h2>
        ) : (
          <Card className="p-2 md:p-4 border border-primary/30 rounded-xl  overflow-hidden">
            <div className="overflow-x-auto">
              <Table className="w-full">
                <TableHeader className="bg-primary  overflow-hidden">
                  <TableRow className="rounded-3xl border-none hover:bg-transparent">
                    <TableHead className="text-primary-foreground  font-semibold rounded-tl-lg rounded-bl-lg">
                      Order
                    </TableHead>
                    <TableHead className="text-primary-foreground  font-semibold">
                      Customer
                    </TableHead>
                    <TableHead className="text-primary-foreground  font-semibold">
                      Date
                    </TableHead>
                    <TableHead className="text-primary-foreground  font-semibold">
                      Total
                    </TableHead>
                    <TableHead className="text-primary-foreground  font-semibold">
                      Status
                    </TableHead>
                    <TableHead className="text-right text-primary-foreground  font-semibold rounded-br-lg rounded-tr-lg">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedOrders?.map((orderItem: OrderItem) => (
                    <TableRow
                      key={orderItem.id}
                      className="border-b h-[60px] hover:bg-primary/5"
                    >
                      <TableCell>
                        <div className="flex items-center gap-5">
                          <img
                            src={
                              orderItem.product.images[0].url ||
                              "/placeholder.svg"
                            }
                            alt="Product"
                            width={48}
                            height={48}
                            className="w-16"
                          />
                          <div className="text-sm w-56">
                            {orderItem.product.name}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="space-x-2 whitespace-nowrap">
                        <span className="p-1.5 border bg-primary/10 text-primary font-semibold rounded-full">
                        {
                            orders.find(
                              (order) => order.id === orderItem.orderId
                            )?.user.name.split(" ")
                            .map((letter: string) => letter[0])
                            .join("")
                            .toUpperCase()
                          }
                        </span>
                        <span>
                          {
                            orders.find(
                              (order) => order.id === orderItem.orderId
                            )?.user.name
                          }
                        </span>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        {formatDate(orderItem.createdAt)}
                      </TableCell>
                      <TableCell>
                        ₹
                        {formatPrice(
                          (orderItem.product.price -
                            (orderItem.product.price / 100) *
                              orderItem.product.offerPercentage) *
                            orderItem.quantity
                        )}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 text-[10px] font-medium rounded-md ${
                            orderItem.status === "Confirmed"
                              ? "bg-yellow-100 text-yellow-800"
                              : orderItem.status === "Shipped"
                              ? "bg-blue-100 text-blue-800"
                              : orderItem.status === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : orderItem.status === "Cancelled"
                              ? "bg-red-100 text-red-800"
                              : orderItem.status === "Returned"
                              ? "bg-gray-100 text-gray-800"
                              : "bg-gray-200 text-gray-800"
                          }`}
                        >
                          {orderItem.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          className="hover:bg-accent"
                          onClick={() =>
                            navigate(
                              `/seller/dashboard/orders/${orderItem.id}`,
                              {
                                state: {
                                  user: orders.find(
                                    (order) => order.id === orderItem.orderId
                                  )?.user,
                                  orderItem,
                                },
                              }
                            )
                          }
                        >
                          <ChevronRight />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        )}
      </div>

      <div className="flex p-2 items-center justify-between">
        <div className="flex whitespace-nowrap space-x-2 items-center">
          <label className="text-sm">Items per page</label>
          <Select>
            <SelectTrigger className="w-[70px]">
              <SelectValue placeholder="5" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="15">15</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      isActive={currentPage === page}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
}
