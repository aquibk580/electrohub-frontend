import { Search, LayoutGrid, List, Filter, CalendarCheck, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { assets } from "@/assets/assets";
import { useState } from "react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";

const stats = [
  { label: "Total Orders", value: "48" },
  { label: "Order Items overtime", value: "420" },
  { label: "Returns", value: "9" },
  { label: "Fulfilled orders overtime", value: "389" },
];

const orders = [
  {
    id: "1",
    img: assets.demoimg,
    product: "iPhone 13 Plus (128 GB Storage, 12 GB Ram)",
    customer: "Raihan Shaikh",
    date: "Jan 30, 08:32 PM",
    total: "₹1,48,000/-",
    status: "Confirmed",
  },
  {
    id: "2",
    img: assets.demoimg,
    product: "iPhone 13 Plus (128 GB Storage, 12 GB Ram)",
    customer: "Raihan Shaikh",
    date: "Jan 30, 08:32 PM",
    total: "₹1,48,000/-",
    status: "Delivered",
  },
  {
    id: "3",
    img: assets.demoimg,
    product: "iPhone 13 Plus (128 GB Storage, 12 GB Ram)",
    customer: "Raihan Shaikh",
    date: "Jan 30, 08:32 PM",
    total: "₹1,48,000/-",
    status: "Delivered",
  },
  {
    id: "4",
    img: assets.demoimg,
    product: "iPhone 13 Plus (128 GB Storage, 12 GB Ram)",
    customer: "Raihan Shaikh",
    date: "Jan 30, 08:32 PM",
    total: "₹1,48,000/-",
    status: "Returned",
  },
  {
    id: "5",
    img: assets.demoimg,
    product: "iPhone 13 Plus (128 GB Storage, 12 GB Ram)",
    customer: "Raihan Shaikh",
    date: "Jan 30, 08:32 PM",
    total: "₹1,48,000/-",
    status: "Shipped",
  },
  {
    id: "6",
    img: assets.demoimg,
    product: "iPhone 13 Plus (128 GB Storage, 12 GB Ram)",
    customer: "Raihan Shaikh",
    date: "Jan 30, 08:32 PM",
    total: "₹1,48,000/-",
    status: "Shipped",
  },
  {
    id: "7",
    img: assets.demoimg,
    product: "iPhone 13 Plus (128 GB Storage, 12 GB Ram)",
    customer: "Raihan Shaikh",
    date: "Jan 30, 08:32 PM",
    total: "₹1,48,000/-",
    status: "Shipped",
  },
  {
    id: "8",
    img: assets.demoimg,
    product: "iPhone 13 Plus (128 GB Storage, 12 GB Ram)",
    customer: "Raihan Shaikh",
    date: "Jan 30, 08:32 PM",
    total: "₹1,48,000/-",
    status: "Cancelled",
  },

];

export default function Dashboard() {

  const [selectedTab, setSelectedTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;
  const filteredOrders = selectedTab === "All" ? orders : orders.filter(order => order.status === selectedTab);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const startIndex = (currentPage - 1) * ordersPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + ordersPerPage);

  const navigate = useNavigate();
  return (
    <div className="space-y-5 h-screen ">

      <div className="bg-[#FFC444] border rounded-xl">
        <img className="w-full h-full object-cover animate__animated animate__fadeIn" src={assets.bannerdash} alt="" />
      </div>



      <div className="border rounded-xl p-4 space-y-4  animate__animated animate__fadeIn shadow-sm ">
        <h2 className="text-2xl text-accent-foreground font-semibold">Orders</h2>

        {/* Stats Section */}
        <Card className="w-full lg:w-[95%] flex flex-nowrap gap-4  text-secondary-foreground border-accent bg-muted/50 rounded-lg overflow-x-auto whitespace-nowrap scrollbar-x mx-auto">
          <div className="flex items-center pl-6  space-x-2 text-primary">
            <CalendarCheck className="w-6 h-6" />
            <span className="font-semibold text-lg">Today</span>
          </div>
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="p-3 px-4 pr-10 border-l-2 border-zinc-300 min-w-[200px]  flex flex-col"
            >
              <div className="text-sm text-muted-foreground truncate">{stat.label}</div>
              <div className="text-xl font-semibold truncate text-primary">{stat.value}</div>
            </div>
          ))}
        </Card>

        {/* Tabs for Order Filters */}
        <Tabs
          defaultValue="All"
          onValueChange={(tab) => {
            setSelectedTab(tab);
            setCurrentPage(1);
          }}
          className="w-full lg:w-[85%]"
        >
          <div className="w-full overflow-x-auto scrollbar-x">
            <TabsList className="flex min-w-max items-center justify-start bg-transparent rounded-none overflow-y-hidden whitespace-nowrap">
              {["All", "Confirmed", "Shipped", "Delivered", "Cancelled", "Returned"].map((item) => (
                <TabsTrigger
                  key={item}
                  className="px-4 py-2 border-b-8 text-sm w-[140px] rounded-none shadow-none border-transparent 
          data-[state=active]:shadow-none data-[state=active]:bg-transparent hover:border-primary/20 
          data-[state=active]:border-primary data-[state=active]:text-primary"
                  value={item}
                >
                  {item}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </Tabs>

      </div>

      {/* Search and Filters */}
      <div className="space-y-3 border p-3 rounded-xl shadow-sm bg-secondary text-secondary-foreground animate__animated animate__fadeIn">
        <h2 className="text-xl pl-2 text-primary font-semibold">Orders Management</h2>
        <div className="flex flex-nowrap gap-2 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-secondary-foreground" />
            <Input placeholder="Search Order..." className="pl-8 bg-background rounded-full focus:bg-secondary transition-colors" />
          </div>

          <div className="flex gap-2">
            <Button className="bg-primary text-primary-foreground shadow-md rounded-lg hover:bg-primary/80 p-3">
              <LayoutGrid size={24} />
            </Button>

            <Button className="bg-primary text-primary-foreground shadow-md rounded-lg hover:bg-primary/80 p-3">
              <List size={24} />
            </Button>

            <Button className="bg-primary text-primary-foreground shadow-md border rounded-lg px-5 py-3 hover:bg-primary/80 flex items-center gap-2">
              <Filter size={24} />
              <span className="hidden sm:block font-medium">Filter</span>
            </Button>
          </div>

        </div>

        {/* Orders Table */}
        {paginatedOrders.length === 0 ? (
          <h2 className="text-muted font-bold text-center text-xl p-16">No Orders!</h2>
        ) : (
          <Card className="p-2 md:p-4 border rounded-xl bg-background border-border overflow-hidden">
            <div className="overflow-x-auto">
              <Table className="w-full">
                <TableHeader className="bg-primary overflow-hidden">
                  <TableRow className="rounded-3xl">
                    <TableHead className="text-primary-foreground text-base font-semibold rounded-tl-lg rounded-bl-lg">
                      Order
                    </TableHead>
                    <TableHead className="text-primary-foreground text-base font-semibold">Customer</TableHead>
                    <TableHead className="text-primary-foreground text-base font-semibold">Date</TableHead>
                    <TableHead className="text-primary-foreground text-base font-semibold">Total</TableHead>
                    <TableHead className="text-primary-foreground text-base font-semibold">Status</TableHead>
                    <TableHead className="text-right text-primary-foreground text-base font-semibold rounded-br-lg rounded-tr-lg">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                {/* </Table> */}

                <TableBody>
                  {paginatedOrders.map(order => (
                    <TableRow key={order.id} className="border-b h-[60px] hover:bg-primary/5">
                      <TableCell>
                        <div className="flex items-center gap-5">
                          <img src={order.img} alt="Product" className="w-12" />
                          <div className="text-sm w-56">{order.product}</div>
                        </div>
                      </TableCell>
                      <TableCell className="space-x-2 whitespace-nowrap">
                        <span className="p-1.5 border bg-primary/10 text-primary font-semibold rounded-full">
                          {order.customer.split(" ").map(letter => letter[0]).join("").toUpperCase()}
                        </span>
                        <span>{order.customer}</span>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">{order.date}</TableCell>
                      <TableCell>{order.total}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 text-[10px] font-medium rounded-md ${order.status === "Confirmed" ? "bg-yellow-100 text-yellow-800" :
                          order.status === "Shipped" ? "bg-blue-100 text-blue-800" :
                            order.status === "Delivered" ? "bg-green-100 text-green-800" :
                              order.status === "Cancelled" ? "bg-red-100 text-red-800" :
                                order.status === "Returned" ? "bg-gray-100 text-gray-800" : "bg-gray-200 text-gray-800"
                          }`}>
                          {order.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button onClick={() => navigate(`order/${order.id}`)} variant="ghost" className="hover:bg-accent">
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

      {/* Pagination Controls */}
      <div className="flex p-2 items-center">

        <div className="flex whitespace-nowrap space-x-2   items-center">
          <label className="text-sm" >Items per pages</label>
          <Select

          >
            <SelectTrigger className="">
              <SelectValue placeholder="5" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">5</SelectItem>
              <SelectItem value="inactive">10</SelectItem>
              <SelectItem value="draft">15</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {totalPages > 1 && (
          <Pagination className="w-max mr-0">
            <PaginationContent>
              {/* Previous Button */}
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                // disabled={currentPage === 1}
                />
              </PaginationItem>

              {/* First Page Button */}
              {currentPage > 3 && (
                <>
                  <PaginationItem>
                    <PaginationLink href="#" onClick={() => setCurrentPage(1)}>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  {currentPage > 4 && <PaginationItem>...</PaginationItem>}
                </>
              )}

              {/* Dynamic Page Numbers */}
              {Array.from({ length: totalPages }, (_, index) => index + 1)
                .slice(
                  Math.max(0, currentPage - 3), // Show pages around the current one
                  Math.min(totalPages, currentPage + 2) // Prevent out-of-bounds
                )
                .map(page => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      isActive={currentPage === page}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}

              {/* Last Page Button */}
              {currentPage < totalPages - 2 && (
                <>
                  {currentPage < totalPages - 3 && <PaginationItem>...</PaginationItem>}
                  <PaginationItem>
                    <PaginationLink href="#" onClick={() => setCurrentPage(totalPages)}>
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                </>
              )}

              {/* Next Button */}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                // disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}

      </div>
    </div>

  );
}
