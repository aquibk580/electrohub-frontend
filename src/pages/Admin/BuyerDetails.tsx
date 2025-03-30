"use client";

import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "@/lib/axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  MapPin,
  Phone,
  Mail,
  Calendar,
  CreditCard,
  ShoppingBag,
  RefreshCcw,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import type { OrderItem, User } from "@/types/entityTypes";
import { getRandomColor } from "@/components/Home/UserProfileButton";
import { formatDate } from "@/lib/utils";
import { formatPrice } from "@/utils/FormatPrice";
import { Button } from "@/components/ui/button";

type ExtendedUser = User & {
  totalSpend: number;
  itemsPurchased: number;
  returns: number;
  avgOrderValue: number;
};



const BuyerDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState<ExtendedUser | null>(null);
  const [orderItems, setOrderItems] = useState<Array<OrderItem>>([]);
  const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

  const initials = user?.name
    .split(" ")
    .map((name) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const bgColor = useMemo(() => getRandomColor(), []);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/admin/users/${id}`
        );
        if (response.status === 200) {
          setUser({
            ...response.data.user,
            totalSpend: response.data.totalSpend,
            itemsPurchased: response.data.itemsPurchased,
            returns: response.data.returns,
            avgOrderValue: response.data.avgOrderValue,
          });
          setOrderItems(response.data.orderItems);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [id]);

  const handleBackClick = () => {
    const searchParams = new URLSearchParams(location.search);
    const returnPage = searchParams.get("returnPage");
    if (returnPage) {
      navigate(`/admin/buyer?page=${returnPage}`);
    } else {
      navigate("/admin/buyer");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading User Details...</p>
      </div>
    );
  }
  console.log(user);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <button
              onClick={handleBackClick}
              className="flex items-center gap-2 group text-primary hover:text-primary/60 w-fit transition-colors"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Buyers</span>
            </button>
      {/* Header Card */}
      <Card className="border-primary/75 bg-primary/5 dark:bg-gradient-to-br from-primary/30 via-slate-700/35 to-primary/25">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center  space-x-4">
            <Avatar className="h-20  border-[3px]  border-primary p-1 w-20 ">
              <AvatarImage className="rounded-full"  src={user?.pfp} />
              <AvatarFallback
                className={`${bgColor}  flex items-center justify-center`}
              >
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{user?.name}</CardTitle>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <span>•</span>
                <span>Member since {formatDate(user!.createdAt)}</span>
              </div>
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
            <Card className="border-primary/75 bg-primary/5 dark:bg-gradient-to-br from-primary/25 via-slate-900/30 to-primary/15">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Spend
                </CardTitle>
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ₹{formatPrice(user!.totalSpend)}
                </div>
              </CardContent>
            </Card>
            <Card className="border-primary/75 bg-primary/5 dark:bg-gradient-to-br from-primary/25 via-slate-900/30 to-primary/15">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Items Purchased
                </CardTitle>
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{user!.itemsPurchased}</div>
              </CardContent>
            </Card>
            <Card className="border-primary/75 bg-primary/5 dark:bg-gradient-to-br from-primary/25 via-slate-900/30 to-primary/15">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Returns</CardTitle>
                <RefreshCcw className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{user!.returns}</div>
              </CardContent>
            </Card>
            <Card className="border-primary/75 bg-primary/5 dark:bg-gradient-to-br from-primary/25 via-slate-900/30 to-primary/15">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Avg Order Value
                </CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ₹{formatPrice(user!.avgOrderValue)}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-primary/75 bg-primary/5 dark:bg-gradient-to-br from-primary/25 via-slate-900/30 to-primary/15">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{user?.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{user?.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{`${user?.address}`}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Gender: {user?.gender}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card className="border-primary/75 bg-primary/5 dark:bg-gradient-to-br from-primary/10 via-black to-primary/5">
            <CardHeader>
              <CardTitle>Purchase History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-b-accent-foreground">
                    <TableHead className="text-center text-accent-foreground">Order ID</TableHead>
                    <TableHead className="text-center text-accent-foreground">Date</TableHead>
                    <TableHead className="text-center text-accent-foreground">Items</TableHead>
                    <TableHead className="text-center text-accent-foreground">Total</TableHead>
                    <TableHead className="text-center text-accent-foreground">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderItems?.map((orderItem) => (
                    <TableRow className="border-b-gray-400" key={orderItem.id}>
                      <TableCell className="text-center text-accent-foreground">{orderItem.id}</TableCell>
                      <TableCell className="text-center text-accent-foreground">{formatDate(orderItem.createdAt)}</TableCell>
                      <TableCell className="text-center text-accent-foreground">
                        {orderItem.quantity}x{" "}
                        {orderItem?.product?.name.substring(0, 60) ||
                          "Unknown Product"}
                      </TableCell>
                      <TableCell className="text-center text-accent-foreground">
                        ₹
                        {formatPrice(
                          orderItem.product.price -
                            (orderItem.product.offerPercentage / 100) *
                              orderItem.product.price
                        )}
                      </TableCell>
                      <TableCell className="text-center text-accent-foreground">
                      <Badge
  variant="outline"
  className={`mt-1 
    ${orderItem.status === "Delivered" ? "bg-green-100 text-green-700 border-green-500" : ""} 
    ${orderItem.status === "OrderConfirmed" ? "bg-blue-100 text-blue-700 border-blue-500" : ""} 
    ${orderItem.status === "Shipped" ? "bg-yellow-100 text-yellow-700 border-yellow-500" : ""} 
    ${orderItem.status === "Cancelled" ? "bg-red-100 text-red-700 border-red-500" : ""} 
    ${orderItem.status === "Returned" ? "bg-purple-100 text-purple-700 border-purple-500" : ""} 
  `}
>
  {orderItem.status}
</Badge>

                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews">
          <Card className="border-primary/75 bg-primary/5 dark:bg-gradient-to-br from-primary/15 via-black to-primary/5">
            <CardHeader>
              <CardTitle>Product Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user?.reviews?.map((review) => (
                  <Card className="hover:border-primary/85 bg-white/95 dark:bg-gradient-to-br from-primary/20 via-black to-primary/15" key={review.productId}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">
                            {review.product.name}
                          </h4>
                          <div className="flex items-center space-x-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {formatDate(review.createdAt)}
                        </span>
                      </div>
                      <p className="mt-2 text-muted-foreground">
                        {review.content}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment">
          {/* Transaction History */}
          <Card  className="mt-4 border-primary/75 bg-primary/5 dark:bg-gradient-to-br from-primary/10 via-black to-primary/5">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-b-accent-foreground">
                    <TableHead className="text-center text-accent-foreground ">Transaction ID</TableHead>
                    <TableHead className="text-center text-accent-foreground ">Date</TableHead>
                    <TableHead className="text-center text-accent-foreground ">Amount</TableHead>
                    <TableHead className="text-center text-accent-foreground ">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {user?.orders?.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="text-center">{order.id}</TableCell>
                      <TableCell className="text-center">{formatDate(order.createdAt)}</TableCell>
                      <TableCell className="text-center">₹{formatPrice(order.total)}</TableCell>
                      <TableCell className="text-center">
                      <Badge className="bg-primary/70">Completed</Badge>

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

export default BuyerDetails;
