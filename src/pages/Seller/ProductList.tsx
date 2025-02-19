import { Button } from "@/components/ui/button";
import {
  CalendarCheck,
  ChevronRight,
  Filter,
  LayoutGrid,
  List,
  Search,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useEffect, useState } from "react";
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
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "@/lib/axios";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { assets } from "@/assets/assets";
import { Card } from "@/components/ui/card";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  offerPercentage: number | null;
  stock: number;
  categoryName: string;
  status: string;
  images: { id: number; url: string }[];
  productInfo: { brand: string; details: { key: string; value: string }[] };
  reviews: [];
}

// const products = [
//   {
//     id: 1,
//     name: "iPhone 13 Plus (128 GB Storage, 12 GB Ram)",
//     image: assets.laptop,
//     price: "68,956",
//     stock: 10,
//     status: "Inactive",
//   },
// ];

export default function ProductList() {
  const seller = useSelector((state: RootState) => state.seller.seller);
  const navigate = useNavigate();
  const [products, setProducts] = useState<Array<Product>>([]);
  const [selectedTab, setSelectedTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  const stats = [
    { label: "Total Products", value: products.length },
    {
      label: " Active",
      value: products.filter((product) => product.status === "Active").length,
    },
    {
      label: "Inactive",
      value: products.filter((product) => product.status === "Inactive").length,
    },
    {
      label: "Out of Stock",
      value: products.filter((product) => product.status === "OutOfStock")
        .length,
    },
    {
      label: "Discontinued",
      value: products.filter((product) => product.status === "Discontinued")
        .length,
    },
  ];

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/seller/products/${seller!.id}`
        );
        if (response.status === 200) {
          setProducts(response.data);
        }
      } catch (error: any) {
        console.log(error);
      }
    };
    getAllProducts();
  }, []);

  const filteredProducts =
    selectedTab === "All"
      ? products
      : products.filter((product) => product.status === selectedTab);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  return (
    <div className=" space-y-5 ">
      <div className="border rounded-xl p-4 space-y-4 animate__animated animate__fadeIn shadow-sm ">
        <h2 className="text-2xl text-accent-foreground font-semibold">Products</h2>

        <Card className="w-full lg:w-[100%] flex flex-nowrap  text-secondary-foreground  bg-muted/50 rounded-lg overflow-x-auto whitespace-nowrap scrollbar-x">
          <div className="flex items-center space-x-2 p-4 text-primary">
            <CalendarCheck className="w-6 h-6" />
            <span className="font-semibold text-lg">Current Updates</span>
          </div>
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="p-3 px-4 border-l-2 border-zinc-300 min-w-[190px]  flex flex-col"
            >
              <div className="text-sm text-muted-foreground truncate">{stat.label}</div>
              <div className="text-xl font-semibold truncate text-primary">{stat.value}</div>
            </div>
          ))}
        </Card>

        <Tabs defaultValue="All" onValueChange={(tab) => { setSelectedTab(tab); setCurrentPage(1); }} className="w-full lg:w-[85%] " >
          <div className="w-full overflow-x-auto  scrollbar-x">
            <TabsList className="flex min-w-max mt-4 items-center justify-start bg-transparent rounded-none  overflow-y-hidden  whitespace-nowrap">
              {["All", "Active", "Inactive", "Discontinued", "OutOfStock"].map(
                (item) => (
                  <TabsTrigger
                    key={item}
                    className="px-4 py-2 border-b-8 text-sm w-[140px] rounded-none shadow-none border-transparent 
          data-[state=active]:shadow-none data-[state=active]:bg-transparent hover:border-primary/20 
          data-[state=active]:border-primary data-[state=active]:text-primary"
                    value={item}
                  >
                    {item}
                  </TabsTrigger>
                )
              )}
            </TabsList>
          </div>
        </Tabs>
      </div>
      <div className="space-y-3 border p-3 rounded-xl shadow-sm  bg-[#e8e8e814] animate__animated animate__fadeIn">
        <h2 className="text-xl pl-1 text-primary font-semibold">
          All Product Lists
        </h2>
        <div className="flex flex-nowrap  gap-2 items-center justify-between">
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
        {paginatedProducts.length === 0 ? (
          <h2 className="text-muted-foreground font-bold text-center text-xl p-16">
            No Products!
          </h2>
        ) : (
          <Card className="p-2 md:p-4 border rounded-xl bg-background  border-zinc-200 overflow-hidden">
            <div className="overflow-x-auto ">
              <Table className="w-full ">
                <TableHeader className="bg-primary  rounded-lg  overflow-hidden">
                  <TableRow className="border-none ">
                    <TableHead className="text-primary-foreground text-base font-semibold text-center rounded-l-lg">
                      Sr.No.
                    </TableHead>
                    <TableHead className="text-primary-foreground text-base font-semibold">Image</TableHead>
                    <TableHead className="text-primary-foreground text-base font-semibold ">Product Name</TableHead>
                    <TableHead className="text-primary-foreground text-base font-semibold text-center">Price</TableHead>
                    <TableHead className="text-primary-foreground text-base font-semibold text-center">Stock</TableHead>
                    <TableHead className="text-primary-foreground text-base font-semibold text-center">Status</TableHead>
                    <TableHead className="text-primary-foreground text-base font-semibold text-center rounded-r-lg">
                      Details
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedProducts.map((product, index) => (
                    <TableRow key={product.id} className="border-b h-[60px] hover:bg-accent">
                      <TableCell className="text-center rounded-tl-lg rounded-bl-lg">{index + 1}</TableCell>
                      <TableCell className="text-center ">
                        {" "}
                        <img
                          src={
                            product.images?.[0]?.url || assets.shoppingBoyGif
                          }
                          alt="Product"
                          className={`w-16 mix-blend-multiply dark:mix-blend-difference rounded-xl`}
                        />
                      </TableCell>
                      <TableCell className="truncate max-w-[500px]">
                        {product.name}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-center">
                        {" "}
                        ₹{product.price}/-
                      </TableCell>
                      <TableCell className="text-center">
                        {product.stock}
                      </TableCell>
                      <TableCell className="text-center">
                        <span
                          className={`px-2 py-1 text-sm font-medium text-center  rounded-md ${
                            product.status === "Active"
                              ? "text-green-800 bg-green-50"
                              : product.status === "Inactive"
                              ? " text-yellow-800 bg-yellow-100"
                              : product.status === "Discontinued"
                              ? " text-red-600 bg-red-100 "
                              : ""
                          }`}
                        >
                          {product.status}
                        </span>
                      </TableCell>
                      <TableCell className=" w-max whitespace-nowrap space-x-4 rounded-br-lg rounded-tr-lg">
                        <div className="flex  items-center justify-center">
                          <Button
                            onClick={() =>
                              navigate(`view-product/${product.id}`, {
                                state: {
                                  product,
                                },
                              })
                            }
                            variant="ghost"
                            className="hover:bg-primary/10 w-10"
                          >
                            <ChevronRight />
                          </Button>
                        </div>
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
          <label className="text-sm">Items per pages</label>
          <Select>
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
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
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
                .map((page) => (
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
                  {currentPage < totalPages - 3 && (
                    <PaginationItem>...</PaginationItem>
                  )}
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      onClick={() => setCurrentPage(totalPages)}
                    >
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                </>
              )}

              {/* Next Button */}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
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
