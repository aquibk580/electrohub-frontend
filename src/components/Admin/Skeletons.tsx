"use client"

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Select,SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select";
import { Box, CheckCircle2, XCircle, Ban, SquareMenu, Table, Calendar, CheckCircle, ListOrdered, Package, RotateCcw, Search, SortAsc, ArrowLeft, Star, Users } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { TableHeader, TableRow, TableHead, TableBody, TableCell } from "../ui/table";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

const DashboardSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {Array(5).fill(0).map((_, i) => (
          <Card key={i} className="border-primary/20">
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Line Chart Skeleton */}
        <Card className="border-primary/75 bg-primary/5">
          <CardHeader>
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent className="h-[300px] mt-4">
            <div className="w-full h-full flex flex-col gap-2">
              <div className="flex justify-between">
                {Array(6).fill(0).map((_, i) => (
                  <Skeleton key={i} className="h-3 w-8" />
                ))}
              </div>
              <div className="flex-1 mt-2">
                <Skeleton className="h-full w-full" />
              </div>
              <div className="flex justify-between">
                {Array(7).fill(0).map((_, i) => (
                  <Skeleton key={i} className="h-3 w-12" />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart Skeleton */}
        <Card className="border-primary/75 bg-primary/5">
          <CardHeader>
            <Skeleton className="h-6 w-40 mb-2" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <div className="relative w-48 h-48 mb-8">
              <Skeleton className="h-full w-full rounded-full" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Skeleton className="h-16 w-16 rounded-full" />
              </div>
            </div>
            <Skeleton className="h-5 w-64 mb-2" />
            <Skeleton className="h-4 w-80" />
          </CardContent>
        </Card>
      </div>

      {/* Table Skeleton */}
      <Card className="border-primary/75 bg-primary/5">
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  {["Sr No.", "Product Name", "Units Sold", "Total Sales"].map((_, i) => (
                    <th key={i} className="p-3">
                      <Skeleton className="h-6 w-full" />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array(5).fill(0).map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    <td className="p-3">
                      <Skeleton className="h-5 w-8" />
                    </td>
                    <td className="p-3">
                      <Skeleton className="h-5 w-full" />
                    </td>
                    <td className="p-3">
                      <Skeleton className="h-5 w-16" />
                    </td>
                    <td className="p-3">
                      <Skeleton className="h-5 w-28" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const AdminTableSkeleton = () => {
  return (
    <Card className="rounded-xl overflow-hidden">
      <CardContent className="p-0">
        <div className="w-full">
          <div className="min-w-[800px] rounded-xl overflow-hidden">
            {/* Skeleton Header */}
            <div className="bg-primary/75 flex p-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex-1 min-w-32">
                  <Skeleton className="h-6 w-24 bg-primary/40" />
                </div>
              ))}
              <div className="w-[50px]"></div>
            </div>

            {/* Skeleton Rows */}
            <div className="bg-white dark:bg-black">
              {[1, 2, 3, 4].map((row) => (
                <div key={row} className="flex items-center p-3 border-b border-primary/25">
                  {[1, 2, 3, 4, 5].map((cell) => (
                    <div key={cell} className="flex-1 min-w-32">
                      <Skeleton className="h-5 w-full max-w-32 bg-primary/10" />
                    </div>
                  ))}
                  <div className="w-[50px] flex justify-center">
                    <Skeleton className="h-5 w-5 bg-primary/10" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const SellerSkeleton = () => {
  return (
    <div className="w-full px-2 py-2 sm:px-4 sm:py-4">
      <Tabs defaultValue="top" className="space-y-4">
        <div className="w-full">
          <TabsList className="w-full rounded-xl sm:w-auto">
            <TabsTrigger
              value="top"
              className="flex-1 sm:flex-none rounded-xl text-sm sm:text-base"
            >
              Top Sellers
            </TabsTrigger>
            <TabsTrigger
              value="all"
              className="flex-1 sm:flex-none rounded-xl text-sm sm:text-base"
            >
              All Sellers
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="top" className="mt-2">
          <Card className="shadow-md rounded-xl border-primary/50 bg-primary/5 dark:bg-gradient-to-br from-primary/15 via-slate-900/40 to-primary/10 py-4">
            <CardHeader className="px-4 py-2 sm:p-5">
              <CardTitle className="text-xl sm:text-2xl">Top Sellers</CardTitle>
            </CardHeader>
            <CardContent className="p-2 sm:p-4 space-y-3">
              <div className="flex flex-col sm:flex-row gap-2 justify-between mb-4">
                <Skeleton className="h-10 w-full sm:w-64" />
                <div className="flex gap-2">
                  <Skeleton className="h-10 w-32" />
                  <Skeleton className="h-10 w-32" />
                </div>
              </div>
              <div className="space-y-2">
                {Array(7).fill(0).map((_, index) => (
                  <Skeleton key={index} className="h-16 w-full" />
                ))}
              </div>
              <div className="flex justify-between items-center mt-4">
                <Skeleton className="h-8 w-24" />
                <div className="flex gap-1">
                  {Array(3).fill(0).map((_, index) => (
                    <Skeleton key={index} className="h-8 w-8" />
                  ))}
                </div>
                <Skeleton className="h-8 w-24" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="all" className="mt-2">
          <Card className="shadow-md rounded-xl border-primary/50 bg-primary/5 dark:bg-gradient-to-br from-primary/15 via-slate-900/40 to-primary/10 py-4">
            <CardHeader className="px-4 py-2 sm:p-5">
              <CardTitle className="text-xl sm:text-2xl">All Sellers</CardTitle>
            </CardHeader>
            <CardContent className="p-2 sm:p-4 space-y-3">
              <div className="flex flex-col sm:flex-row gap-2 justify-between mb-4">
                <Skeleton className="h-10 w-full sm:w-64" />
                <div className="flex gap-2">
                  <Skeleton className="h-10 w-32" />
                  <Skeleton className="h-10 w-32" />
                </div>
              </div>
              <div className="space-y-2">
                {Array(7).fill(0).map((_, index) => (
                  <Skeleton key={index} className="h-16 w-full" />
                ))}
              </div>
              <div className="flex justify-between items-center mt-4">
                <Skeleton className="h-8 w-24" />
                <div className="flex gap-1">
                  {Array(3).fill(0).map((_, index) => (
                    <Skeleton key={index} className="h-8 w-8" />
                  ))}
                </div>
                <Skeleton className="h-8 w-24" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
const SellerInfoSkeleton = () => {
  return (
    <div className="w-full px-4 py-6 space-y-6">
      {/* Seller Overview Skeleton */}
      <Card className="border-primary/65 bg-primary/5 dark:bg-gradient-to-br from-primary/5 via-slate-900/30 to-primary/5">
        <CardHeader>
          <CardTitle className="text-xl">Seller Overview</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-col-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 flex items-center justify-center md:">
            <div className="flex flex-col items-center gap-2 w-fit">
              <Skeleton className="w-32 h-32 rounded-full" />
              <div className="flex space-x-1 items-center">
                <Skeleton className="h-6 w-32" />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <p className="flex items-center">
              <strong className="mr-1">Member Since : </strong>
              <Skeleton className="h-4 w-32" />
            </p>
            <p className="flex items-center">
              <strong className="mr-1">Email : </strong>
              <Skeleton className="h-4 w-48" />
            </p>
            <p className="flex items-center">
              <strong className="mr-1">Address : </strong>
              <Skeleton className="h-4 w-64" />
            </p>
            <div className="flex items-center">
              <strong className="mr-1">Average Rating : </strong>
              <div className="flex items-center space-x-1">
                <Skeleton className="h-4 w-6" />
                <Star className="w-[15px] h-[15px] text-yellow-400" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics Skeleton */}
      <Card className="border-primary/70 bg-primary/5 dark:bg-gradient-to-br from-primary/5 via-slate-900/30 to-primary/5">
        <CardHeader>
          <CardTitle className="text-xl">Seller insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="dark:border-primary/75 shadow-none border-none bg-primary/10 dark:bg-gradient-to-br from-primary/25 via-slate-900/30 to-primary/15">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Package className="h-8 w-8 text-primary" />
                  <span>Total Products</span>
                </div>
                <Skeleton className="h-8 w-16 mt-2" />
              </CardContent>
            </Card>
            <Card className="dark:border-primary/75 shadow-none border-none bg-primary/10 dark:bg-gradient-to-br from-primary/25 via-slate-900/30 to-primary/15">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Package className="h-8 w-8 text-primary" />
                  <span>Order Completion</span>
                </div>
                <Skeleton className="h-8 w-16 mt-2" />
              </CardContent>
            </Card>
            <Card className="dark:border-primary/75 shadow-none border-none bg-primary/10 dark:bg-gradient-to-br from-primary/25 via-slate-900/30 to-primary/15">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Star className="h-8 w-8 text-primary" />
                  <span>Satisfaction</span>
                </div>
                <Skeleton className="h-8 w-16 mt-2" />
              </CardContent>
            </Card>
            <Card className="dark:border-primary/75 shadow-none border-none bg-primary/10 dark:bg-gradient-to-br from-primary/25 via-slate-900/30 to-primary/15">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Users className="h-8 w-8 text-primary" />
                  <span>Total Returns</span>
                </div>
                <Skeleton className="h-8 w-16 mt-2" />
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information Skeleton */}
      <Card className="border-primary/75 bg-primary/5 dark:bg-gradient-to-br from-primary/5 via-slate-900/30 to-primary/5">
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span>Email :</span>
            <Skeleton className="h-4 w-48" />
          </div>
          <Separator />
          <div className="flex justify-between">
            <span>Phone :</span>
            <Skeleton className="h-4 w-32" />
          </div>
          <Separator />
          <div className="flex justify-between">
            <span>Address :</span>
            <Skeleton className="h-4 w-64" />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="Products">
        <TabsList>
          <TabsTrigger value="Products">Products</TabsTrigger>
          <TabsTrigger value="Orders">Orders</TabsTrigger>
        </TabsList>
        <TabsContent value="Products">
          {/* Seller Products Skeleton */}
          <Card className="border-primary/75 bg-primary/5 dark:bg-gradient-to-br from-primary/5 via-slate-900/30 to-primary/5">
            <CardHeader>
              <CardTitle className="text-xl">Seller Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="flex flex-col md:flex-row md:items-center justify-between border-transparent shadow-none bg-primary/10 p-4 border rounded-xl"
                  >
                    <div className="flex items-center space-x-4">
                      <Skeleton className="w-24 h-24 md:w-20 md:h-20 rounded" />
                      <div>
                        <Skeleton className="h-5 w-40 mb-2" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    </div>
                    <div className="text-right mt-2 md:mt-0">
                      <Skeleton className="h-5 w-16 ml-auto mb-2" />
                      <Skeleton className="h-6 w-24 ml-auto" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="Orders">
          {/* Recent Orders Skeleton */}
          <Card className="border-primary/75 bg-primary/5 dark:bg-gradient-to-br from-primary/5 via-slate-900/30 to-primary/5">
            <CardHeader>
              <CardTitle className="text-xl">Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="flex flex-col md:flex-row md:items-center border-transparent bg-primary/10 justify-between p-4 border rounded-xl"
                  >
                    <div className="flex items-center space-x-4">
                      <Skeleton className="w-24 h-24 md:w-20 md:h-20 rounded" />
                      <div>
                        <Skeleton className="h-5 w-40 mb-1" />
                        <Skeleton className="h-5 w-32 mb-1" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    </div>
                    <div className="text-right mt-2 md:mt-0">
                      <Skeleton className="h-5 w-16 ml-auto mb-2" />
                      <Skeleton className="h-6 w-24 ml-auto" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export const BuyerSkeleton = () => {
  return (
    <div className="w-full px-2 py-2 sm:px-4 sm:py-4">
      <Card className="shadow-md rounded-xl border-primary/50 bg-primary/5 dark:bg-gradient-to-br from-primary/15 via-slate-900/40 to-primary/10 py-4">
        <CardHeader className="px-4 py-2 sm:p-5">
          <CardTitle className="text-xl sm:text-2xl">Buyers</CardTitle>
        </CardHeader>
        <CardContent className="p-2 sm:p-4 space-y-3">
          <div className="flex flex-col sm:flex-row gap-2 justify-between mb-4">
            <Skeleton className="h-10 w-full sm:w-64" />
            <div className="flex gap-2">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
          <div className="space-y-2">
            {Array(5).fill(0).map((_, index) => (
              <Skeleton key={index} className="h-16 w-full" />
            ))}
          </div>
          <div className="flex justify-between items-center mt-4">
            <Skeleton className="h-8 w-24" />
            <div className="flex gap-1">
              {Array(3).fill(0).map((_, index) => (
                <Skeleton key={index} className="h-8 w-8" />
              ))}
            </div>
            <Skeleton className="h-8 w-24" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const BuyerDetailsSkeleton = () => {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <button className="flex items-center gap-2 group text-primary hover:text-primary/60 w-fit transition-colors">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back to Buyers</span>
      </button>

      {/* Header Card */}
      <Card className="border-primary/75 bg-primary/5 dark:bg-gradient-to-br from-primary/30 via-slate-700/35 to-primary/25">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-20 w-20 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-56" />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="payment">Payment Details</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} className="border-primary/75 bg-primary/5 dark:bg-gradient-to-br from-primary/25 via-slate-900/30 to-primary/15">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-24" />
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-primary/75 bg-primary/5 dark:bg-gradient-to-br from-primary/25 via-slate-900/30 to-primary/15">
            <CardHeader>
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="flex items-center space-x-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-40" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card className="border-primary/75 bg-primary/5">
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-b-accent-foreground">
                    <TableHead className="text-center">
                      <Skeleton className="h-4 w-16 mx-auto" />
                    </TableHead>
                    <TableHead className="text-center">
                      <Skeleton className="h-4 w-16 mx-auto" />
                    </TableHead>
                    <TableHead className="text-center">
                      <Skeleton className="h-4 w-16 mx-auto" />
                    </TableHead>
                    <TableHead className="text-center">
                      <Skeleton className="h-4 w-16 mx-auto" />
                    </TableHead>
                    <TableHead className="text-center">
                      <Skeleton className="h-4 w-16 mx-auto" />
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[1, 2, 3, 4].map((item) => (
                    <TableRow key={item} className="border-b-accent-foreground/35">
                      <TableCell className="text-center">
                        <Skeleton className="h-4 w-16 mx-auto" />
                      </TableCell>
                      <TableCell className="text-center">
                        <Skeleton className="h-4 w-24 mx-auto" />
                      </TableCell>
                      <TableCell className="text-center">
                        <Skeleton className="h-4 w-32 mx-auto" />
                      </TableCell>
                      <TableCell className="text-center">
                        <Skeleton className="h-4 w-16 mx-auto" />
                      </TableCell>
                      <TableCell className="text-center">
                        <Skeleton className="h-6 w-20 mx-auto" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews">
          <Card className="border-primary/75 bg-primary/5">
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <Card
                    key={item}
                    className="border-transparent shadow-none bg-primary/10"
                  >
                    <CardContent className="px-4 py-4 space-y-1.5">
                      <div className="flex justify-between items-start">
                        <Skeleton className="h-5 w-48" />
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Skeleton
                              key={star}
                              className="h-4 w-4"
                            />
                          ))}
                          <Skeleton className="h-4 w-10 ml-2" />
                        </div>
                      </div>
                      <Skeleton className="h-4 w-full mt-2" />
                      <Skeleton className="h-4 w-3/4" />
                      <div className="flex items-center space-x-2 mt-2">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment">
          <Card className="mt-4 border-primary/75 bg-primary/5">
            <CardHeader>
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-b-accent-foreground">
                    <TableHead className="text-center">
                      <Skeleton className="h-4 w-24 mx-auto" />
                    </TableHead>
                    <TableHead className="text-center">
                      <Skeleton className="h-4 w-16 mx-auto" />
                    </TableHead>
                    <TableHead className="text-center">
                      <Skeleton className="h-4 w-16 mx-auto" />
                    </TableHead>
                    <TableHead className="text-center">
                      <Skeleton className="h-4 w-16 mx-auto" />
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[1, 2, 3].map((item) => (
                    <TableRow key={item} className="border-accent-foreground/45">
                      <TableCell className="text-center">
                        <Skeleton className="h-4 w-24 mx-auto" />
                      </TableCell>
                      <TableCell className="text-center">
                        <Skeleton className="h-4 w-24 mx-auto" />
                      </TableCell>
                      <TableCell className="text-center">
                        <Skeleton className="h-4 w-16 mx-auto" />
                      </TableCell>
                      <TableCell className="text-center">
                        <Skeleton className="h-6 w-20 mx-auto" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};


const AdminDashboardSkeleton = ({ type = 'products' }) => {
  const isProducts = type === 'products';
  
  // Determine headers based on page type
  const tableHeaders = isProducts 
    ? ['ID', 'Image', 'Name', 'Price', 'Stock', 'Status', 'Discount']
    : ['ID', 'Image', 'Product Name', 'Customer Name', 'Date', 'Total', 'Status'];

  return (
    <div className="w-full px-2 py-2 sm:px-4 sm:py-4 space-y-4">
      {/* Stats Card */}
      <Card className="shadow-md rounded-xl border-primary/75 bg-primary/5 dark:bg-gradient-to-br from-primary/20 via-slate-900/20 to-primary/10 py-4">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex flex-col space-y-2 p-4 rounded-lg bg-card/50 backdrop-blur-sm">
                <div className="flex items-center space-x-2">
                  {isProducts ? (
                    // Product page icons
                    <>
                      {index === 0 && <Box className="w-6 h-6 text-primary" />}
                      {index === 1 && <CheckCircle2 className="w-6 h-6 text-primary" />}
                      {index === 2 && <XCircle className="w-6 h-6 text-primary" />}
                      {index === 3 && <Ban className="w-6 h-6 text-primary" />}
                      {index === 4 && <SquareMenu className="w-6 h-6 text-primary" />}
                    </>
                  ) : (
                    // Order page icons
                    <>
                      {index === 0 && <Calendar className="w-6 h-6 text-primary" />}
                      {index === 1 && <ListOrdered className="w-6 h-6 text-primary" />}
                      {index === 2 && <Package className="w-6 h-6 text-primary" />}
                      {index === 3 && <RotateCcw className="w-6 h-6 text-primary" />}
                      {index === 4 && <CheckCircle className="w-6 h-6 text-primary" />}
                    </>
                  )}
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-8 w-16" />
              </div>
            ))}
          </div>

          {/* Category Tabs - Only show for Products page */}
          {isProducts && (
            <Tabs defaultValue="All" className="w-full lg:w-[85%]">
            <div className="w-full overflow-x-auto scrollbar-x">
              <TabsList className="flex min-w-max mt-4 items-center justify-start bg-transparent rounded-none overflow-y-hidden whitespace-nowrap">
                {["All", "Smartphone", "GPU", "Smartwatch", "Console","Laptop", "Tablet" ].map((item) => (
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
          )}
           
        </CardContent>
      </Card>

      {/* Management Card */}
      <Card className="shadow-md bg-primary/5 rounded-xl border-primary/75 dark:bg-gradient-to-br from-primary/10 via-slate-900/15 to-primary/10 py-4">
        <CardHeader className="px-4 py-2 sm:p-5">
          <CardTitle className="text-xl sm:text-2xl">
            {isProducts ? 'Products Management' : 'Orders Management'}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-2 sm:p-4 space-y-3">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Input placeholder="Search here..." className="pl-8" />
              <div className="absolute inset-y-0 left-2 flex items-center">
                <Box className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent></SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent></SelectContent>
              </Select>
            </div>
          </div>

          {/* Table */}
          <Table>
            <TableHeader>
              <TableRow>
                {tableHeaders.map((header, index) => (
                  <TableHead key={index}>{header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(5)].map((_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton className="h-4 w-4" /></TableCell>
                  <TableCell><Skeleton className="h-12 w-12 rounded-md" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                  <TableCell>
                    {isProducts ? 
                      <Skeleton className="h-4 w-16" /> : 
                      <Skeleton className="h-4 w-32" />
                    }
                  </TableCell>
                  <TableCell><Skeleton className="h-4 w-12" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-8" /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex justify-between items-center pt-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-24" />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" disabled>
                {'<'}
              </Button>
              <div className="flex gap-1">
                {[...Array(3)].map((_, index) => (
                  <Button key={index} variant={index === 0 ? "default" : "outline"} size="icon">
                    {index + 1}
                  </Button>
                ))}
              </div>
              <Button variant="outline" size="icon">
                {'>'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const MessagesSkeleton = () => {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Stats Cards Skeleton */}
        <Card className="shadow-md rounded-xl bg-primary/5 border-primary/75 dark:bg-gradient-to-br from-primary/15 via-slate-900/15 to-primary/10">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((index) => (
                <div
                  key={index}
                  className="dark:bg-gradient-to-br from-primary/15 to-black rounded-xl p-5 border border-primary/85 bg-primary/10 flex items-center space-x-4 shadow-sm"
                >
                  <Skeleton className="rounded-full w-14 h-14" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-6 w-12" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Message Center Card */}
        <Card className="border-primary/75 shadow-md bg-primary/5 rounded-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold text-accent-foreground">
                Message Center
              </CardTitle>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Search and Filter Controls */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="relative md:col-span-2">
                <Search className="absolute left-3 top-1/2 w-5 h-5 dark:text-white -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search messages..."
                  className="pl-10 py-2 rounded-full bg-white/95 dark:bg-black border-primary/65"
                  disabled
                />
              </div>

              <div className="flex space-x-2">
                <Select disabled>
                  <SelectTrigger className="rounded-full bg-white/95 dark:bg-black border-primary/60">
                    <SelectValue placeholder="Filter">
                      <div className="flex items-center space-x-2">
                        <SortAsc size={16} />
                        <span>All</span>
                      </div>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                  </SelectContent>
                </Select>
                <Select disabled>
                  <SelectTrigger className="rounded-full bg-white/95 dark:bg-black border-primary/60">
                    <SelectValue placeholder="Sort">
                      <div className="flex items-center space-x-2">
                        <SortAsc size={16} />
                        <span>Default</span>
                      </div>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Message List Skeleton */}
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-4">
                {[1, 2, 3, 4].map((index) => (
                  <div key={index} className="bg-primary/10 border border-primary/55 rounded-xl mb-4 overflow-hidden group">
                    <div className="p-4 flex items-start justify-between">
                      <div className="flex-1 space-y-2 w-full">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Skeleton className="h-8 w-8 rounded-full" />
                            <Skeleton className="h-5 w-32" />
                            <Skeleton className="h-4 w-24 rounded-full" />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <Skeleton className="h-5 w-3/4" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-4/5" />
                        </div>

                        <div className="flex items-center justify-between">
                          <Skeleton className="h-3 w-32" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
const DetailPageSkeleton = ({ type = "product" }: { type?: "product" | "order" }) => {
  return (
    <div className="w-full px-4 py-6 space-y-6">
      {/* Back Button */}
      <button className="flex items-center gap-2 group text-primary hover:text-primary/60 w-fit transition-colors">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back to {type === "product" ? "Products" : "Orders"}</span>
      </button>

      {/* Main Summary Card */}
      <Card className="border-primary/75 bg-primary/5">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl">
            <Skeleton className="h-7 w-48" />
          </CardTitle>
          {type === "product" && (
            <div>
              <Skeleton className="h-10 w-36 rounded-xl" />
            </div>
          )}
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <Skeleton className="w-32 h-32 rounded-lg" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-5 w-full max-w-[200px]" />
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Skeleton className="h-5 w-40" />
            <div className="grid grid-cols-2 gap-4">
              {Array(4).fill(null).map((_, i) => (
                <div key={i}>
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-5 w-16" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Second Card - Specifications or Timeline */}
      <Card className="border-primary/75 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-xl">
            <Skeleton className="h-6 w-56" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          {type === "product" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array(6).fill(null).map((_, i) => (
                <div key={i} className="flex justify-between border-b py-2">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-5 w-36" />
                </div>
              ))}
            </div>
          ) : (
            <div className="relative">
              <div className="absolute left-[22px] top-6 bottom-6 w-[2px] bg-muted-foreground/20" />
              {Array(3).fill(null).map((_, i) => (
                <div key={i} className="relative pl-12 pb-8 last:pb-0">
                  <Skeleton className="absolute left-0 w-11 h-11 rounded-full" />
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-5 w-28" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <Skeleton className="h-1 w-full rounded-full mt-2" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Third Card - Reviews or Shipping Details */}
      <Card className="border-primary/75 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-xl">
            <Skeleton className="h-6 w-40" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          {type === "product" ? (
            <div className="space-y-4">
              {Array(2).fill(null).map((_, i) => (
                <div key={i} className="bg-primary/10 border px-6 py-4 rounded-xl">
                  <div className="flex items-center justify-between space-x-2 mb-2">
                    <div className="space-x-3">
                      <Skeleton className="inline-block h-8 w-8 rounded-full" />
                      <Skeleton className="inline-block h-5 w-32" />
                    </div>
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-16 w-full" />
                  <div className="flex items-center space-x-2 mt-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-full max-w-md" />
              <Skeleton className="h-4 w-32" />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export { DashboardSkeleton, AdminTableSkeleton, AdminDashboardSkeleton, MessagesSkeleton, BuyerDetailsSkeleton, SellerInfoSkeleton, DetailPageSkeleton };
