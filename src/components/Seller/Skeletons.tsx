import { Boxes, Loader2, MoveLeft, ShoppingBag, TrendingUp } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "../ui/separator";
import { useState, useEffect } from "react";
import {
  Pencil,
  Mail,
  Phone,
  Building2,
  EllipsisVertical,
  MoveUp,
  IndianRupee,
  RotateCw,
  PackageMinus,
  RefreshCcw
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input"
import { CalendarCheck, Filter, Search } from "lucide-react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
// ViewOrder Skeleton
export function ViewOrderSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="space-y-4">
        <Skeleton className="h-10 w-48" />

        <Card>
          <CardHeader className="pb-2">
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-4 w-full" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-col lg:flex-row gap-4">
              <Skeleton className="h-48 w-full lg:w-48 rounded-md" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-6 w-24 rounded-full" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-5 w-32" />
                </div>
              </div>
              <div className="w-full lg:w-[300px]">
                <Skeleton className="h-8 w-48 mb-2" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Dashboard Skeleton
export function DashboardSkeleton() {
  return (
    <div className="space-y-5">
      {/* Orders Stats Card Skeleton */}
      <div className="border border-primary/30 bg-primary/5 dark:bg-gradient-to-br from-black via-primary/10 to-black rounded-xl p-4 space-y-4 animate__animated animate__fadeIn shadow-sm">
        <h2 className="text-2xl text-primary font-semibold">Orders</h2>
        <Card className="w-full lg:w-[95%] flex flex-nowrap gap-4 text-secondary-foreground bg-primary/10 border-primary shadow-none rounded-lg overflow-x-auto whitespace-nowrap scrollbar-x mx-auto">
          <div className="flex items-center pl-6 space-x-2 text-primary">
            <Skeleton className="w-6 h-6 rounded-full" />
            <Skeleton className="h-6 w-20" />
          </div>
          {Array(4).fill(0).map((_, index) => (
            <div key={index} className="p-3 px-4 pr-10 border-l-2 border-primary/50 min-w-[200px] flex flex-col">
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-8 w-16" />
            </div>
          ))}
        </Card>
      </div>

      {/* Charts Section Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Sales Statistics Skeleton */}
        <Card>
          <CardHeader>
            <CardTitle><Skeleton className="h-6 w-32" /></CardTitle>
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent className="h-[300px] mt-10">
            <Skeleton className="h-full w-full rounded-lg" />
          </CardContent>
        </Card>
        {/* Pie Chart Skeleton */}
        <Card>
          <CardHeader>
            <CardTitle><Skeleton className="h-6 w-40" /></CardTitle>
            <Skeleton className="h-4 w-56" />
          </CardHeader>
          <CardContent className="h-[300px] pt-4 flex justify-center">
            <Skeleton className="h-64 w-64 rounded-full" />
          </CardContent>
        </Card>
      </div>

      {/* Orders Management Skeleton */}
      <div className="space-y-3 border border-primary/30 bg-primary/5 dark:bg-gradient-to-br from-black via-primary/10 to-black p-3 rounded-xl shadow-sm animate__animated animate__fadeIn">
        <h2 className="text-xl pl-2 text-primary font-semibold">
          Orders Management
        </h2>
        <div className="flex flex-nowrap gap-2 items-center justify-between">
          <Skeleton className="h-10 w-72 rounded-full" />
          <Skeleton className="h-10 w-32 rounded-lg" />
        </div>

        {/* Tabs Skeleton */}
        <Tabs defaultValue="All" className="w-full lg:w-[85%]">
          <div className="w-full overflow-x-auto scrollbar-x">
            <TabsList className="flex min-w-max items-center justify-start bg-transparent rounded-none overflow-y-hidden whitespace-nowrap">
              {["All", "Confirmed", "Shipped", "Delivered", "Cancelled", "Returned"].map((item) => (
                <TabsTrigger
                  key={item}
                  className="px-4 py-2 border-b-8 text-sm w-[140px] rounded-none shadow-none border-transparent"
                  value={item}
                  disabled
                >
                  <Skeleton className="h-4 w-20" />
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </Tabs>

        {/* Table Skeleton */}
        <Card className="p-2 md:p-4 border border-primary/30 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <Table className="w-full">
              <TableHeader className="bg-primary overflow-hidden">
                <TableRow className="rounded-3xl border-none hover:bg-transparent">
                  <TableHead className="text-primary-foreground font-semibold rounded-tl-lg rounded-bl-lg">
                    Order
                  </TableHead>
                  <TableHead className="text-primary-foreground font-semibold">
                    Customer
                  </TableHead>
                  <TableHead className="text-primary-foreground font-semibold">
                    Date
                  </TableHead>
                  <TableHead className="text-primary-foreground font-semibold">
                    Total
                  </TableHead>
                  <TableHead className="text-primary-foreground font-semibold">
                    Status
                  </TableHead>
                  <TableHead className="text-right text-primary-foreground font-semibold rounded-br-lg rounded-tr-lg">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array(5).fill(0).map((_, index) => (
                  <TableRow key={index} className="border-b h-[60px] hover:bg-primary/5">
                    <TableCell>
                      <div className="flex items-center gap-5">
                        <Skeleton className="h-16 w-16 rounded-md" />
                        <Skeleton className="h-4 w-56" />
                      </div>
                    </TableCell>
                    <TableCell className="space-x-2 whitespace-nowrap">
                      <Skeleton className="h-8 w-8 rounded-full inline-block" />
                      <Skeleton className="h-4 w-24 inline-block" />
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <Skeleton className="h-4 w-24" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-16" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-20 rounded-md" />
                    </TableCell>
                    <TableCell className="text-right">
                      <Skeleton className="h-8 w-8 rounded-md ml-auto" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>

      {/* Pagination Skeleton */}
      <div className="flex p-2 items-center justify-between">
        <div className="flex whitespace-nowrap space-x-2 items-center">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-16 rounded-md" />
        </div>
        <div className="flex items-center gap-1">
          <Skeleton className="h-8 w-8 rounded-md" />
          {Array(3).fill(0).map((_, index) => (
            <Skeleton key={index} className="h-8 w-8 rounded-md" />
          ))}
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </div>
    </div>
  );
}

// ProductList Skeleton
export function ProductListSkeleton() {
  return (
    <div className="space-y-5">
      {/* Stats Section */}
      <div className="border border-primary/30 bg-primary/5 dark:bg-gradient-to-br from-black via-primary/10 to-black rounded-xl p-4 space-y-4 animate__animated animate__fadeIn shadow-sm">
        <h2 className="text-2xl text-primary font-semibold">Products</h2>

        {/* Stats Card */}
        <Card className="w-full lg:w-[100%] flex flex-nowrap border-primary/50 bg-primary/10 rounded-lg overflow-x-auto whitespace-nowrap scrollbar-x">
          <div className="flex items-center space-x-2 p-4 text-primary">
            <CalendarCheck className="w-6 h-6" />
            <span className="font-semibold text-lg">Current Updates</span>
          </div>
          {[1, 2, 3, 4, 5].map((_, index) => (
            <div key={index} className="p-3 px-4 border-l-2 border-primary/50 min-w-[190px] flex flex-col">
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-6 w-16" />
            </div>
          ))}
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="All" className="w-full lg:w-[85%]">
          <div className="w-full overflow-x-auto scrollbar-x">
            <TabsList className="flex min-w-max mt-4 items-center justify-start bg-transparent rounded-none overflow-y-hidden whitespace-nowrap">
              {["All", "Active", "Inactive", "Discontinued", "OutOfStock"].map((item) => (
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

      {/* Product List Section */}
      <div className="space-y-3 border p-3 rounded-xl shadow-sm border-primary/30 bg-primary/5 dark:bg-gradient-to-br from-black via-primary/10 to-black animate__animated animate__fadeIn">
        <h2 className="text-xl pl-1 text-primary font-semibold">All Product Lists</h2>

        {/* Search and Filter */}
        <div className="flex flex-nowrap gap-2 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-secondary-foreground" />
            <Input
              placeholder="Search Order..."
              className="pl-8 bg-transparent border-primary/50 rounded-full transition-colors"
            />
          </div>

          <div className="flex gap-2">
            <Button className="bg-primary text-primary-foreground shadow-md border rounded-lg px-5 py-3 hover:bg-primary/80 flex items-center gap-2">
              <Filter size={24} />
              <span className="hidden sm:block font-medium">Filter</span>
            </Button>
          </div>
        </div>

        {/* Products Table */}
        <Card className="p-2 md:p-4 border rounded-xl bg-background border-primary/30 overflow-hidden">
          <div className="overflow-x-auto">
            <Table className="w-full">
              <TableHeader className="bg-primary rounded-lg overflow-hidden">
                <TableRow className="border-none hover:bg-transparent">
                  <TableHead className="text-primary-foreground font-semibold text-center rounded-l-lg">
                    Sr.No.
                  </TableHead>
                  <TableHead className="text-primary-foreground font-semibold">Image</TableHead>
                  <TableHead className="text-primary-foreground font-semibold">Product Name</TableHead>
                  <TableHead className="text-primary-foreground font-semibold text-center">Price</TableHead>
                  <TableHead className="text-primary-foreground font-semibold text-center">Stock</TableHead>
                  <TableHead className="text-primary-foreground font-semibold text-center">Status</TableHead>
                  <TableHead className="text-primary-foreground font-semibold text-center rounded-r-lg">
                    Details
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <TableRow key={index} className="border-b h-[60px] hover:bg-accent">
                    <TableCell className="text-center rounded-tl-lg rounded-bl-lg">{index + 1}</TableCell>
                    <TableCell className="text-center">
                      <Skeleton className="w-16 md:w-20 h-16 rounded-xl mx-auto" />
                    </TableCell>
                    <TableCell className="truncate max-w-[500px]">
                      <Skeleton className="h-5 w-full max-w-[300px]" />
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-center">
                      <Skeleton className="h-5 w-16 mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      <Skeleton className="h-5 w-12 mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      <Skeleton className="h-6 w-20 rounded-md mx-auto" />
                    </TableCell>
                    <TableCell className="w-max whitespace-nowrap space-x-4 rounded-br-lg rounded-tr-lg">
                      <div className="flex items-center justify-center">
                        <Skeleton className="h-8 w-8 rounded-full" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>

      {/* Pagination */}
      <div className="flex p-2 items-center justify-between">
        <div className="flex whitespace-nowrap space-x-2 items-center">
          <span className="text-sm">Items per pages</span>
          <Skeleton className="h-9 w-16" />
        </div>

        <Pagination className="w-max mr-0">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            {[1, 2, 3].map((page) => (
              <PaginationItem key={page}>
                <PaginationLink href="#">{page}</PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}



// Contact Skeleton
export function ContactSkeleton() {
  return (
    <div className="container mx-auto px-4 py-12 animate-pulse">
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <div className="w-64 h-10 bg-accent/40 rounded-lg mx-auto"></div>
          <div className="w-full max-w-3xl h-16 bg-accent/30 rounded-lg mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-primary/20 rounded-lg p-6">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 mx-auto"></div>
                <div className="w-48 h-6 bg-accent/40 rounded-lg mx-auto"></div>
                <div className="w-full h-12 bg-accent/30 rounded-lg"></div>
                <div className="w-40 h-5 bg-accent/40 rounded-md mx-auto"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="border border-primary/20 rounded-lg p-6">
            <div className="w-64 h-8 bg-accent/40 rounded-lg mx-auto mb-6"></div>
            <div className="space-y-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="w-32 h-5 bg-accent/40 rounded-md"></div>
                  <div className="w-full h-10 bg-accent/30 rounded-md"></div>
                </div>
              ))}
              <div className="w-full h-12 bg-accent/40 rounded-md"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// AddProduct Skeleton
export function AddProductSkeleton() {
  return (
    <div className="mx-auto p-2 animate__animated animate__fadeIn">
      {/* Title */}
      <Skeleton className="h-10 w-full mb-2 rounded-lg" />

      <div className="space-y-4 p-2">
        {/* Image Upload Section */}
        <div className="flex flex-wrap place-content-center gap-5 p-2">
          {[0, 1, 2, 3, 4].map((index) => (
            <div key={index} className="space-y-2 flex flex-col w-fit h-fit items-center">
              <Skeleton className="h-4 w-32 mb-1" />
              
              {/* Image placeholder */}
              <Card className="relative w-[21rem] h-64 md:h-48 md:w-48 lg:w-52 lg:h-52 sm:h-64 sm:w-64 p-2 rounded-lg">
                <Skeleton className="w-full h-full rounded-md" />
              </Card>

              {/* Filename bar */}
              <Skeleton className="p-1 px-2 w-full h-8 rounded-md" />
            </div>
          ))}
        </div>

        {/* Basic Product Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 gap-x-8">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
            <div key={index} className="space-y-1">
              <Skeleton className="h-5 w-32 mb-1" />
              <Skeleton className="h-12 w-full py-5" />
            </div>
          ))}
        </div>

        {/* Product Specifications */}
        <Separator />
        <Skeleton className="h-10 w-full rounded-lg" />
        
        <div className="space-y-4">
          <Skeleton className="h-5 w-40" />
          
          {/* Detail fields */}
          {[0, 1].map((index) => (
            <div key={index} className="flex items-center space-x-2">
              <Skeleton className="flex-1 h-12" />
              <Skeleton className="flex-1 h-12" />
              <Skeleton className="h-10 w-10 rounded-md" />
            </div>
          ))}
          
          <Skeleton className="h-9 w-32 mt-2" />
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-center">
          <Skeleton className="h-14 w-64 md:w-96 rounded-lg" />
        </div>
      </div>
    </div>
  )
}


//ProfilePage Skeleton
export default function ProfileSkeleton() {
    const [loading, setLoading] = useState(true);
  
    // Simulate loading state for demo purposes
    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }, []);
  
    return (
      <div className="animate__animated animate__fadeIn">
        {/* Banner */}
        <div className="bg-teal-800 rounded-xl h-44 relative">
          <Skeleton className="w-full h-full" />
          <div className="absolute right-4 top-4">
            <Button variant="ghost" size="icon" className="text-white border rounded-full">
              <EllipsisVertical />
            </Button>
          </div>
        </div>
  
        {/* Profile Section */}
        <div className="px-6 -mt-16">
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-end gap-4">
              <div className="w-32 h-32 rounded-full border-[3px] bg-white border-white relative">
                <Avatar className="w-full h-full">
                  <AvatarImage src="" alt="Profile Picture" />
                  <AvatarFallback>
                    <Skeleton className="w-full h-full rounded-full" />
                  </AvatarFallback>
                </Avatar>
                <label
                  htmlFor="profile-pic-input"
                  className="absolute top-1 cursor-pointer right-2 p-1 bg-white rounded-full shadow-sm"
                >
                  <Pencil className="h-5 w-5 text-black" />
                  <input
                    id="profile-pic-input"
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                </label>
              </div>
            </div>
            <Button variant="outline">Edit Profile</Button>
          </div>
  
          {/* Profile Info */}
          <div className="-mt-6">
            {loading ? (
              <Skeleton className="h-8 w-48 mb-4" />
            ) : (
              <h1 className="text-3xl font-bold flex items-center gap-2">
                Seller Name
                <span className="text-blue-500">
                  <Skeleton className="w-6 h-6 rounded-full" />
                </span>
              </h1>
            )}
  
            <div className="space-y-3 mt-5">
              {loading ? (
                <>
                  <Skeleton className="h-6 w-full max-w-md mb-2" />
                  <Skeleton className="h-6 w-full max-w-md mb-2" />
                  <Skeleton className="h-6 w-full max-w-md" />
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <Mail className="text-muted-foreground" />
                    seller@example.com
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="text-muted-foreground" />
                    +91 9876543210
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="text-muted-foreground" />
                    123 Seller Street, City, State
                  </div>
                </>
              )}
            </div>
          </div>
  
          {/* Sales Metrics */}
          <Card className="mt-8">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Sales & Revenue</CardTitle>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={() => setLoading(true)}
                >
                  <RefreshCcw className="h-4 w-4" /> Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-3">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-green-100 p-2 rounded-full">
                      <MoveUp className="text-green-700 w-5 h-5" />
                    </span>
                    <span>150 items</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-orange-100 p-2 rounded-full">
                      <IndianRupee className="text-orange-500 w-5 h-5" />
                    </span>
                    <span>₹125,000/-</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-pink-50 p-2 rounded-full">
                      <RotateCw className="text-red-500 w-5 h-5" />
                    </span>
                    <span>12 items return</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-red-100 p-2 rounded-full">
                      <PackageMinus className="text-red-700 w-5 h-5" />
                    </span>
                    <span>5 Items Not delivered</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
  
          {/* Delete Account Section */}
          <div className="mt-12 mb-8">
            <div className="text-xs text-muted-foreground mb-4">
              *Note: Deleting your account is permanent and cannot be undone. All
              your data will be lost.
            </div>
  
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="md:px-24 py-5">
                  Delete Account Permanent
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <Button variant="destructive">
                    Delete Account
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    );
  }


//EditProduct Skeleton
export function EditProductSkeleton() {
    return (
      <div className="space-y-2">
        <div className="mx-auto p-2 rounded-xl animate__animated animate__fadeIn">
          <Button
            variant="outline"
            className="text-sm bg-transparent border-none text-muted-foreground rounded-full hover:bg-accent shadow-none"
            disabled
          >
            <MoveLeft /> Back to Orders
          </Button>
          <h1 className="text-xl mt-4 bg-primary/30 text-primary pl-5 p-2 rounded-lg font-semibold mb-2">
            Edit Product
          </h1>
  
          <div className="space-y-4 p-2">
            {/* Image Upload Section */}
            <div className="flex flex-wrap place-content-center gap-5 p-2">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="space-y-2 flex flex-col w-fit h-fit items-center"
                  >
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="relative w-[21rem] h-64 md:h-48 md:w-48 lg:w-52 lg:h-52 sm:h-64 sm:w-64 p-2 rounded-lg" />
                    <Skeleton className="h-10 w-full rounded-md" />
                  </div>
                ))}
            </div>
  
            {/* Basic Product Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 gap-x-8">
              {Array(8)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="space-y-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-24 w-full rounded-md" />
                  </div>
                ))}
            </div>
  
            <div className="h-px w-full bg-gray-200 my-4" />
            
            <Skeleton className="h-10 w-60 mb-4" />
            
            <div className="space-y-4">
              <Skeleton className="h-4 w-32" />
              {Array(3)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Skeleton className="h-10 w-full rounded-md" />
                    <Skeleton className="h-10 w-full rounded-md" />
                    <Skeleton className="h-10 w-10 rounded-md" />
                  </div>
                ))}
              <Skeleton className="h-10 w-32 mt-2" />
            </div>
  
            {/* Submit Button */}
            <div className="flex items-center justify-center">
              <Skeleton className="h-14 w-64 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // ViewProductSkeleton.tsx  
  export function ViewProductSkeleton() {
    return (
      <div className="p-1.5 space-y-6">
        {/* Header with back button and actions */}
        <div className="flex justify-between items-center">
          <Button className="text-sm bg-transparent text-muted-foreground rounded-full hover:bg-accent shadow-none">
            <MoveLeft className="h-4 w-4" /> Back to Products
          </Button>
          <div className="flex flex-row space-x-2">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-36" />
          </div>
        </div>
  
        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Total Sales Card */}
          <Card className="shadow-sm hover:shadow-md border-primary/50 bg-primary/5 dark:bg-gradient-to-br from-primary/15 via-primary/10 to-black transition-all">
            <CardContent className="pt-6">
              <div className="flex flex-wrap-reverse gap-2 justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-300">Total Sales</p>
                  <Skeleton className="h-8 w-24 mt-1" />
                </div>
                <div className="p-2 bg-green-100 rounded-full">
                  <TrendingUp className="h-8 w-8 lg:h-10 lg:w-10 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
  
          {/* Total Units Sold Card */}
          <Card className="shadow-sm hover:shadow-md border-primary/50 bg-primary/5 dark:bg-gradient-to-br from-primary/15 via-primary/10 to-black transition-all">
            <CardContent className="pt-6">
              <div className="flex flex-wrap-reverse gap-2 justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-300">Total Units Sold</p>
                  <Skeleton className="h-8 w-16 mt-1" />
                </div>
                <div className="p-2 bg-blue-100 rounded-full">
                  <ShoppingBag className="h-8 w-8 lg:h-10 lg:w-10 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
  
          {/* Current Stock Card */}
          <Card className="shadow-sm hover:shadow-md border-primary/50 bg-primary/5 dark:bg-gradient-to-br from-primary/15 via-primary/10 to-black transition-all">
            <CardContent className="pt-6">
              <div className="flex flex-wrap-reverse gap-2 justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-300">Current Stock</p>
                  <Skeleton className="h-8 w-16 mt-1" />
                </div>
                <div className="p-2 bg-yellow-100 rounded-full">
                  <Boxes className="h-8 w-8 lg:h-10 lg:w-10 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
  
        {/* Tabs */}
        <Tabs defaultValue="details" className="w-full space-y-4">
          <TabsList className="grid w-full grid-cols-3 space-x-1">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
  
          {/* Product Details Tab */}
          <TabsContent value="details" className="space-y-4">
            <Card className="shadow-sm border-primary/50 bg-primary/5 dark:bg-gradient-to-br from-black via-primary/10 to-black">
              <CardHeader>
                <CardTitle className="bg-primary/30 text-primary py-3 px-2 rounded-md">Product Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Grid Layout for Product Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 px-2 gap-4">
                  {/* Product Name */}
                  <div className="space-y-2 flex flex-col md:col-span-1">
                    <p className="text-sm font-medium">Product Name</p>
                    <Skeleton className="h-6 w-full" />
                  </div>
  
                  {/* Remaining Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:col-span-1">
                    <div className="space-y-2 flex flex-col">
                      <p className="text-sm font-medium">Price (₹)</p>
                      <Skeleton className="h-6 w-24" />
                    </div>
                    <div className="space-y-2 flex flex-col">
                      <p className="text-sm font-medium">Category</p>
                      <Skeleton className="h-6 w-32" />
                    </div>
                    <div className="space-y-2 flex flex-col">
                      <p className="text-sm font-medium">Status</p>
                      <Skeleton className="h-6 w-24" />
                    </div>
                  </div>
                </div>
  
                {/* Description */}
                <div className="space-y-2 flex flex-col px-2">
                  <p className="text-sm font-medium">Description</p>
                  <Skeleton className="h-20 w-full" />
                </div>
  
                <hr />
  
                {/* Specifications */}
                <div className="space-y-4 grid grid-cols">
                  <p className="font-semibold text-md bg-primary/30 text-primary py-2 rounded-md px-2">Specifications</p>
                  {/* Skeleton specs */}
                  {[1, 2, 3].map((_, index) => (
                    <div key={index} className="grid grid-cols-2 px-2 gap-2">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-5 w-full" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
  
          {/* Images Tab */}
          <TabsContent value="images">
            <Card className="border-primary/50 bg-primary/5 dark:bg-gradient-to-br from-black via-primary/10 to-black">
              <CardHeader>
                <CardTitle>Product Images</CardTitle>
              </CardHeader>
              <CardContent className="px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[1, 2, 3].map((_, index) => (
                    <Skeleton key={index} className="w-full h-64 rounded-lg" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
  
          {/* Reviews Tab */}
          <TabsContent value="reviews">
            <Card className="border-primary/50 bg-primary/5 dark:bg-gradient-to-br from-black via-primary/10 to-black">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Customer Reviews</CardTitle>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-32" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((_, index) => (
                    <Card key={index}>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <div className="flex items-center gap-3">
                              <Skeleton className="h-8 w-8 rounded-full" />
                              <Skeleton className="h-5 w-32" />
                              <Skeleton className="h-4 w-24" />
                            </div>
                            <Skeleton className="h-4 w-24" />
                          </div>
                        </div>
                        <Skeleton className="h-16 w-full mt-2" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    )
  }


// Fallback loading component
export function LoadingFallback({ message = "Loading..." }) {
  return (
    <div className="flex flex-col justify-center items-center h-[50vh]">
      <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
      <p className="text-muted-foreground">{message}</p>
    </div>
  )
}

