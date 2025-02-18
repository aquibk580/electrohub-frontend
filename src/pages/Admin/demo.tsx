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
import { assets } from "@/assets/assets";
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useState,
} from "react";
import Sidebar from "./Sidebar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { SelectorWrapper } from "@/components/Admin/table-wrapper";

import { AppSidebar } from "@/components/Common/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { BreadcrumbHeader } from "@/components/Common/sidebar/Header";

const breadcrumbs: { href: string; label: string }[] = [
  { href: "/admin/demo", label: "Demo" },
];
const stats = [
  { label: "Total Orders", value: "48" },
  { label: "Order Items overtime", value: "420" },
  { label: "Returns", value: "9" },
  { label: "Fulfilled orders overtime", value: "389" },
];

// const orders = [
//   {
//     id: "1",
//     img: assets.demoimg,
//     product: "iPhone 13 Plus (128 GB Storage, 12 GB Ram)",
//     customer: "Raihan Shaikh",
//     date: "Jan 30, 08:32 PM",
//     total: "₹1,48,000/-",
//     status: "Pending",
//   },
//   {
//     id: "2",
//     img: assets.demoimg,
//     product: "iPhone 13 Plus (128 GB Storage, 12 GB Ram)",
//     customer: "Raihan Shaikh",
//     date: "Jan 30, 08:32 PM",
//     total: "₹1,48,000/-",
//     status: "Delivered",
//   },
//   {
//     id: "3",
//     img: assets.demoimg,
//     product: "iPhone 13 Plus (128 GB Storage, 12 GB Ram)",
//     customer: "Raihan Shaikh",
//     date: "Jan 30, 08:32 PM",
//     total: "₹1,48,000/-",
//     status: "Delivered",
//   },
//   {
//     id: "4",
//     img: assets.demoimg,
//     product: "iPhone 13 Plus (128 GB Storage, 12 GB Ram)",
//     customer: "Raihan Shaikh",
//     date: "Jan 30, 08:32 PM",
//     total: "₹1,48,000/-",
//     status: "Return",
//   },
//   {
//     id: "5",
//     img: assets.demoimg,
//     product: "iPhone 13 Plus (128 GB Storage, 12 GB Ram)",
//     customer: "Raihan Shaikh",
//     date: "Jan 30, 08:32 PM",
//     total: "₹1,48,000/-",
//     status: "Shipped",
//   },
// ];

export default function Demo() {
  const [selectedTab, setSelectedTab] = useState("All");

  //   const filteredOrders = selectedTab === "All" ? orders : orders.filter(order => order.status === selectedTab);

  return (
    <SidebarProvider>
      <AppSidebar userRole="admin" /> {/* or userRole="seller" */}
      <SidebarInset>
        <BreadcrumbHeader items={breadcrumbs} />
        <div>
          {/* <div className="bg-amber-300 border rounded-3xl">
        <img className="w-full h-full object-cover" src={assets.bannerdash} alt="" />
      </div> */}

          <h2 className="w-max border">Orders</h2>
          <SelectorWrapper>
            <div className="grid grid-cols-[0.5fr,1fr,1fr,0.6fr,1fr] sm:grid-cols-[0.1fr,0.3fr,0.5fr,0.2fr,0.3fr] rounded-lg bg-zinc-100 ">
              <div className="p-2 px-5 flex items-center space-x-2 whitespace-nowrap">
                <CalendarCheck />
                <span className="font-semibold text-xl">Today</span>
              </div>
              {stats.map((stat) => {
                const minWidth =
                  stat.label.length > 12
                    ? `${stat.label.length * 10}px`
                    : "8rem"; // Adjust multiplier as needed

                return (
                  <div
                    key={stat.label}
                    className="p-1 px-6 border-l-2 border-gray-300 first:border-l-0 whitespace-nowrap"
                    style={{ minWidth }}
                  >
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                    <div className="text-2xl font-semibold">{stat.value}</div>
                  </div>
                );
              })}
            </div>
          </SelectorWrapper>
          {/* // Full width and height */}
          {/* <IndiaSalesMap 
  salesData={salesData}
  height="600px"
  width="100%"
/>

// Fixed size
<IndiaSalesMap 
  salesData={salesData}
  height="400px"
  width="600px"
/>

// Container-based sizing
<div className="h-[500px] w-[800px]">
  <IndiaSalesMap 
    salesData={salesData}
    height="100%"
    width="100%"
  />
</div> */}

          <SelectorWrapper>
            <div className="w-full border overflow-hidden ">
              <Tabs
                defaultValue="All"
                onValueChange={setSelectedTab}
                className="mt-6 w-full shadow-none"
              >
                <TabsList className="w-full flex justify-between items-baseline bg-transparent rounded-none border-b-2 shadow-none">
                  {[
                    "All",
                    "Pending",
                    "Shipped",
                    "Delivered",
                    "Cancellation",
                    "Return",
                  ].map((item) => (
                    <TabsTrigger
                      key={item}
                      className="rounded-none px-16  border-b-4 hover:border-b-zinc-200 border-transparent shadow-none data-[state=active]:border-green-900 data-[state=active]:shadow-none"
                      value={item}
                    >
                      {item}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </SelectorWrapper>

          <div className="flex border-2 border-green-500 justify-between mt-4">
            <div className="relative w-72">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search Order.."
                className="pl-8 shadow-none border rounded-full"
              />
            </div>

            <div className="flex gap-2">
              <div className="border-[1.5px] space-x-1 rounded-lg shadow-sm shadow-gray-100">
                <Button
                  className="border-none shadow-none"
                  variant="outline"
                  size="icon"
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  className="border-none shadow-none"
                  variant="outline"
                  size="icon"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
