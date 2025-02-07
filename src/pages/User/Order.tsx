import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { assets } from "@/assets/assets";
import { useNavigate } from "react-router-dom";
import { FilterDropDown } from "@/components/User/OrderFilterDropDown";

export default function Orders() {
  const navigate = useNavigate();

  const orders = [
    {
      id: 1,
      name: "Samsung s24 ultra 64GB 256 GB",
      price: "$24",
      color: "Purple",
      status: "Delivered",
      date: "Jul 11, 2022",
      statusColor: "bg-green-500",
      orderMessage: "Your item is expected to arrive tomorrow",
    },
    {
      id: 2,
      name: "Samsung s24 ultra 64GB 256 GB",
      price: "$24",
      color: "Purple",
      status: "Cancelled",
      date: "Jul 12, 2022",
      statusColor: "bg-red-500",
      orderMessage: "Your item is expected to arrive tomorrow",
    },
    {
      id: 3,
      name: "Samsung s24 ultra 64GB 256 GB",
      price: "$24",
      color: "Purple",
      status: "Shipped",
      date: "Jul 11, 2022",
      statusColor: "bg-yellow-500",
      orderMessage: "Your item is expected to arrive tomorrow",
    },
    {
      id: 4,
      name: "Samsung s24 ultra 64GB 256 GB",
      price: "$24",
      color: "Purple",
      status: "Shipped",
      date: "Jul 11, 2022",
      statusColor: "bg-yellow-500",
      orderMessage: "Your item is expected to arrive tomorrow", 
    },
  ];

  return (
    <div className="flex flex-col h-full gap-6">
      <Card className="grid grid-cols-[1fr_auto] items-center p-[1.35rem] gap-4 rounded-lg shadow-md">
        <div className="flex items-center w-full">
          <Input
            placeholder="Search your orders here"
            className="w-full sm:w-auto flex-1 focus-visible:ring-0"
          />
          <Button className="flex items-center gap-2 w-fit bg-green-900 text-white rounded-r-md rounded-l-none ">
            <Search size={16} /> <span className="hidden sm:block">Search Orders</span>
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
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex items-center flex-wrap border-b p-4 gap-4 lg:gap-0 cursor-pointer"
                onClick={() => navigate(`/user/orders/${order.id}`)}
              >
                <img
                  src={assets.mobile}
                  alt="Product Image"
                  className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{order.name}</h3>
                  <p className="text-gray-600">{order.price}</p>
                  <p className="text-gray-500">Color: {order.color}</p>
                </div>
                <div className="flex flex-col items-start sm:items-center gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-3 h-3 rounded-full ${order.statusColor}`}
                    ></span>
                    <p className="text-sm font-medium">
                      {order.status} on {order.date}
                    </p>
                  </div>
                  <p>{order.orderMessage}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
